import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Cursor: any;
  NonNegativeInt: any;
  EmailAddress: any;
};

export type Query = {
  __typename?: 'Query';
  _: Scalars['Boolean'];
  categories: Array<Category>;
  category?: Maybe<Category>;
  post?: Maybe<Post>;
  posts: PostConnection;
  user?: Maybe<User>;
  viewer?: Maybe<User>;
};


export type QueryCategoryArgs = {
  slug: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  first: Scalars['NonNegativeInt'];
  after?: Maybe<Scalars['Cursor']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _: Scalars['Boolean'];
  addPostComment?: Maybe<CommentEdge>;
  addReaction: AddReactionPayload;
  createPost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  deleteViewerSessions: Scalars['Boolean'];
  linkViewerSocialAccount: User;
  removePostComment: Scalars['Boolean'];
  removeReaction: RemoveReactionPayload;
  unlinkViewerSocialAccount: User;
  updateUser: User;
};


export type MutationAddPostCommentArgs = {
  input: AddPostCommentInput;
};


export type MutationAddReactionArgs = {
  reactableId: Scalars['ID'];
  type: ReactionType;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationLinkViewerSocialAccountArgs = {
  socialAccountType: SocialAccountType;
  token: Scalars['String'];
};


export type MutationRemovePostCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveReactionArgs = {
  reactableId: Scalars['ID'];
};


export type MutationUnlinkViewerSocialAccountArgs = {
  socialAccountType: SocialAccountType;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export enum SocialAccountType {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE'
}

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
  browser?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  isCurrent: Scalars['Boolean'];
};

export type SessionEdge = {
  __typename?: 'SessionEdge';
  node: Session;
  cursor: Scalars['Cursor'];
};

export type SessionConnection = Connection & {
  __typename?: 'SessionConnection';
  pageInfo: PageInfo;
  edges: Array<SessionEdge>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  posts: PostConnection;
};


export type CategoryPostsArgs = {
  first: Scalars['NonNegativeInt'];
  after?: Maybe<Scalars['Cursor']>;
};

export type AddPostCommentInput = {
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type Comment = Reactable & {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['Date'];
  commenter?: Maybe<User>;
  reactionsCount: ReactionsCount;
  viewerReaction?: Maybe<ReactionType>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  node: Comment;
  cursor: Scalars['Cursor'];
};

export type CommentConnection = Connection & {
  __typename?: 'CommentConnection';
  pageInfo: PageInfo;
  edges: Array<CommentEdge>;
};

export type GraphImage = {
  __typename?: 'GraphImage';
  width: Scalars['NonNegativeInt'];
  height: Scalars['NonNegativeInt'];
  url: Scalars['String'];
};

export type GraphMedia = {
  __typename?: 'GraphMedia';
  id: Scalars['ID'];
  thumbnail: GraphImage;
  smallImage: GraphImage;
  standardImage: GraphImage;
};

export type Post = Reactable & {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['Date'];
  media?: Maybe<GraphMedia>;
  author?: Maybe<User>;
  viewerReaction?: Maybe<ReactionType>;
  reactionsCount: ReactionsCount;
  commentsCount: Scalars['NonNegativeInt'];
  comments: CommentConnection;
};


export type PostCommentsArgs = {
  first: Scalars['NonNegativeInt'];
  after?: Maybe<Scalars['Cursor']>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  node: Post;
  cursor: Scalars['Cursor'];
};

export type PostConnection = Connection & {
  __typename?: 'PostConnection';
  pageInfo: PageInfo;
  edges: Array<PostEdge>;
};

export type PostInput = {
  title: Scalars['String'];
  categoryId: Scalars['ID'];
  mediaId: Scalars['ID'];
};

export enum ReactionType {
  Like = 'LIKE',
  Dislike = 'DISLIKE'
}

export type AddReactionPayload = {
  __typename?: 'AddReactionPayload';
  reactableId: Scalars['ID'];
  viewerReaction: ReactionType;
};

export type RemoveReactionPayload = {
  __typename?: 'RemoveReactionPayload';
  reactableId: Scalars['ID'];
  viewerReaction?: Maybe<ReactionType>;
};

export type Reactable = {
  id: Scalars['ID'];
  viewerReaction?: Maybe<ReactionType>;
  reactionsCount: ReactionsCount;
};

export type ReactionsCount = {
  __typename?: 'ReactionsCount';
  likesCount: Scalars['NonNegativeInt'];
  dislikesCount: Scalars['NonNegativeInt'];
};





export type Connection = {
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']>;
  hasNextPage: Scalars['Boolean'];
};

export type UserInput = {
  displayName: Scalars['String'];
  email: Scalars['EmailAddress'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  email: Scalars['EmailAddress'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  googleProfileId?: Maybe<Scalars['String']>;
  facebookProfileId?: Maybe<Scalars['String']>;
  postsCount: Scalars['NonNegativeInt'];
  posts: PostConnection;
  sessions: SessionConnection;
};


export type UserPostsArgs = {
  first: Scalars['NonNegativeInt'];
  after?: Maybe<Scalars['Cursor']>;
};


export type UserSessionsArgs = {
  first: Scalars['NonNegativeInt'];
  after?: Maybe<Scalars['Cursor']>;
};

export type GetViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'email' | 'thumbnailUrl'>
  )> }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'slug'>
  )> }
);

export type CommentList_CommentEdgeFragment = (
  { __typename?: 'CommentEdge' }
  & Pick<CommentEdge, 'cursor'>
  & { node: (
    { __typename?: 'Comment' }
    & CommentListItem_CommentFragment
  ) }
);

export type CommentList_PageInfoFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'hasNextPage'>
);

export type CommentListItem_CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'createdAt'>
  & { commenter?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'thumbnailUrl'>
  )> }
  & CommentListItemReactionActions_CommentFragment
);

export type RemovePostCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemovePostCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removePostComment'>
);

export type CommentListItemReactionActions_CommentFragment = (
  { __typename?: 'Comment' }
  & ReactionActions_Reactable_Comment_Fragment
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  categoryId: Scalars['ID'];
  mediaId: Scalars['ID'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  )> }
);

export type Post_PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'title' | 'createdAt' | 'commentsCount'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'thumbnailUrl'>
  )>, media?: Maybe<(
    { __typename?: 'GraphMedia' }
    & Pick<GraphMedia, 'id'>
    & { standardImage: (
      { __typename?: 'GraphImage' }
      & Pick<GraphImage, 'width' | 'height' | 'url'>
    ) }
  )> }
  & PostReactionActions_PostFragment
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type PostList_PostConnectionFragment = (
  { __typename?: 'PostConnection' }
  & { edges: Array<(
    { __typename?: 'PostEdge' }
    & Pick<PostEdge, 'cursor'>
    & { node: (
      { __typename?: 'Post' }
      & Post_PostFragment
    ) }
  )>, pageInfo: (
    { __typename?: 'PageInfo' }
    & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
  ) }
);

export type PostReactionActions_PostFragment = (
  { __typename?: 'Post' }
  & ReactionActions_Reactable_Post_Fragment
);

export type PostSeo_PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title'>
  & { media?: Maybe<(
    { __typename?: 'GraphMedia' }
    & Pick<GraphMedia, 'id'>
    & { smallImage: (
      { __typename?: 'GraphImage' }
      & Pick<GraphImage, 'height' | 'width' | 'url'>
    ), standardImage: (
      { __typename?: 'GraphImage' }
      & Pick<GraphImage, 'height' | 'width' | 'url'>
    ) }
  )> }
);

type ReactionActions_Reactable_Comment_Fragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'viewerReaction'>
  & { reactionsCount: (
    { __typename?: 'ReactionsCount' }
    & Pick<ReactionsCount, 'likesCount' | 'dislikesCount'>
  ) }
);

type ReactionActions_Reactable_Post_Fragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'viewerReaction'>
  & { reactionsCount: (
    { __typename?: 'ReactionsCount' }
    & Pick<ReactionsCount, 'likesCount' | 'dislikesCount'>
  ) }
);

export type ReactionActions_ReactableFragment = ReactionActions_Reactable_Comment_Fragment | ReactionActions_Reactable_Post_Fragment;

export type AddReactionMutationVariables = Exact<{
  reactableId: Scalars['ID'];
  type: ReactionType;
}>;


export type AddReactionMutation = (
  { __typename?: 'Mutation' }
  & { addReaction: (
    { __typename?: 'AddReactionPayload' }
    & Pick<AddReactionPayload, 'reactableId' | 'viewerReaction'>
  ) }
);

export type RemoveReactionMutationVariables = Exact<{
  reactableId: Scalars['ID'];
}>;


export type RemoveReactionMutation = (
  { __typename?: 'Mutation' }
  & { removeReaction: (
    { __typename?: 'RemoveReactionPayload' }
    & Pick<RemoveReactionPayload, 'reactableId' | 'viewerReaction'>
  ) }
);

export type UserProfileHeader_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'thumbnailUrl' | 'displayName'>
);

export type UserProfileLayout_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'postsCount'>
  & UserProfileSeo_UserFragment
  & UserProfileHeader_UserFragment
);

export type UserProfileSeo_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'thumbnailUrl'>
);

export type UserSettingsForm_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'email'>
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & UserSettingsForm_UserFragment
  ) }
);

export type UserSocialAccountLinker_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'googleProfileId' | 'facebookProfileId'>
);

export type LinkViewerSocialAccountMutationVariables = Exact<{
  socialAccountType: SocialAccountType;
  token: Scalars['String'];
}>;


export type LinkViewerSocialAccountMutation = (
  { __typename?: 'Mutation' }
  & { linkViewerSocialAccount: (
    { __typename?: 'User' }
    & UserSocialAccountLinker_UserFragment
  ) }
);

export type UnlinkViewerSocialAccountMutationVariables = Exact<{
  socialAccountType: SocialAccountType;
}>;


export type UnlinkViewerSocialAccountMutation = (
  { __typename?: 'Mutation' }
  & { unlinkViewerSocialAccount: (
    { __typename?: 'User' }
    & UserSocialAccountLinker_UserFragment
  ) }
);

export type UserSocialAccounts_UserFragment = (
  { __typename?: 'User' }
  & UserSocialAccountLinker_UserFragment
);

export type PostView_PostFragment = (
  { __typename?: 'Post' }
  & { comments: (
    { __typename?: 'CommentConnection' }
    & { edges: Array<(
      { __typename?: 'CommentEdge' }
      & CommentList_CommentEdgeFragment
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor'>
      & CommentList_PageInfoFragment
    ) }
  ) }
  & PostSeo_PostFragment
  & Post_PostFragment
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
  commentsAfter?: Maybe<Scalars['Cursor']>;
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostView_PostFragment
  )> }
);

export type AddPostCommentMutationVariables = Exact<{
  postId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type AddPostCommentMutation = (
  { __typename?: 'Mutation' }
  & { addPostComment?: Maybe<(
    { __typename?: 'CommentEdge' }
    & CommentList_CommentEdgeFragment
  )> }
);

export type GetCategoryWithPostsQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['Cursor']>;
}>;


export type GetCategoryWithPostsQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
    & { posts: (
      { __typename?: 'PostConnection' }
      & PostList_PostConnectionFragment
    ) }
  )> }
);

export type GetUserWithPostsQueryVariables = Exact<{
  id: Scalars['ID'];
  after?: Maybe<Scalars['Cursor']>;
}>;


export type GetUserWithPostsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { posts: (
      { __typename?: 'PostConnection' }
      & PostList_PostConnectionFragment
    ) }
    & UserProfileLayout_UserFragment
  )> }
);

export type GetUserWithSessionsQueryVariables = Exact<{
  id: Scalars['ID'];
  after?: Maybe<Scalars['Cursor']>;
}>;


export type GetUserWithSessionsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { sessions: (
      { __typename?: 'SessionConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
      ), edges: Array<(
        { __typename?: 'SessionEdge' }
        & { node: (
          { __typename?: 'Session' }
          & Pick<Session, 'id' | 'browser' | 'os' | 'platform' | 'createdAt' | 'isCurrent'>
        ) }
      )> }
    ) }
    & UserProfileLayout_UserFragment
  )> }
);

export type DeleteViewerSessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteViewerSessionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteViewerSessions'>
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserProfileLayout_UserFragment
    & UserSettingsForm_UserFragment
    & UserSocialAccounts_UserFragment
  )> }
);

export const ReactionActions_ReactableFragmentDoc = gql`
    fragment ReactionActions_reactable on Reactable {
  id
  viewerReaction
  reactionsCount {
    likesCount
    dislikesCount
  }
}
    `;
export const PostReactionActions_PostFragmentDoc = gql`
    fragment PostReactionActions_post on Post {
  ...ReactionActions_reactable
}
    ${ReactionActions_ReactableFragmentDoc}`;
export const Post_PostFragmentDoc = gql`
    fragment Post_post on Post {
  ...PostReactionActions_post
  title
  createdAt
  author {
    id
    displayName
    thumbnailUrl
  }
  media {
    id
    standardImage {
      width
      height
      url
    }
  }
  commentsCount
}
    ${PostReactionActions_PostFragmentDoc}`;
export const PostList_PostConnectionFragmentDoc = gql`
    fragment PostList_postConnection on PostConnection {
  edges {
    cursor
    node {
      ...Post_post
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${Post_PostFragmentDoc}`;
export const UserProfileSeo_UserFragmentDoc = gql`
    fragment UserProfileSeo_user on User {
  id
  displayName
  thumbnailUrl
}
    `;
export const UserProfileHeader_UserFragmentDoc = gql`
    fragment UserProfileHeader_user on User {
  id
  thumbnailUrl
  displayName
}
    `;
export const UserProfileLayout_UserFragmentDoc = gql`
    fragment UserProfileLayout_user on User {
  ...UserProfileSeo_user
  ...UserProfileHeader_user
  postsCount
}
    ${UserProfileSeo_UserFragmentDoc}
${UserProfileHeader_UserFragmentDoc}`;
export const UserSettingsForm_UserFragmentDoc = gql`
    fragment UserSettingsForm_user on User {
  id
  displayName
  email
}
    `;
export const UserSocialAccountLinker_UserFragmentDoc = gql`
    fragment UserSocialAccountLinker_user on User {
  id
  googleProfileId
  facebookProfileId
}
    `;
export const UserSocialAccounts_UserFragmentDoc = gql`
    fragment UserSocialAccounts_user on User {
  ...UserSocialAccountLinker_user
}
    ${UserSocialAccountLinker_UserFragmentDoc}`;
export const PostSeo_PostFragmentDoc = gql`
    fragment PostSeo_post on Post {
  id
  title
  media {
    id
    smallImage {
      height
      width
      url
    }
    standardImage {
      height
      width
      url
    }
  }
}
    `;
export const CommentListItemReactionActions_CommentFragmentDoc = gql`
    fragment CommentListItemReactionActions_comment on Comment {
  ...ReactionActions_reactable
}
    ${ReactionActions_ReactableFragmentDoc}`;
export const CommentListItem_CommentFragmentDoc = gql`
    fragment CommentListItem_comment on Comment {
  id
  text
  createdAt
  commenter {
    id
    displayName
    thumbnailUrl
  }
  ...CommentListItemReactionActions_comment
}
    ${CommentListItemReactionActions_CommentFragmentDoc}`;
export const CommentList_CommentEdgeFragmentDoc = gql`
    fragment CommentList_commentEdge on CommentEdge {
  cursor
  node {
    ...CommentListItem_comment
  }
}
    ${CommentListItem_CommentFragmentDoc}`;
export const CommentList_PageInfoFragmentDoc = gql`
    fragment CommentList_pageInfo on PageInfo {
  hasNextPage
}
    `;
export const PostView_PostFragmentDoc = gql`
    fragment PostView_post on Post {
  ...PostSeo_post
  ...Post_post
  comments(first: 10, after: $commentsAfter) {
    edges {
      ...CommentList_commentEdge
    }
    pageInfo {
      endCursor
      ...CommentList_pageInfo
    }
  }
}
    ${PostSeo_PostFragmentDoc}
${Post_PostFragmentDoc}
${CommentList_CommentEdgeFragmentDoc}
${CommentList_PageInfoFragmentDoc}`;
export const GetViewerDocument = gql`
    query GetViewer {
  viewer {
    id
    displayName
    email
    thumbnailUrl
  }
}
    `;

/**
 * __useGetViewerQuery__
 *
 * To run a query within a React component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerQuery(baseOptions?: Apollo.QueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, options);
      }
export function useGetViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, options);
        }
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>;
export type GetViewerLazyQueryHookResult = ReturnType<typeof useGetViewerLazyQuery>;
export type GetViewerQueryResult = Apollo.QueryResult<GetViewerQuery, GetViewerQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
    slug
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const RemovePostCommentDocument = gql`
    mutation RemovePostComment($id: ID!) {
  removePostComment(id: $id)
}
    `;
export type RemovePostCommentMutationFn = Apollo.MutationFunction<RemovePostCommentMutation, RemovePostCommentMutationVariables>;

/**
 * __useRemovePostCommentMutation__
 *
 * To run a mutation, you first call `useRemovePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostCommentMutation, { data, loading, error }] = useRemovePostCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePostCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostCommentMutation, RemovePostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostCommentMutation, RemovePostCommentMutationVariables>(RemovePostCommentDocument, options);
      }
export type RemovePostCommentMutationHookResult = ReturnType<typeof useRemovePostCommentMutation>;
export type RemovePostCommentMutationResult = Apollo.MutationResult<RemovePostCommentMutation>;
export type RemovePostCommentMutationOptions = Apollo.BaseMutationOptions<RemovePostCommentMutation, RemovePostCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $categoryId: ID!, $mediaId: ID!) {
  createPost(input: {title: $title, categoryId: $categoryId, mediaId: $mediaId}) {
    id
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      categoryId: // value for 'categoryId'
 *      mediaId: // value for 'mediaId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(id: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const AddReactionDocument = gql`
    mutation AddReaction($reactableId: ID!, $type: ReactionType!) {
  addReaction(reactableId: $reactableId, type: $type) {
    reactableId
    viewerReaction
  }
}
    `;
export type AddReactionMutationFn = Apollo.MutationFunction<AddReactionMutation, AddReactionMutationVariables>;

/**
 * __useAddReactionMutation__
 *
 * To run a mutation, you first call `useAddReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReactionMutation, { data, loading, error }] = useAddReactionMutation({
 *   variables: {
 *      reactableId: // value for 'reactableId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAddReactionMutation(baseOptions?: Apollo.MutationHookOptions<AddReactionMutation, AddReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReactionMutation, AddReactionMutationVariables>(AddReactionDocument, options);
      }
export type AddReactionMutationHookResult = ReturnType<typeof useAddReactionMutation>;
export type AddReactionMutationResult = Apollo.MutationResult<AddReactionMutation>;
export type AddReactionMutationOptions = Apollo.BaseMutationOptions<AddReactionMutation, AddReactionMutationVariables>;
export const RemoveReactionDocument = gql`
    mutation RemoveReaction($reactableId: ID!) {
  removeReaction(reactableId: $reactableId) {
    reactableId
    viewerReaction
  }
}
    `;
export type RemoveReactionMutationFn = Apollo.MutationFunction<RemoveReactionMutation, RemoveReactionMutationVariables>;

/**
 * __useRemoveReactionMutation__
 *
 * To run a mutation, you first call `useRemoveReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReactionMutation, { data, loading, error }] = useRemoveReactionMutation({
 *   variables: {
 *      reactableId: // value for 'reactableId'
 *   },
 * });
 */
export function useRemoveReactionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReactionMutation, RemoveReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReactionMutation, RemoveReactionMutationVariables>(RemoveReactionDocument, options);
      }
export type RemoveReactionMutationHookResult = ReturnType<typeof useRemoveReactionMutation>;
export type RemoveReactionMutationResult = Apollo.MutationResult<RemoveReactionMutation>;
export type RemoveReactionMutationOptions = Apollo.BaseMutationOptions<RemoveReactionMutation, RemoveReactionMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    ...UserSettingsForm_user
  }
}
    ${UserSettingsForm_UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const LinkViewerSocialAccountDocument = gql`
    mutation LinkViewerSocialAccount($socialAccountType: SocialAccountType!, $token: String!) {
  linkViewerSocialAccount(socialAccountType: $socialAccountType, token: $token) {
    ...UserSocialAccountLinker_user
  }
}
    ${UserSocialAccountLinker_UserFragmentDoc}`;
export type LinkViewerSocialAccountMutationFn = Apollo.MutationFunction<LinkViewerSocialAccountMutation, LinkViewerSocialAccountMutationVariables>;

/**
 * __useLinkViewerSocialAccountMutation__
 *
 * To run a mutation, you first call `useLinkViewerSocialAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkViewerSocialAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkViewerSocialAccountMutation, { data, loading, error }] = useLinkViewerSocialAccountMutation({
 *   variables: {
 *      socialAccountType: // value for 'socialAccountType'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLinkViewerSocialAccountMutation(baseOptions?: Apollo.MutationHookOptions<LinkViewerSocialAccountMutation, LinkViewerSocialAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkViewerSocialAccountMutation, LinkViewerSocialAccountMutationVariables>(LinkViewerSocialAccountDocument, options);
      }
export type LinkViewerSocialAccountMutationHookResult = ReturnType<typeof useLinkViewerSocialAccountMutation>;
export type LinkViewerSocialAccountMutationResult = Apollo.MutationResult<LinkViewerSocialAccountMutation>;
export type LinkViewerSocialAccountMutationOptions = Apollo.BaseMutationOptions<LinkViewerSocialAccountMutation, LinkViewerSocialAccountMutationVariables>;
export const UnlinkViewerSocialAccountDocument = gql`
    mutation UnlinkViewerSocialAccount($socialAccountType: SocialAccountType!) {
  unlinkViewerSocialAccount(socialAccountType: $socialAccountType) {
    ...UserSocialAccountLinker_user
  }
}
    ${UserSocialAccountLinker_UserFragmentDoc}`;
export type UnlinkViewerSocialAccountMutationFn = Apollo.MutationFunction<UnlinkViewerSocialAccountMutation, UnlinkViewerSocialAccountMutationVariables>;

/**
 * __useUnlinkViewerSocialAccountMutation__
 *
 * To run a mutation, you first call `useUnlinkViewerSocialAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkViewerSocialAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkViewerSocialAccountMutation, { data, loading, error }] = useUnlinkViewerSocialAccountMutation({
 *   variables: {
 *      socialAccountType: // value for 'socialAccountType'
 *   },
 * });
 */
export function useUnlinkViewerSocialAccountMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkViewerSocialAccountMutation, UnlinkViewerSocialAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkViewerSocialAccountMutation, UnlinkViewerSocialAccountMutationVariables>(UnlinkViewerSocialAccountDocument, options);
      }
export type UnlinkViewerSocialAccountMutationHookResult = ReturnType<typeof useUnlinkViewerSocialAccountMutation>;
export type UnlinkViewerSocialAccountMutationResult = Apollo.MutationResult<UnlinkViewerSocialAccountMutation>;
export type UnlinkViewerSocialAccountMutationOptions = Apollo.BaseMutationOptions<UnlinkViewerSocialAccountMutation, UnlinkViewerSocialAccountMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($id: ID!, $commentsAfter: Cursor) {
  post(id: $id) {
    ...PostView_post
  }
}
    ${PostView_PostFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *      commentsAfter: // value for 'commentsAfter'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const AddPostCommentDocument = gql`
    mutation AddPostComment($postId: ID!, $text: String!) {
  addPostComment(input: {postId: $postId, text: $text}) {
    ...CommentList_commentEdge
  }
}
    ${CommentList_CommentEdgeFragmentDoc}`;
export type AddPostCommentMutationFn = Apollo.MutationFunction<AddPostCommentMutation, AddPostCommentMutationVariables>;

/**
 * __useAddPostCommentMutation__
 *
 * To run a mutation, you first call `useAddPostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostCommentMutation, { data, loading, error }] = useAddPostCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddPostCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddPostCommentMutation, AddPostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostCommentMutation, AddPostCommentMutationVariables>(AddPostCommentDocument, options);
      }
export type AddPostCommentMutationHookResult = ReturnType<typeof useAddPostCommentMutation>;
export type AddPostCommentMutationResult = Apollo.MutationResult<AddPostCommentMutation>;
export type AddPostCommentMutationOptions = Apollo.BaseMutationOptions<AddPostCommentMutation, AddPostCommentMutationVariables>;
export const GetCategoryWithPostsDocument = gql`
    query GetCategoryWithPosts($slug: String!, $after: Cursor) {
  category(slug: $slug) {
    id
    name
    posts(first: 10, after: $after) {
      ...PostList_postConnection
    }
  }
}
    ${PostList_PostConnectionFragmentDoc}`;

/**
 * __useGetCategoryWithPostsQuery__
 *
 * To run a query within a React component, call `useGetCategoryWithPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryWithPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryWithPostsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetCategoryWithPostsQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryWithPostsQuery, GetCategoryWithPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryWithPostsQuery, GetCategoryWithPostsQueryVariables>(GetCategoryWithPostsDocument, options);
      }
export function useGetCategoryWithPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryWithPostsQuery, GetCategoryWithPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryWithPostsQuery, GetCategoryWithPostsQueryVariables>(GetCategoryWithPostsDocument, options);
        }
export type GetCategoryWithPostsQueryHookResult = ReturnType<typeof useGetCategoryWithPostsQuery>;
export type GetCategoryWithPostsLazyQueryHookResult = ReturnType<typeof useGetCategoryWithPostsLazyQuery>;
export type GetCategoryWithPostsQueryResult = Apollo.QueryResult<GetCategoryWithPostsQuery, GetCategoryWithPostsQueryVariables>;
export const GetUserWithPostsDocument = gql`
    query GetUserWithPosts($id: ID!, $after: Cursor) {
  user(id: $id) {
    ...UserProfileLayout_user
    posts(first: 10, after: $after) {
      ...PostList_postConnection
    }
  }
}
    ${UserProfileLayout_UserFragmentDoc}
${PostList_PostConnectionFragmentDoc}`;

/**
 * __useGetUserWithPostsQuery__
 *
 * To run a query within a React component, call `useGetUserWithPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWithPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWithPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetUserWithPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUserWithPostsQuery, GetUserWithPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWithPostsQuery, GetUserWithPostsQueryVariables>(GetUserWithPostsDocument, options);
      }
export function useGetUserWithPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWithPostsQuery, GetUserWithPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWithPostsQuery, GetUserWithPostsQueryVariables>(GetUserWithPostsDocument, options);
        }
export type GetUserWithPostsQueryHookResult = ReturnType<typeof useGetUserWithPostsQuery>;
export type GetUserWithPostsLazyQueryHookResult = ReturnType<typeof useGetUserWithPostsLazyQuery>;
export type GetUserWithPostsQueryResult = Apollo.QueryResult<GetUserWithPostsQuery, GetUserWithPostsQueryVariables>;
export const GetUserWithSessionsDocument = gql`
    query GetUserWithSessions($id: ID!, $after: Cursor) {
  user(id: $id) {
    ...UserProfileLayout_user
    sessions(first: 10, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          browser
          os
          platform
          createdAt
          isCurrent
        }
      }
    }
  }
}
    ${UserProfileLayout_UserFragmentDoc}`;

/**
 * __useGetUserWithSessionsQuery__
 *
 * To run a query within a React component, call `useGetUserWithSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWithSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWithSessionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetUserWithSessionsQuery(baseOptions: Apollo.QueryHookOptions<GetUserWithSessionsQuery, GetUserWithSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWithSessionsQuery, GetUserWithSessionsQueryVariables>(GetUserWithSessionsDocument, options);
      }
export function useGetUserWithSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWithSessionsQuery, GetUserWithSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWithSessionsQuery, GetUserWithSessionsQueryVariables>(GetUserWithSessionsDocument, options);
        }
export type GetUserWithSessionsQueryHookResult = ReturnType<typeof useGetUserWithSessionsQuery>;
export type GetUserWithSessionsLazyQueryHookResult = ReturnType<typeof useGetUserWithSessionsLazyQuery>;
export type GetUserWithSessionsQueryResult = Apollo.QueryResult<GetUserWithSessionsQuery, GetUserWithSessionsQueryVariables>;
export const DeleteViewerSessionsDocument = gql`
    mutation DeleteViewerSessions {
  deleteViewerSessions
}
    `;
export type DeleteViewerSessionsMutationFn = Apollo.MutationFunction<DeleteViewerSessionsMutation, DeleteViewerSessionsMutationVariables>;

/**
 * __useDeleteViewerSessionsMutation__
 *
 * To run a mutation, you first call `useDeleteViewerSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteViewerSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteViewerSessionsMutation, { data, loading, error }] = useDeleteViewerSessionsMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteViewerSessionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteViewerSessionsMutation, DeleteViewerSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteViewerSessionsMutation, DeleteViewerSessionsMutationVariables>(DeleteViewerSessionsDocument, options);
      }
export type DeleteViewerSessionsMutationHookResult = ReturnType<typeof useDeleteViewerSessionsMutation>;
export type DeleteViewerSessionsMutationResult = Apollo.MutationResult<DeleteViewerSessionsMutation>;
export type DeleteViewerSessionsMutationOptions = Apollo.BaseMutationOptions<DeleteViewerSessionsMutation, DeleteViewerSessionsMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    ...UserProfileLayout_user
    ...UserSettingsForm_user
    ...UserSocialAccounts_user
  }
}
    ${UserProfileLayout_UserFragmentDoc}
${UserSettingsForm_UserFragmentDoc}
${UserSocialAccounts_UserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;