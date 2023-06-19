import AppContext from '../context'
import { QueryParams as SkeletonParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { FeedRow } from '../app-view/services/feed'

export type AlgoResponse = {
  feedItems: FeedRow[]
  cursor?: string
}

export type AlgoHandler = (
  ctx: AppContext,
  params: SkeletonParams,
  requester: string,
) => Promise<AlgoResponse>

export type MountedAlgos = Record<string, AlgoHandler>
