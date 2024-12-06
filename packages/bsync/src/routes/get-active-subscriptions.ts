import { Code, ConnectError, ServiceImpl } from '@connectrpc/connect'
import { Service } from '../proto/bsync_connect'
import { GetActiveSubscriptionsResponse, Subscription } from '../proto/bsync_pb'
import AppContext from '../context'
import { authWithApiKey } from './auth'
import { isValidDid } from './util'
import { RcSubscription } from '../purchases'

export default (ctx: AppContext): Partial<ServiceImpl<typeof Service>> => ({
  async getActiveSubscriptions(req, handlerCtx) {
    authWithApiKey(ctx, handlerCtx)
    const { revenueCatClient } = ctx
    const { actorDid } = req

    if (!isValidDid(actorDid)) {
      throw new ConnectError(
        'actor_did must be a valid did',
        Code.InvalidArgument,
      )
    }

    if (!revenueCatClient) {
      throw new Error('revenue cat is not configured on bsync')
    }

    const subscriptions = await getActiveSubscriptionsForViewer(actorDid, ctx)

    return new GetActiveSubscriptionsResponse({
      subscriptions,
    })
  },
})

const getActiveSubscriptionsForViewer = async (
  viewerDid: string,
  ctx: AppContext,
): Promise<Subscription[]> => {
  if (!ctx.revenueCatClient) {
    return []
  }

  const { subscriber } = await ctx.revenueCatClient.getSubscriber(viewerDid)

  const subscriptions = Object.entries(subscriber.subscriptions)

  return subscriptions
    .map(createSubscriptionObject)
    .filter(Boolean) as Subscription[]
}

export function createSubscriptionObject([productId, s]: [
  string,
  RcSubscription,
]): Subscription | undefined {
  const platform = parsePlatformFromSubscriptionStore(s.store)
  if (!platform) return undefined
  const fullProductId =
    platform === 'android'
      ? `${productId}:${s.product_plan_identifier}`
      : productId
  const group = parseSubscriptionGroupFromStoreIdentifier(fullProductId)
  if (!group) return undefined

  const now = new Date()
  const expiresAt = new Date(s.expires_date)

  let status = 'unknown'
  if (s.auto_resume_date) {
    if (now > expiresAt) {
      status = 'paused'
    }
  } else if (now > expiresAt) {
    status = 'expired'
  } else if (now < expiresAt) {
    status = 'active'
  }

  let renewalStatus = 'unknown'
  if (s.auto_resume_date) {
    if (now < expiresAt) {
      renewalStatus = 'will_pause'
    } else if (now > expiresAt) {
      renewalStatus = 'will_renew'
    }
  } else if (now < expiresAt) {
    renewalStatus = 'will_renew'
    if (s.unsubscribe_detected_at) {
      renewalStatus = 'will_not_renew'
    }
  } else if (now > expiresAt) {
    renewalStatus = 'will_not_renew'
  }

  let periodEndsAt = s.expires_date
  if (s.auto_resume_date) {
    if (now > expiresAt) {
      periodEndsAt = s.auto_resume_date
    }
  }

  const offering = parseSubscriptionOfferingIdFromStoreIdentifier(fullProductId)
  if (!offering) return undefined

  return Subscription.fromJson({
    status,
    renewalStatus,
    group,
    platform,
    offering,
    periodEndsAt: periodEndsAt,
    periodStartsAt: s.purchase_date,
    purchasedAt: s.original_purchase_date,
  })
}

export enum EntitlementId {
  Core = 'core',
}

export enum PlatformId {
  Web = 'web',
  iOS = 'ios',
  Android = 'android',
}

export enum SubscriptionGroupId {
  Core = 'core',
}

export enum SubscriptionOfferingId {
  CoreMonthly = 'coreMonthly',
  CoreAnnual = 'coreAnnual',
}

export const parsePlatformFromSubscriptionStore = (
  store: string,
): PlatformId | undefined => {
  switch (store) {
    case 'stripe':
      return PlatformId.Web
    case 'app_store':
      return PlatformId.iOS
    case 'play_store':
      return PlatformId.Android
    default:
      return undefined
  }
}

const PROD = process.env.NODE_ENV === 'production'

/**
 * Stripe product IDS
 *
 * Product IDs are not directly purchased. Instead, price IDs are used when
 * creating Checkout sessions. So we track these IDs separately from the main
 * product config.
 */
export const STRIPE_PRODUCTS = {
  [SubscriptionOfferingId.CoreMonthly]: PROD
    ? 'prod_RI1ESehFz7oPXo'
    : 'prod_RI1ESehFz7oPXo',
  [SubscriptionOfferingId.CoreAnnual]: PROD
    ? 'prod_RI1EAtQrq2gz8O'
    : 'prod_RI1EAtQrq2gz8O',
}

/**
 * All of our purchaseable product IDs for all platforms.
 */
export const PRODUCTS = {
  [PlatformId.Web]: {
    [SubscriptionOfferingId.CoreMonthly]: PROD
      ? 'price_1QPRBoAwTlpRxHkANXWKoQP3'
      : 'price_1QPRBoAwTlpRxHkANXWKoQP3',
    [SubscriptionOfferingId.CoreAnnual]: PROD
      ? 'price_1QPRCBAwTlpRxHkAYC7JZAre'
      : 'price_1QPRCBAwTlpRxHkAYC7JZAre',
  },
  [PlatformId.iOS]: {
    [SubscriptionOfferingId.CoreMonthly]: 'bluesky_plus_core_v1_monthly',
    [SubscriptionOfferingId.CoreAnnual]: 'bluesky_plus_core_v1_annual',
  },
  [PlatformId.Android]: {
    [SubscriptionOfferingId.CoreMonthly]: 'bluesky_plus_core_v1:monthly',
    [SubscriptionOfferingId.CoreAnnual]: 'bluesky_plus_core_v1:annual',
  },
}

/**
 * Manual groupings of products into "Subscription Groups", mimicking the way
 * Apple does it.
 */
export const GROUPS = {
  [SubscriptionGroupId.Core]: {
    [PlatformId.Web]: [
      {
        id: SubscriptionOfferingId.CoreMonthly,
        platform: PlatformId.Web,
        product: PRODUCTS[PlatformId.Web][SubscriptionOfferingId.CoreMonthly],
      },
      {
        id: SubscriptionOfferingId.CoreAnnual,
        platform: PlatformId.Web,
        product: PRODUCTS[PlatformId.Web][SubscriptionOfferingId.CoreAnnual],
      },
    ],
    [PlatformId.iOS]: [
      {
        id: SubscriptionOfferingId.CoreMonthly,
        platform: PlatformId.iOS,
        product: PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreMonthly],
      },
      {
        id: SubscriptionOfferingId.CoreAnnual,
        platform: PlatformId.iOS,
        product: PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreAnnual],
      },
    ],
    [PlatformId.Android]: [
      {
        id: SubscriptionOfferingId.CoreMonthly,
        platform: PlatformId.Android,
        product:
          PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreMonthly],
      },
      {
        id: SubscriptionOfferingId.CoreAnnual,
        platform: PlatformId.Android,
        product:
          PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreAnnual],
      },
    ],
  },
}

export const parseSubscriptionGroupFromStoreIdentifier = (
  identifier: string,
): SubscriptionGroupId | undefined => {
  switch (identifier) {
    case STRIPE_PRODUCTS[SubscriptionOfferingId.CoreMonthly]:
    case STRIPE_PRODUCTS[SubscriptionOfferingId.CoreAnnual]:
    case PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreMonthly]:
    case PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreAnnual]:
    case PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreMonthly]:
    case PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreAnnual]:
      return SubscriptionGroupId.Core
    default:
      return undefined
  }
}

export const parseSubscriptionOfferingIdFromStoreIdentifier = (
  identifier: string,
): SubscriptionOfferingId | undefined => {
  switch (identifier) {
    case STRIPE_PRODUCTS[SubscriptionOfferingId.CoreMonthly]:
    case PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreMonthly]:
    case PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreMonthly]:
      return SubscriptionOfferingId.CoreMonthly
    case STRIPE_PRODUCTS[SubscriptionOfferingId.CoreAnnual]:
    case PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreAnnual]:
    case PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreAnnual]:
      return SubscriptionOfferingId.CoreAnnual
    default:
      return undefined
  }
}
