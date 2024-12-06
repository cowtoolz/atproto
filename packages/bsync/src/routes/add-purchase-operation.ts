import { Code, ConnectError, ServiceImpl } from '@connectrpc/connect'
import { Service } from '../proto/bsync_connect'
import { AddPurchaseOperationResponse } from '../proto/bsync_pb'
import AppContext from '../context'
import { authWithApiKey } from './auth'
import { isValidDid } from './util'
import { addPurchaseOperation } from '../purchases/addPurchaseOperation'

export default (ctx: AppContext): Partial<ServiceImpl<typeof Service>> => ({
  async addPurchaseOperation(req, handlerCtx) {
    authWithApiKey(ctx, handlerCtx)
    const { db, revenueCatClient } = ctx
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

    const entitlements = await revenueCatClient.getEntitlements(actorDid)

    await addPurchaseOperation(db, actorDid, entitlements)

    return new AddPurchaseOperationResponse({
      operation: {},
    })
  },
})
