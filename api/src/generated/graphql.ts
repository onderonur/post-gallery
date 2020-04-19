import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { PostModel, CommentModel, UserModel, GQLContext } from '../types';
export type Maybe<T> = T | null | undefined;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Cursor: any;
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
  addPostComment?: Maybe<CommentEdge>;
  addReaction: AddReactionPayload;
  createPost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  removePostComment: Scalars['Boolean'];
  removeReaction: RemoveReactionPayload;
};


export type MutationAddPostCommentArgs = {
  input: AddPostCommentInput;
};


export type MutationAddReactionArgs = {
  reactableId: Scalars['ID'];
  type: ViewerReactionType;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePostCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveReactionArgs = {
  reactableId: Scalars['ID'];
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
  post?: Maybe<Post>;
  posts: PostConnection;
  user?: Maybe<User>;
  viewer?: Maybe<User>;
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


export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  posts?: Maybe<PostConnection>;
};


export type UserPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Cursor']>;
};

export enum ViewerReactionType {
  Like = 'LIKE',
  Dislike = 'DISLIKE'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<PostModel>,
  Reactable: ResolversTypes['Post'] | ResolversTypes['Comment'],
  ViewerReactionType: ViewerReactionType,
  Reactions: ResolverTypeWrapper<Reactions>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Media: ResolverTypeWrapper<Media>,
  Image: ResolverTypeWrapper<Image>,
  User: ResolverTypeWrapper<UserModel>,
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>,
  PostConnection: ResolverTypeWrapper<Omit<PostConnection, 'edges'> & { edges: Array<ResolversTypes['PostEdge']> }>,
  Connection: ResolversTypes['PostConnection'] | ResolversTypes['CommentConnection'],
  PageInfo: ResolverTypeWrapper<PageInfo>,
  PostEdge: ResolverTypeWrapper<Omit<PostEdge, 'node'> & { node: ResolversTypes['Post'] }>,
  CommentConnection: ResolverTypeWrapper<Omit<CommentConnection, 'edges'> & { edges: Array<ResolversTypes['CommentEdge']> }>,
  CommentEdge: ResolverTypeWrapper<Omit<CommentEdge, 'node'> & { node: ResolversTypes['Comment'] }>,
  Comment: ResolverTypeWrapper<CommentModel>,
  Mutation: ResolverTypeWrapper<{}>,
  AddPostCommentInput: AddPostCommentInput,
  AddReactionPayload: ResolverTypeWrapper<AddReactionPayload>,
  CreatePostInput: CreatePostInput,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  RemoveReactionPayload: ResolverTypeWrapper<RemoveReactionPayload>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Boolean: Scalars['Boolean'],
  ID: Scalars['ID'],
  Post: PostModel,
  Reactable: ResolversParentTypes['Post'] | ResolversParentTypes['Comment'],
  ViewerReactionType: ViewerReactionType,
  Reactions: Reactions,
  Int: Scalars['Int'],
  String: Scalars['String'],
  Date: Scalars['Date'],
  Media: Media,
  Image: Image,
  User: UserModel,
  Cursor: Scalars['Cursor'],
  PostConnection: Omit<PostConnection, 'edges'> & { edges: Array<ResolversParentTypes['PostEdge']> },
  Connection: ResolversParentTypes['PostConnection'] | ResolversParentTypes['CommentConnection'],
  PageInfo: PageInfo,
  PostEdge: Omit<PostEdge, 'node'> & { node: ResolversParentTypes['Post'] },
  CommentConnection: Omit<CommentConnection, 'edges'> & { edges: Array<ResolversParentTypes['CommentEdge']> },
  CommentEdge: Omit<CommentEdge, 'node'> & { node: ResolversParentTypes['Comment'] },
  Comment: CommentModel,
  Mutation: {},
  AddPostCommentInput: AddPostCommentInput,
  AddReactionPayload: AddReactionPayload,
  CreatePostInput: CreatePostInput,
  Upload: Scalars['Upload'],
  RemoveReactionPayload: RemoveReactionPayload,
}>;

export type AddReactionPayloadResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['AddReactionPayload'] = ResolversParentTypes['AddReactionPayload']> = ResolversObject<{
  reactableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  viewerReaction?: Resolver<ResolversTypes['ViewerReactionType'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CommentResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  commenter?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  reactions?: Resolver<ResolversTypes['Reactions'], ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CommentConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['CommentEdge']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CommentEdgeResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type ConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PostConnection' | 'CommentConnection', ParentType, ContextType>,
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
}>;

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor'
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type ImageResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  Url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MediaResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  thumbnail?: Resolver<ResolversTypes['Image'], ParentType, ContextType>,
  smallImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>,
  standardImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  addPostComment?: Resolver<Maybe<ResolversTypes['CommentEdge']>, ParentType, ContextType, RequireFields<MutationAddPostCommentArgs, 'input'>>,
  addReaction?: Resolver<ResolversTypes['AddReactionPayload'], ParentType, ContextType, RequireFields<MutationAddReactionArgs, 'reactableId' | 'type'>>,
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>,
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>,
  removePostComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemovePostCommentArgs, 'id'>>,
  removeReaction?: Resolver<ResolversTypes['RemoveReactionPayload'], ParentType, ContextType, RequireFields<MutationRemoveReactionArgs, 'reactableId'>>,
}>;

export type PageInfoResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PostResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  media?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  reactions?: Resolver<ResolversTypes['Reactions'], ParentType, ContextType>,
  comments?: Resolver<ResolversTypes['CommentConnection'], ParentType, ContextType, RequireFields<PostCommentsArgs, 'first'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PostConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PostEdgeResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type QueryResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'first'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type ReactableResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Reactable'] = ResolversParentTypes['Reactable']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Post' | 'Comment', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  reactions?: Resolver<ResolversTypes['Reactions'], ParentType, ContextType>,
}>;

export type ReactionsResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Reactions'] = ResolversParentTypes['Reactions']> = ResolversObject<{
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  dislikeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type RemoveReactionPayloadResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['RemoveReactionPayload'] = ResolversParentTypes['RemoveReactionPayload']> = ResolversObject<{
  reactableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  viewerReaction?: Resolver<Maybe<ResolversTypes['ViewerReactionType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posts?: Resolver<Maybe<ResolversTypes['PostConnection']>, ParentType, ContextType, RequireFields<UserPostsArgs, 'first'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = GQLContext> = ResolversObject<{
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
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = GQLContext> = Resolvers<ContextType>;
