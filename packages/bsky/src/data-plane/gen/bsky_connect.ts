// @generated by protoc-gen-connect-es v1.3.0 with parameter "target=ts,import_extension=.ts"
// @generated from file bsky.proto (package bsky, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetActorFeedsRequest, GetActorFeedsResponse, GetActorFollowsActorsRequest, GetActorFollowsActorsResponse, GetActorLikesRequest, GetActorLikesResponse, GetActorListsRequest, GetActorListsResponse, GetActorMutesActorRequest, GetActorMutesActorResponse, GetActorMutesActorViaListRequest, GetActorMutesActorViaListResponse, GetActorRepostsRequest, GetActorRepostsResponse, GetActorsRequest, GetActorsResponse, GetAuthorFeedRequest, GetAuthorFeedResponse, GetBidirectionalBlockRequest, GetBidirectionalBlockResponse, GetBidirectionalBlockViaListRequest, GetBidirectionalBlockViaListResponse, GetBlobTakedownRequest, GetBlobTakedownResponse, GetBlockExistenceRequest, GetBlockExistenceResponse, GetBlocklistSubscriptionRequest, GetBlocklistSubscriptionResponse, GetBlocklistSubscriptionsRequest, GetBlocklistSubscriptionsResponse, GetBlockRecordsRequest, GetBlockRecordsResponse, GetBlocksRequest, GetBlocksResponse, GetCountsForUsersRequest, GetCountsForUsersResponse, GetDidsByHandlesRequest, GetDidsByHandlesResponse, GetFeedGeneratorRecordsRequest, GetFeedGeneratorRecordsResponse, GetFeedGeneratorStatusRequest, GetFeedGeneratorStatusResponse, GetFollowCountsRequest, GetFollowCountsResponse, GetFollowerCountsRequest, GetFollowerCountsResponse, GetFollowersRequest, GetFollowersResponse, GetFollowRecordsRequest, GetFollowRecordsResponse, GetFollowsRequest, GetFollowsResponse, GetFollowSuggestionsRequest, GetFollowSuggestionsResponse, GetInteractionCountsRequest, GetInteractionCountsResponse, GetLabelsRequest, GetLabelsResponse, GetLatestRevRequest, GetLatestRevResponse, GetLikeCountsRequest, GetLikeCountsResponse, GetLikeRecordsRequest, GetLikeRecordsResponse, GetLikesByActorAndSubjectsRequest, GetLikesByActorAndSubjectsResponse, GetLikesBySubjectRequest, GetLikesBySubjectResponse, GetListBlockRecordsRequest, GetListBlockRecordsResponse, GetListCountRequest, GetListCountResponse, GetListFeedRequest, GetListFeedResponse, GetListItemRecordsRequest, GetListItemRecordsResponse, GetListMembershipRequest, GetListMembershipResponse, GetListMembersRequest, GetListMembersResponse, GetListRecordsRequest, GetListRecordsResponse, GetMutelistSubscriptionRequest, GetMutelistSubscriptionResponse, GetMutelistSubscriptionsRequest, GetMutelistSubscriptionsResponse, GetMutesRequest, GetMutesResponse, GetNotificationSeenRequest, GetNotificationSeenResponse, GetNotificationsRequest, GetNotificationsResponse, GetPostCountsRequest, GetPostCountsResponse, GetPostRecordsRequest, GetPostRecordsResponse, GetPostReplyCountsRequest, GetPostReplyCountsResponse, GetProfileRecordsRequest, GetProfileRecordsResponse, GetRelationshipsRequest, GetRelationshipsResponse, GetRepostCountsRequest, GetRepostCountsResponse, GetRepostRecordsRequest, GetRepostRecordsResponse, GetRepostsByActorAndSubjectsRequest, GetRepostsByActorAndSubjectsResponse, GetRepostsBySubjectRequest, GetRepostsBySubjectResponse, GetSuggestedFeedsRequest, GetSuggestedFeedsResponse, GetThreadGateRecordsRequest, GetThreadGateRecordsResponse, GetThreadRequest, GetThreadResponse, GetTimelineRequest, GetTimelineResponse, GetUnreadNotificationCountRequest, GetUnreadNotificationCountResponse, MuteActorListRequest, MuteActorListResponse, MuteActorRequest, MuteActorResponse, PingRequest, PingResponse, SearchActorsRequest, SearchActorsResponse, SearchPostsRequest, SearchPostsResponse, UnmuteActorListRequest, UnmuteActorListResponse, UnmuteActorRequest, UnmuteActorResponse, UpdateNotificationSeenRequest, UpdateNotificationSeenResponse, UpdateTakedownRequest, UpdateTakedownResponse } from "./bsky_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service bsky.Service
 */
export const Service = {
  typeName: "bsky.Service",
  methods: {
    /**
     * Records
     *
     * @generated from rpc bsky.Service.GetBlockRecords
     */
    getBlockRecords: {
      name: "GetBlockRecords",
      I: GetBlockRecordsRequest,
      O: GetBlockRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFeedGeneratorRecords
     */
    getFeedGeneratorRecords: {
      name: "GetFeedGeneratorRecords",
      I: GetFeedGeneratorRecordsRequest,
      O: GetFeedGeneratorRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFollowRecords
     */
    getFollowRecords: {
      name: "GetFollowRecords",
      I: GetFollowRecordsRequest,
      O: GetFollowRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetLikeRecords
     */
    getLikeRecords: {
      name: "GetLikeRecords",
      I: GetLikeRecordsRequest,
      O: GetLikeRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListBlockRecords
     */
    getListBlockRecords: {
      name: "GetListBlockRecords",
      I: GetListBlockRecordsRequest,
      O: GetListBlockRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListItemRecords
     */
    getListItemRecords: {
      name: "GetListItemRecords",
      I: GetListItemRecordsRequest,
      O: GetListItemRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListRecords
     */
    getListRecords: {
      name: "GetListRecords",
      I: GetListRecordsRequest,
      O: GetListRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetPostRecords
     */
    getPostRecords: {
      name: "GetPostRecords",
      I: GetPostRecordsRequest,
      O: GetPostRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetProfileRecords
     */
    getProfileRecords: {
      name: "GetProfileRecords",
      I: GetProfileRecordsRequest,
      O: GetProfileRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetRepostRecords
     */
    getRepostRecords: {
      name: "GetRepostRecords",
      I: GetRepostRecordsRequest,
      O: GetRepostRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetThreadGateRecords
     */
    getThreadGateRecords: {
      name: "GetThreadGateRecords",
      I: GetThreadGateRecordsRequest,
      O: GetThreadGateRecordsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Follows
     *
     * @generated from rpc bsky.Service.GetActorFollowsActors
     */
    getActorFollowsActors: {
      name: "GetActorFollowsActors",
      I: GetActorFollowsActorsRequest,
      O: GetActorFollowsActorsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFollowers
     */
    getFollowers: {
      name: "GetFollowers",
      I: GetFollowersRequest,
      O: GetFollowersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFollows
     */
    getFollows: {
      name: "GetFollows",
      I: GetFollowsRequest,
      O: GetFollowsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFollowerCounts
     */
    getFollowerCounts: {
      name: "GetFollowerCounts",
      I: GetFollowerCountsRequest,
      O: GetFollowerCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFollowCounts
     */
    getFollowCounts: {
      name: "GetFollowCounts",
      I: GetFollowCountsRequest,
      O: GetFollowCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Likes
     *
     * @generated from rpc bsky.Service.GetLikesBySubject
     */
    getLikesBySubject: {
      name: "GetLikesBySubject",
      I: GetLikesBySubjectRequest,
      O: GetLikesBySubjectResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetLikesByActorAndSubjects
     */
    getLikesByActorAndSubjects: {
      name: "GetLikesByActorAndSubjects",
      I: GetLikesByActorAndSubjectsRequest,
      O: GetLikesByActorAndSubjectsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetActorLikes
     */
    getActorLikes: {
      name: "GetActorLikes",
      I: GetActorLikesRequest,
      O: GetActorLikesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetLikeCounts
     */
    getLikeCounts: {
      name: "GetLikeCounts",
      I: GetLikeCountsRequest,
      O: GetLikeCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Reposts
     *
     * @generated from rpc bsky.Service.GetRepostsBySubject
     */
    getRepostsBySubject: {
      name: "GetRepostsBySubject",
      I: GetRepostsBySubjectRequest,
      O: GetRepostsBySubjectResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetRepostsByActorAndSubjects
     */
    getRepostsByActorAndSubjects: {
      name: "GetRepostsByActorAndSubjects",
      I: GetRepostsByActorAndSubjectsRequest,
      O: GetRepostsByActorAndSubjectsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetActorReposts
     */
    getActorReposts: {
      name: "GetActorReposts",
      I: GetActorRepostsRequest,
      O: GetActorRepostsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetRepostCounts
     */
    getRepostCounts: {
      name: "GetRepostCounts",
      I: GetRepostCountsRequest,
      O: GetRepostCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Interaction Counts
     *
     * @generated from rpc bsky.Service.GetInteractionCounts
     */
    getInteractionCounts: {
      name: "GetInteractionCounts",
      I: GetInteractionCountsRequest,
      O: GetInteractionCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetCountsForUsers
     */
    getCountsForUsers: {
      name: "GetCountsForUsers",
      I: GetCountsForUsersRequest,
      O: GetCountsForUsersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Profile
     *
     * @generated from rpc bsky.Service.GetActors
     */
    getActors: {
      name: "GetActors",
      I: GetActorsRequest,
      O: GetActorsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetDidsByHandles
     */
    getDidsByHandles: {
      name: "GetDidsByHandles",
      I: GetDidsByHandlesRequest,
      O: GetDidsByHandlesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Relationships
     *
     * @generated from rpc bsky.Service.GetRelationships
     */
    getRelationships: {
      name: "GetRelationships",
      I: GetRelationshipsRequest,
      O: GetRelationshipsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetBlockExistence
     */
    getBlockExistence: {
      name: "GetBlockExistence",
      I: GetBlockExistenceRequest,
      O: GetBlockExistenceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists
     *
     * @generated from rpc bsky.Service.GetActorLists
     */
    getActorLists: {
      name: "GetActorLists",
      I: GetActorListsRequest,
      O: GetActorListsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListMembers
     */
    getListMembers: {
      name: "GetListMembers",
      I: GetListMembersRequest,
      O: GetListMembersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListMembership
     */
    getListMembership: {
      name: "GetListMembership",
      I: GetListMembershipRequest,
      O: GetListMembershipResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListCount
     */
    getListCount: {
      name: "GetListCount",
      I: GetListCountRequest,
      O: GetListCountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Mutes
     *
     * @generated from rpc bsky.Service.GetActorMutesActor
     */
    getActorMutesActor: {
      name: "GetActorMutesActor",
      I: GetActorMutesActorRequest,
      O: GetActorMutesActorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetMutes
     */
    getMutes: {
      name: "GetMutes",
      I: GetMutesRequest,
      O: GetMutesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.MuteActor
     */
    muteActor: {
      name: "MuteActor",
      I: MuteActorRequest,
      O: MuteActorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.UnmuteActor
     */
    unmuteActor: {
      name: "UnmuteActor",
      I: UnmuteActorRequest,
      O: UnmuteActorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Mutelists
     *
     * @generated from rpc bsky.Service.GetActorMutesActorViaList
     */
    getActorMutesActorViaList: {
      name: "GetActorMutesActorViaList",
      I: GetActorMutesActorViaListRequest,
      O: GetActorMutesActorViaListResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetMutelistSubscription
     */
    getMutelistSubscription: {
      name: "GetMutelistSubscription",
      I: GetMutelistSubscriptionRequest,
      O: GetMutelistSubscriptionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetMutelistSubscriptions
     */
    getMutelistSubscriptions: {
      name: "GetMutelistSubscriptions",
      I: GetMutelistSubscriptionsRequest,
      O: GetMutelistSubscriptionsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.MuteActorList
     */
    muteActorList: {
      name: "MuteActorList",
      I: MuteActorListRequest,
      O: MuteActorListResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.UnmuteActorList
     */
    unmuteActorList: {
      name: "UnmuteActorList",
      I: UnmuteActorListRequest,
      O: UnmuteActorListResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Blocks
     *
     * @generated from rpc bsky.Service.GetBidirectionalBlock
     */
    getBidirectionalBlock: {
      name: "GetBidirectionalBlock",
      I: GetBidirectionalBlockRequest,
      O: GetBidirectionalBlockResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetBlocks
     */
    getBlocks: {
      name: "GetBlocks",
      I: GetBlocksRequest,
      O: GetBlocksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Blocklists
     *
     * @generated from rpc bsky.Service.GetBidirectionalBlockViaList
     */
    getBidirectionalBlockViaList: {
      name: "GetBidirectionalBlockViaList",
      I: GetBidirectionalBlockViaListRequest,
      O: GetBidirectionalBlockViaListResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetBlocklistSubscription
     */
    getBlocklistSubscription: {
      name: "GetBlocklistSubscription",
      I: GetBlocklistSubscriptionRequest,
      O: GetBlocklistSubscriptionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetBlocklistSubscriptions
     */
    getBlocklistSubscriptions: {
      name: "GetBlocklistSubscriptions",
      I: GetBlocklistSubscriptionsRequest,
      O: GetBlocklistSubscriptionsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Notifications
     *
     * @generated from rpc bsky.Service.GetNotifications
     */
    getNotifications: {
      name: "GetNotifications",
      I: GetNotificationsRequest,
      O: GetNotificationsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetNotificationSeen
     */
    getNotificationSeen: {
      name: "GetNotificationSeen",
      I: GetNotificationSeenRequest,
      O: GetNotificationSeenResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetUnreadNotificationCount
     */
    getUnreadNotificationCount: {
      name: "GetUnreadNotificationCount",
      I: GetUnreadNotificationCountRequest,
      O: GetUnreadNotificationCountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.UpdateNotificationSeen
     */
    updateNotificationSeen: {
      name: "UpdateNotificationSeen",
      I: UpdateNotificationSeenRequest,
      O: UpdateNotificationSeenResponse,
      kind: MethodKind.Unary,
    },
    /**
     * FeedGenerators
     *
     * @generated from rpc bsky.Service.GetActorFeeds
     */
    getActorFeeds: {
      name: "GetActorFeeds",
      I: GetActorFeedsRequest,
      O: GetActorFeedsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetSuggestedFeeds
     */
    getSuggestedFeeds: {
      name: "GetSuggestedFeeds",
      I: GetSuggestedFeedsRequest,
      O: GetSuggestedFeedsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetFeedGeneratorStatus
     */
    getFeedGeneratorStatus: {
      name: "GetFeedGeneratorStatus",
      I: GetFeedGeneratorStatusRequest,
      O: GetFeedGeneratorStatusResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Feeds
     *
     * @generated from rpc bsky.Service.GetAuthorFeed
     */
    getAuthorFeed: {
      name: "GetAuthorFeed",
      I: GetAuthorFeedRequest,
      O: GetAuthorFeedResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetTimeline
     */
    getTimeline: {
      name: "GetTimeline",
      I: GetTimelineRequest,
      O: GetTimelineResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetListFeed
     */
    getListFeed: {
      name: "GetListFeed",
      I: GetListFeedRequest,
      O: GetListFeedResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Threads
     *
     * @generated from rpc bsky.Service.GetThread
     */
    getThread: {
      name: "GetThread",
      I: GetThreadRequest,
      O: GetThreadResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Search
     *
     * @generated from rpc bsky.Service.SearchActors
     */
    searchActors: {
      name: "SearchActors",
      I: SearchActorsRequest,
      O: SearchActorsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.SearchPosts
     */
    searchPosts: {
      name: "SearchPosts",
      I: SearchPostsRequest,
      O: SearchPostsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Suggestions
     *
     * @generated from rpc bsky.Service.GetFollowSuggestions
     */
    getFollowSuggestions: {
      name: "GetFollowSuggestions",
      I: GetFollowSuggestionsRequest,
      O: GetFollowSuggestionsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Posts
     *
     * @generated from rpc bsky.Service.GetPostReplyCounts
     */
    getPostReplyCounts: {
      name: "GetPostReplyCounts",
      I: GetPostReplyCountsRequest,
      O: GetPostReplyCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.GetPostCounts
     */
    getPostCounts: {
      name: "GetPostCounts",
      I: GetPostCountsRequest,
      O: GetPostCountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Labels
     *
     * @generated from rpc bsky.Service.GetLabels
     */
    getLabels: {
      name: "GetLabels",
      I: GetLabelsRequest,
      O: GetLabelsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Sync
     *
     * @generated from rpc bsky.Service.GetLatestRev
     */
    getLatestRev: {
      name: "GetLatestRev",
      I: GetLatestRevRequest,
      O: GetLatestRevResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Moderation
     *
     * @generated from rpc bsky.Service.GetBlobTakedown
     */
    getBlobTakedown: {
      name: "GetBlobTakedown",
      I: GetBlobTakedownRequest,
      O: GetBlobTakedownResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bsky.Service.UpdateTakedown
     */
    updateTakedown: {
      name: "UpdateTakedown",
      I: UpdateTakedownRequest,
      O: UpdateTakedownResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Ping
     *
     * @generated from rpc bsky.Service.Ping
     */
    ping: {
      name: "Ping",
      I: PingRequest,
      O: PingResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
