import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null | undefined;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Cursor scalar type for pagination */
  Cursor: any;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddPostCommentInput = {
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type AddReactionPayload = {
   __typename?: 'AddReactionPayload';
  reactableId: Scalars['ID'];
  viewerReaction: ViewerReactionType;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = Reactable & {
   __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['Date'];
  commenter?: Maybe<User>;
  reactions: Reactions;
  viewerReaction?: Maybe<ViewerReactionType>;
};

export type CommentConnection = Connection & {
   __typename?: 'CommentConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<CommentEdge>;
};

export type CommentEdge = {
   __typename?: 'CommentEdge';
  node: Comment;
  cursor: Scalars['Cursor'];
};

export type Connection = {
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type CreatePostInput = {
  title: Scalars['String'];
  media: Scalars['Upload'];
};



export type Image = {
   __typename?: 'Image';
  width: Scalars['Int'];
  height: Scalars['Int'];
  Url: Scalars['String'];
};

export type Media = {
   __typename?: 'Media';
  id: Scalars['ID'];
  thumbnail: Image;
  smallImage: Image;
  standardImage: Image;
};

export type Mutation = {
   __typename?: 'Mutation';
  _: Scalars['Boolean'];
  createPost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  addPostComment?: Maybe<CommentEdge>;
  removePostComment: Scalars['Boolean'];
  addReaction: AddReactionPayload;
  removeReaction: RemoveReactionPayload;
  updateUser: User;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationAddPostCommentArgs = {
  input: AddPostCommentInput;
};


export type MutationRemovePostCommentArgs = {
  id: Scalars['ID'];
};


export type MutationAddReactionArgs = {
  reactableId: Scalars['ID'];
  type: ViewerReactionType;
};


export type MutationRemoveReactionArgs = {
  reactableId: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']>;
  hasNextPage: Scalars['Boolean'];
};

export type Post = Reactable & {
   __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['Date'];
  media?: Maybe<Media>;
  author?: Maybe<User>;
  viewerReaction?: Maybe<ViewerReactionType>;
  reactions: Reactions;
  comments: CommentConnection;
};


export type PostCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Cursor']>;
};

export type PostConnection = Connection & {
   __typename?: 'PostConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<PostEdge>;
};

export type PostEdge = {
   __typename?: 'PostEdge';
  node: Post;
  cursor: Scalars['Cursor'];
};

export type Query = {
   __typename?: 'Query';
  _: Scalars['Boolean'];
  viewer?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PostConnection;
  user?: Maybe<User>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Cursor']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Reactable = {
  id: Scalars['ID'];
  viewerReaction?: Maybe<ViewerReactionType>;
  reactions: Reactions;
};

export type Reactions = {
   __typename?: 'Reactions';
  likeCount: Scalars['Int'];
  dislikeCount: Scalars['Int'];
};

export type RemoveReactionPayload = {
   __typename?: 'RemoveReactionPayload';
  reactableId: Scalars['ID'];
  viewerReaction?: Maybe<ViewerReactionType>;
};

export type Session = {
   __typename?: 'Session';
  id: Scalars['ID'];
  browser?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
};

export type SessionConnection = Connection & {
   __typename?: 'SessionConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<SessionEdge>;
};

export type SessionEdge = {
   __typename?: 'SessionEdge';
  node: Session;
  cursor: Scalars['Cursor'];
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  displayName: Scalars['String'];
  email: Scalars['String'];
};


export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  posts?: Maybe<PostConnection>;
  sessions?: Maybe<SessionConnection>;
};


export type UserPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Cursor']>;
};


export type UserSessionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Cursor']>;
};

export enum ViewerReactionType {
  Like = 'LIKE',
  Dislike = 'DISLIKE'
}

export type CreatePostMutationVariables = {
  title: Scalars['String'];
  media: Scalars['Upload'];
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  )> }
);

export type Post_PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'title' | 'createdAt'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'thumbnailUrl'>
  )>, media?: Maybe<(
    { __typename?: 'Media' }
    & Pick<Media, 'id'>
    & { standardImage: (
      { __typename?: 'Image' }
      & Pick<Image, 'width' | 'height' | 'Url'>
    ) }
  )> }
  & PostReactionActions_PostFragment
);

export type Post_CommentsFragment = (
  { __typename?: 'CommentConnection' }
  & Pick<CommentConnection, 'totalCount'>
);

export type DeletePostMutationVariables = {
  postId: Scalars['ID'];
};


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
      & { comments: (
        { __typename?: 'CommentConnection' }
        & Post_CommentsFragment
      ) }
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

type ReactionActions_Reactable_Post_Fragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'viewerReaction'>
  & { reactions: (
    { __typename?: 'Reactions' }
    & Pick<Reactions, 'likeCount' | 'dislikeCount'>
  ) }
);

type ReactionActions_Reactable_Comment_Fragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'viewerReaction'>
  & { reactions: (
    { __typename?: 'Reactions' }
    & Pick<Reactions, 'likeCount' | 'dislikeCount'>
  ) }
);

export type ReactionActions_ReactableFragment = ReactionActions_Reactable_Post_Fragment | ReactionActions_Reactable_Comment_Fragment;

export type AddReactionMutationVariables = {
  reactableId: Scalars['ID'];
  type: ViewerReactionType;
};


export type AddReactionMutation = (
  { __typename?: 'Mutation' }
  & { addReaction: (
    { __typename?: 'AddReactionPayload' }
    & Pick<AddReactionPayload, 'reactableId' | 'viewerReaction'>
  ) }
);

export type RemoveReactionMutationVariables = {
  reactableId: Scalars['ID'];
};


export type RemoveReactionMutation = (
  { __typename?: 'Mutation' }
  & { removeReaction: (
    { __typename?: 'RemoveReactionPayload' }
    & Pick<RemoveReactionPayload, 'reactableId' | 'viewerReaction'>
  ) }
);

export type GetViewerQueryVariables = {};


export type GetViewerQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'email' | 'thumbnailUrl'>
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

export type RemovePostCommentMutationVariables = {
  id: Scalars['ID'];
};


export type RemovePostCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removePostComment'>
);

export type CommentListItemReactionActions_CommentFragment = (
  { __typename?: 'Comment' }
  & ReactionActions_Reactable_Comment_Fragment
);

export type PostSeo_PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title'>
);

export type PostView_PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'title'>
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
    & Post_CommentsFragment
  ) }
  & Post_PostFragment
);

export type GetPostQueryVariables = {
  id: Scalars['ID'];
  commentsAfter?: Maybe<Scalars['Cursor']>;
};


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostView_PostFragment
  )> }
);

export type AddPostCommentMutationVariables = {
  postId: Scalars['ID'];
  text: Scalars['String'];
};


export type AddPostCommentMutation = (
  { __typename?: 'Mutation' }
  & { addPostComment?: Maybe<(
    { __typename?: 'CommentEdge' }
    & CommentList_CommentEdgeFragment
  )> }
);

export type GetPostsQueryVariables = {
  after?: Maybe<Scalars['Cursor']>;
};


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostConnection' }
    & PostList_PostConnectionFragment
  ) }
);

export type UserHeader_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'thumbnailUrl' | 'displayName'>
);

export type UserSeo_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'thumbnailUrl'>
);

export type GetViewerWithSessionsQueryVariables = {};


export type GetViewerWithSessionsQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { sessions?: Maybe<(
      { __typename?: 'SessionConnection' }
      & Pick<SessionConnection, 'totalCount'>
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges: Array<(
        { __typename?: 'SessionEdge' }
        & { node: (
          { __typename?: 'Session' }
          & Pick<Session, 'id' | 'browser' | 'os' | 'platform' | 'createdAt'>
        ) }
      )> }
    )> }
  )> }
);

export type UserSettings_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'email'>
);

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & UserSettings_UserFragment
  ) }
);

export type GetUserQueryVariables = {
  id: Scalars['ID'];
  after?: Maybe<Scalars['Cursor']>;
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { posts?: Maybe<(
      { __typename?: 'PostConnection' }
      & Pick<PostConnection, 'totalCount'>
      & PostList_PostConnectionFragment
    )> }
    & UserSeo_UserFragment
    & UserHeader_UserFragment
    & UserSettings_UserFragment
  )> }
);

export const ReactionActions_ReactableFragmentDoc = gql`
    fragment ReactionActions_reactable on Reactable {
  id
  viewerReaction
  reactions {
    likeCount
    dislikeCount
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
      Url
    }
  }
}
    ${PostReactionActions_PostFragmentDoc}`;
export const Post_CommentsFragmentDoc = gql`
    fragment Post_comments on CommentConnection {
  totalCount
}
    `;
export const PostList_PostConnectionFragmentDoc = gql`
    fragment PostList_postConnection on PostConnection {
  edges {
    cursor
    node {
      ...Post_post
      comments(first: 0) @connection(key: "comments") {
        ...Post_comments
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${Post_PostFragmentDoc}
${Post_CommentsFragmentDoc}`;
export const PostSeo_PostFragmentDoc = gql`
    fragment PostSeo_post on Post {
  id
  title
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
  title
  ...Post_post
  comments(first: 10, after: $commentsAfter) @connection(key: "comments") {
    ...Post_comments
    edges {
      ...CommentList_commentEdge
    }
    pageInfo {
      endCursor
      ...CommentList_pageInfo
    }
  }
}
    ${Post_PostFragmentDoc}
${Post_CommentsFragmentDoc}
${CommentList_CommentEdgeFragmentDoc}
${CommentList_PageInfoFragmentDoc}`;
export const UserHeader_UserFragmentDoc = gql`
    fragment UserHeader_user on User {
  id
  thumbnailUrl
  displayName
}
    `;
export const UserSeo_UserFragmentDoc = gql`
    fragment UserSeo_user on User {
  id
  displayName
  thumbnailUrl
}
    `;
export const UserSettings_UserFragmentDoc = gql`
    fragment UserSettings_user on User {
  id
  displayName
  email
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $media: Upload!) {
  createPost(input: {title: $title, media: $media}) {
    id
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

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
 *      media: // value for 'media'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(id: $postId)
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

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
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const AddReactionDocument = gql`
    mutation AddReaction($reactableId: ID!, $type: ViewerReactionType!) {
  addReaction(reactableId: $reactableId, type: $type) {
    reactableId
    viewerReaction
  }
}
    `;
export type AddReactionMutationFn = ApolloReactCommon.MutationFunction<AddReactionMutation, AddReactionMutationVariables>;

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
export function useAddReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddReactionMutation, AddReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddReactionMutation, AddReactionMutationVariables>(AddReactionDocument, baseOptions);
      }
export type AddReactionMutationHookResult = ReturnType<typeof useAddReactionMutation>;
export type AddReactionMutationResult = ApolloReactCommon.MutationResult<AddReactionMutation>;
export type AddReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddReactionMutation, AddReactionMutationVariables>;
export const RemoveReactionDocument = gql`
    mutation RemoveReaction($reactableId: ID!) {
  removeReaction(reactableId: $reactableId) {
    reactableId
    viewerReaction
  }
}
    `;
export type RemoveReactionMutationFn = ApolloReactCommon.MutationFunction<RemoveReactionMutation, RemoveReactionMutationVariables>;

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
export function useRemoveReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveReactionMutation, RemoveReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveReactionMutation, RemoveReactionMutationVariables>(RemoveReactionDocument, baseOptions);
      }
export type RemoveReactionMutationHookResult = ReturnType<typeof useRemoveReactionMutation>;
export type RemoveReactionMutationResult = ApolloReactCommon.MutationResult<RemoveReactionMutation>;
export type RemoveReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveReactionMutation, RemoveReactionMutationVariables>;
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
export function useGetViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
      }
export function useGetViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
        }
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>;
export type GetViewerLazyQueryHookResult = ReturnType<typeof useGetViewerLazyQuery>;
export type GetViewerQueryResult = ApolloReactCommon.QueryResult<GetViewerQuery, GetViewerQueryVariables>;
export const RemovePostCommentDocument = gql`
    mutation RemovePostComment($id: ID!) {
  removePostComment(id: $id)
}
    `;
export type RemovePostCommentMutationFn = ApolloReactCommon.MutationFunction<RemovePostCommentMutation, RemovePostCommentMutationVariables>;

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
export function useRemovePostCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePostCommentMutation, RemovePostCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<RemovePostCommentMutation, RemovePostCommentMutationVariables>(RemovePostCommentDocument, baseOptions);
      }
export type RemovePostCommentMutationHookResult = ReturnType<typeof useRemovePostCommentMutation>;
export type RemovePostCommentMutationResult = ApolloReactCommon.MutationResult<RemovePostCommentMutation>;
export type RemovePostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<RemovePostCommentMutation, RemovePostCommentMutationVariables>;
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
export function useGetPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
      }
export function useGetPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = ApolloReactCommon.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const AddPostCommentDocument = gql`
    mutation AddPostComment($postId: ID!, $text: String!) {
  addPostComment(input: {postId: $postId, text: $text}) {
    ...CommentList_commentEdge
  }
}
    ${CommentList_CommentEdgeFragmentDoc}`;
export type AddPostCommentMutationFn = ApolloReactCommon.MutationFunction<AddPostCommentMutation, AddPostCommentMutationVariables>;

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
export function useAddPostCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostCommentMutation, AddPostCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPostCommentMutation, AddPostCommentMutationVariables>(AddPostCommentDocument, baseOptions);
      }
export type AddPostCommentMutationHookResult = ReturnType<typeof useAddPostCommentMutation>;
export type AddPostCommentMutationResult = ApolloReactCommon.MutationResult<AddPostCommentMutation>;
export type AddPostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostCommentMutation, AddPostCommentMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts($after: Cursor) {
  posts(first: 10, after: $after) @connection(key: "posts") {
    ...PostList_postConnection
  }
}
    ${PostList_PostConnectionFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
      }
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = ApolloReactCommon.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetViewerWithSessionsDocument = gql`
    query GetViewerWithSessions {
  viewer {
    id
    sessions {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          browser
          os
          platform
          createdAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetViewerWithSessionsQuery__
 *
 * To run a query within a React component, call `useGetViewerWithSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerWithSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerWithSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerWithSessionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerWithSessionsQuery, GetViewerWithSessionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerWithSessionsQuery, GetViewerWithSessionsQueryVariables>(GetViewerWithSessionsDocument, baseOptions);
      }
export function useGetViewerWithSessionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerWithSessionsQuery, GetViewerWithSessionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerWithSessionsQuery, GetViewerWithSessionsQueryVariables>(GetViewerWithSessionsDocument, baseOptions);
        }
export type GetViewerWithSessionsQueryHookResult = ReturnType<typeof useGetViewerWithSessionsQuery>;
export type GetViewerWithSessionsLazyQueryHookResult = ReturnType<typeof useGetViewerWithSessionsLazyQuery>;
export type GetViewerWithSessionsQueryResult = ApolloReactCommon.QueryResult<GetViewerWithSessionsQuery, GetViewerWithSessionsQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ...UserSettings_user
  }
}
    ${UserSettings_UserFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!, $after: Cursor) {
  user(id: $id) {
    ...UserSeo_user
    ...UserHeader_user
    ...UserSettings_user
    posts(first: 10, after: $after) {
      totalCount
      ...PostList_postConnection
    }
  }
}
    ${UserSeo_UserFragmentDoc}
${UserHeader_UserFragmentDoc}
${UserSettings_UserFragmentDoc}
${PostList_PostConnectionFragmentDoc}`;

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
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>,
  PostConnection: ResolverTypeWrapper<PostConnection>,
  Connection: ResolversTypes['PostConnection'] | ResolversTypes['CommentConnection'] | ResolversTypes['SessionConnection'],
  PageInfo: ResolverTypeWrapper<PageInfo>,
  PostEdge: ResolverTypeWrapper<PostEdge>,
  Post: ResolverTypeWrapper<Post>,
  Reactable: ResolversTypes['Post'] | ResolversTypes['Comment'],
  ViewerReactionType: ViewerReactionType,
  Reactions: ResolverTypeWrapper<Reactions>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Media: ResolverTypeWrapper<Media>,
  Image: ResolverTypeWrapper<Image>,
  CommentConnection: ResolverTypeWrapper<CommentConnection>,
  CommentEdge: ResolverTypeWrapper<CommentEdge>,
  Comment: ResolverTypeWrapper<Comment>,
  SessionConnection: ResolverTypeWrapper<SessionConnection>,
  SessionEdge: ResolverTypeWrapper<SessionEdge>,
  Session: ResolverTypeWrapper<Session>,
  Mutation: ResolverTypeWrapper<{}>,
  CreatePostInput: CreatePostInput,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  AddPostCommentInput: AddPostCommentInput,
  AddReactionPayload: ResolverTypeWrapper<AddReactionPayload>,
  RemoveReactionPayload: ResolverTypeWrapper<RemoveReactionPayload>,
  UpdateUserInput: UpdateUserInput,
  CacheControlScope: CacheControlScope,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Boolean: Scalars['Boolean'],
  User: User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Int: Scalars['Int'],
  Cursor: Scalars['Cursor'],
  PostConnection: PostConnection,
  Connection: ResolversParentTypes['PostConnection'] | ResolversParentTypes['CommentConnection'] | ResolversParentTypes['SessionConnection'],
  PageInfo: PageInfo,
  PostEdge: PostEdge,
  Post: Post,
  Reactable: ResolversParentTypes['Post'] | ResolversParentTypes['Comment'],
  ViewerReactionType: ViewerReactionType,
  Reactions: Reactions,
  Date: Scalars['Date'],
  Media: Media,
  Image: Image,
  CommentConnection: CommentConnection,
  CommentEdge: CommentEdge,
  Comment: Comment,
  SessionConnection: SessionConnection,
  SessionEdge: SessionEdge,
  Session: Session,
  Mutation: {},
  CreatePostInput: CreatePostInput,
  Upload: Scalars['Upload'],
  AddPostCommentInput: AddPostCommentInput,
  AddReactionPayload: AddReactionPayload,
  RemoveReactionPayload: RemoveReactionPayload,
  UpdateUserInput: UpdateUserInput,
  CacheControlScope: CacheControlScope,
};

export type AddReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddReactionPayload'] = ResolversParentTypes['AddReactionPayload']> = {
  reactableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  viewerReaction?: Resolver<ResolversTypes['ViewerReactionType'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  commenter?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  reactions?: Resolver<ResolversTypes['Reactions'], ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CommentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['CommentEdge']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CommentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = {
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  __resolveType: TypeResolveFn<'PostConnection' | 'CommentConnection' | 'SessionConnection', ParentType, ContextType>,
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor'
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  Url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  thumbnail?: Resolver<ResolversTypes['Image'], ParentType, ContextType>,
  smallImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>,
  standardImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>,
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>,
  addPostComment?: Resolver<Maybe<ResolversTypes['CommentEdge']>, ParentType, ContextType, RequireFields<MutationAddPostCommentArgs, 'input'>>,
  removePostComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemovePostCommentArgs, 'id'>>,
  addReaction?: Resolver<ResolversTypes['AddReactionPayload'], ParentType, ContextType, RequireFields<MutationAddReactionArgs, 'reactableId' | 'type'>>,
  removeReaction?: Resolver<ResolversTypes['RemoveReactionPayload'], ParentType, ContextType, RequireFields<MutationRemoveReactionArgs, 'reactableId'>>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>,
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  media?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  reactions?: Resolver<ResolversTypes['Reactions'], ParentType, ContextType>,
  comments?: Resolver<ResolversTypes['CommentConnection'], ParentType, ContextType, RequireFields<PostCommentsArgs, 'first'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = {
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'first'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
};

export type ReactableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reactable'] = ResolversParentTypes['Reactable']> = {
  __resolveType: TypeResolveFn<'Post' | 'Comment', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  reactions?: Resolver<ResolversTypes['Reactions'], ParentType, ContextType>,
};

export type ReactionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reactions'] = ResolversParentTypes['Reactions']> = {
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  dislikeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type RemoveReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveReactionPayload'] = ResolversParentTypes['RemoveReactionPayload']> = {
  reactableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  browser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SessionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionConnection'] = ResolversParentTypes['SessionConnection']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['SessionEdge']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SessionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionEdge'] = ResolversParentTypes['SessionEdge']> = {
  node?: Resolver<ResolversTypes['Session'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posts?: Resolver<Maybe<ResolversTypes['PostConnection']>, ParentType, ContextType, RequireFields<UserPostsArgs, 'first'>>,
  sessions?: Resolver<Maybe<ResolversTypes['SessionConnection']>, ParentType, ContextType, RequireFields<UserSessionsArgs, 'first'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  AddReactionPayload?: AddReactionPayloadResolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  CommentConnection?: CommentConnectionResolvers<ContextType>,
  CommentEdge?: CommentEdgeResolvers<ContextType>,
  Connection?: ConnectionResolvers,
  Cursor?: GraphQLScalarType,
  Date?: GraphQLScalarType,
  Image?: ImageResolvers<ContextType>,
  Media?: MediaResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  PostConnection?: PostConnectionResolvers<ContextType>,
  PostEdge?: PostEdgeResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Reactable?: ReactableResolvers,
  Reactions?: ReactionsResolvers<ContextType>,
  RemoveReactionPayload?: RemoveReactionPayloadResolvers<ContextType>,
  Session?: SessionResolvers<ContextType>,
  SessionConnection?: SessionConnectionResolvers<ContextType>,
  SessionEdge?: SessionEdgeResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
