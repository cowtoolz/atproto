import http from 'node:http'
import { once } from 'node:events'
import getPort from 'get-port'
import {
  authWithApiKey,
  BsyncService,
  createClient,
  Database,
  envToCfg,
} from '../src'
import {
  RcEntitlement,
  RcEventBody,
  RcGetSubscriberResponse,
} from '../src/purchases'
import { Code, ConnectError } from '@connectrpc/connect'

const revenueCatWebhookAuthorization = 'Bearer any-token'

describe('purchases', () => {
  let bsync: BsyncService
  let client: BsyncClient
  let bsyncUrl: string

  const actorDid = 'did:example:a'

  let revenueCatServer: http.Server
  let revenueCatApiMock: jest.Mock<RcGetSubscriberResponse>

  const TEN_MINUTES = 600_000
  const entitlementValid: RcEntitlement = {
    expires_date: new Date(Date.now() + TEN_MINUTES).toISOString(),
  }
  const entitlementExpired: RcEntitlement = {
    expires_date: new Date(Date.now() - TEN_MINUTES).toISOString(),
  }

  beforeAll(async () => {
    const revenueCatPort = await getPort()

    revenueCatApiMock = jest.fn()
    revenueCatServer = await createMockRevenueCatService(
      revenueCatPort,
      revenueCatApiMock,
    )

    bsync = await BsyncService.create(
      envToCfg({
        port: await getPort(),
        dbUrl: process.env.DB_POSTGRES_URL,
        dbSchema: 'bsync_purchases',
        apiKeys: ['key-1'],
        longPollTimeoutMs: 500,
        revenueCatV1ApiKey: 'any-key',
        revenueCatV1ApiUrl: `http://localhost:${revenueCatPort}`,
        revenueCatWebhookAuthorization,
      }),
    )

    bsyncUrl = `http://localhost:${bsync.ctx.cfg.service.port}`

    await bsync.ctx.db.migrateToLatestOrThrow()
    await bsync.start()
    client = createClient({
      httpVersion: '1.1',
      baseUrl: `http://localhost:${bsync.ctx.cfg.service.port}`,
      interceptors: [authWithApiKey('key-1')],
    })
  })

  afterAll(async () => {
    await bsync.destroy()
    revenueCatServer.close()
    await once(revenueCatServer, 'close')
  })

  beforeEach(async () => {
    await clearPurchases(bsync.ctx.db)
  })

  describe('webhook handler', () => {
    it('replies 403 if authorization is invalid', async () => {
      const response = await fetch(`${bsyncUrl}/webhooks/revenuecat`, {
        method: 'POST',
        body: JSON.stringify({ event: { app_user_id: actorDid } }),
        headers: {
          Authorization: `not ${revenueCatWebhookAuthorization}`,
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(403)
      expect(response.json()).resolves.toMatchObject({
        error: 'Forbidden: invalid authentication for RevenueCat webhook',
      })
    })

    it('replies 400 if DID is invalid', async () => {
      const response = await callWebhook(bsyncUrl, buildWebhookBody('invalid'))

      expect(response.status).toBe(400)
      expect(response.json()).resolves.toMatchObject({
        error: 'Bad request: invalid DID in app_user_id',
      })
    })

    it('replies 400 if body is invalid', async () => {
      const response = await callWebhook(bsyncUrl, {
        any: 'thing ',
      } as unknown as RcEventBody)

      expect(response.status).toBe(400)
      expect(response.json()).resolves.toMatchObject({
        error: 'Bad request: body schema validation failed',
      })
    })

    it('stores valid entitlements from the API response, excluding expired', async () => {
      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementExpired },
        },
      })

      await callWebhook(bsyncUrl, buildWebhookBody(actorDid))

      const op0 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op0).toMatchObject({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toMatchObject({
        actorDid,
        entitlements: [],
        fromId: op0.id,
      })

      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementValid, entitlementExpired },
        },
      })

      await callWebhook(bsyncUrl, buildWebhookBody(actorDid))

      const op1 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op1).toMatchObject({
        id: expect.any(Number),
        actorDid,
        entitlements: ['entitlementValid'],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toMatchObject({
        actorDid,
        entitlements: ['entitlementValid'],
        fromId: op1.id,
      })
    })

    it('sets empty array in the cache if no entitlements are present at all', async () => {
      revenueCatApiMock.mockReturnValue({
        subscriber: { entitlements: {} },
      })

      await callWebhook(bsyncUrl, buildWebhookBody(actorDid))

      const op = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op).toMatchObject({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toMatchObject({
        actorDid,
        entitlements: [],
        fromId: op.id,
      })
    })
  })

  describe('addPurchaseOperation', () => {
    it('fails on bad inputs', async () => {
      await expect(
        client.addPurchaseOperation({
          actorDid: 'invalid',
        }),
      ).rejects.toEqual(
        new ConnectError('actor_did must be a valid did', Code.InvalidArgument),
      )
    })

    it('stores valid entitlements from the API response, excluding expired', async () => {
      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementExpired },
        },
      })

      await client.addPurchaseOperation({ actorDid })

      const op0 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op0).toMatchObject({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toMatchObject({
        actorDid,
        entitlements: [],
        fromId: op0.id,
      })

      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementValid, entitlementExpired },
        },
      })

      await client.addPurchaseOperation({ actorDid })

      const op1 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op1).toMatchObject({
        id: expect.any(Number),
        actorDid,
        entitlements: ['entitlementValid'],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toMatchObject({
        actorDid,
        entitlements: ['entitlementValid'],
        fromId: op1.id,
      })
    })

    it('sets empty array in the cache if no entitlements are present at all', async () => {
      revenueCatApiMock.mockReturnValue({
        subscriber: { entitlements: {} },
      })

      await client.addPurchaseOperation({ actorDid })

      const op = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op).toMatchObject({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toMatchObject({
        actorDid,
        entitlements: [],
        fromId: op.id,
      })
    })
  })
})

const clearPurchases = async (db: Database) => {
  await db.db.deleteFrom('purchase_item').execute()
  await db.db.deleteFrom('purchase_op').execute()
}

const buildWebhookBody = (actorDid: string): RcEventBody => ({
  api_version: '1.0',
  event: {
    app_user_id: actorDid,
    type: 'INITIAL_PURCHASE',
  },
})

const callWebhook = async (
  baseUrl: string,
  body: RcEventBody,
): Promise<Response> => {
  return fetch(`${baseUrl}/webhooks/revenuecat`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: revenueCatWebhookAuthorization,
      'Content-Type': 'application/json',
    },
  })
}

const createMockRevenueCatService = async (
  port: number,
  apiMock: jest.Mock<RcGetSubscriberResponse>,
): Promise<http.Server> => {
  const server = http.createServer((req, res) => {
    if (!req.url) {
      throw new Error('Unexpected empty URL in request to RevenueCat mock')
    }

    if (/^\/subscribers\/(.*)$/.test(req.url)) {
      const response = apiMock(req, res)
      res.statusCode = 200
      return res.end(JSON.stringify(response))
    }

    throw new Error('Unexpected URL in request to RevenueCat mock')
  })

  server.listen(port)
  await once(server, 'listening')
  return server
}
