import { AtpAgent } from '@atproto/api'
import { TestNetwork, SeedClient } from '@atproto/dev-env'
import { ids } from '../../src/lexicon/lexicons'

describe('purchases', () => {
  let network: TestNetwork
  let agent: AtpAgent
  let sc: SeedClient

  // account dids, for convenience
  let alice: string
  let bob: string

  beforeAll(async () => {
    network = await TestNetwork.create({
      dbPostgresSchema: 'bsky_views_purchases',
    })
    agent = network.bsky.getClient()
    sc = network.getSeedClient()
    await network.processAll()

    alice = sc.dids.alice
    bob = sc.dids.bob
  })

  afterAll(async () => {
    await network.close()
  })

  describe('refreshCache', () => {
    it('fetches post likes', async () => {
      await agent.api.app.bsky.purchase.refreshCache(
        { did: alice },
        {
          headers: await network.serviceHeaders(
            alice,
            ids.AppBskyPurchaseRefreshCache,
          ),
        },
      )
    })
  })
})
