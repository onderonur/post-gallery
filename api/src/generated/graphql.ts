import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Cursor: any,
  Upload: any,
  Date: any,
};

export type CreatePostInput = {
  title: Scalars['String'],
  medias: Array<Scalars['Upload']>,
};

export type CreatePostMutationsResponse = MutationResponse & {
   __typename?: 'CreatePostMutationsResponse',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  post?: Maybe<Post>,
};



export type DeletePostMutationResponse = MutationResponse & {
   __typename?: 'DeletePostMutationResponse',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
};

export type Media = {
   __typename?: 'Media',
  id: Scalars['ID'],
  thumbnailWidth: Scalars['Int'],
  thumbnailHeight: Scalars['Int'],
  thumbnailURL: Scalars['String'],
  smallWidth: Scalars['Int'],
  smallHeight: Scalars['Int'],
  smallURL: Scalars['String'],
  standardWidth: Scalars['Int'],
  standardHeight: Scalars['Int'],
  standardURL: Scalars['String'],
  owner: MediaOwner,
};

export enum MediaOwner {
  Post = 'POST'
}

export type Mutation = {
   __typename?: 'Mutation',
  createPost: CreatePostMutationsResponse,
  deletePost: DeletePostMutationResponse,
};


export type MutationCreatePostArgs = {
  input: CreatePostInput
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};

export type MutationResponse = {
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
};

export type PageInfo = {
   __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['Cursor']>,
  hasNextPage: Scalars['Boolean'],
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title: Scalars['String'],
  postMedias: Array<PostMedia>,
};

export type PostConnection = {
   __typename?: 'PostConnection',
  totalCount: Scalars['Int'],
  pageInfo: PageInfo,
  edges: Array<PostEdge>,
};

export type PostEdge = {
   __typename?: 'PostEdge',
  node: Post,
  cursor: Scalars['Cursor'],
};

export type PostMedia = {
   __typename?: 'PostMedia',
  id: Scalars['ID'],
  media: Media,
};

export type Query = {
   __typename?: 'Query',
  post?: Maybe<Post>,
  posts: PostConnection,
  viewer: Viewer,
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['Cursor']>
};


export type Viewer = {
   __typename?: 'Viewer',
  id: Scalars['ID'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

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
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<Post>,
  String: ResolverTypeWrapper<Scalars['String']>,
  PostMedia: ResolverTypeWrapper<PostMedia>,
  Media: ResolverTypeWrapper<Media>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  MediaOwner: MediaOwner,
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>,
  PostConnection: ResolverTypeWrapper<PostConnection>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  PostEdge: ResolverTypeWrapper<PostEdge>,
  Viewer: ResolverTypeWrapper<Viewer>,
  Mutation: ResolverTypeWrapper<{}>,
  CreatePostInput: CreatePostInput,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  CreatePostMutationsResponse: ResolverTypeWrapper<CreatePostMutationsResponse>,
  MutationResponse: ResolverTypeWrapper<MutationResponse>,
  DeletePostMutationResponse: ResolverTypeWrapper<DeletePostMutationResponse>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Post: Post,
  String: Scalars['String'],
  PostMedia: PostMedia,
  Media: Media,
  Int: Scalars['Int'],
  MediaOwner: MediaOwner,
  Cursor: Scalars['Cursor'],
  PostConnection: PostConnection,
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  PostEdge: PostEdge,
  Viewer: Viewer,
  Mutation: {},
  CreatePostInput: CreatePostInput,
  Upload: Scalars['Upload'],
  CreatePostMutationsResponse: CreatePostMutationsResponse,
  MutationResponse: MutationResponse,
  DeletePostMutationResponse: DeletePostMutationResponse,
  Date: Scalars['Date'],
}>;

export type CreatePostMutationsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostMutationsResponse'] = ResolversParentTypes['CreatePostMutationsResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor'
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DeletePostMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletePostMutationResponse'] = ResolversParentTypes['DeletePostMutationResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  thumbnailWidth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  thumbnailHeight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  thumbnailURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  smallWidth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  smallHeight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  smallURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  standardWidth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  standardHeight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  standardURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['MediaOwner'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPost?: Resolver<ResolversTypes['CreatePostMutationsResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>,
  deletePost?: Resolver<ResolversTypes['DeletePostMutationResponse'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>,
}>;

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CreatePostMutationsResponse' | 'DeletePostMutationResponse', ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postMedias?: Resolver<Array<ResolversTypes['PostMedia']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type PostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type PostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type PostMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostMedia'] = ResolversParentTypes['PostMedia']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, QueryPostsArgs>,
  viewer?: Resolver<ResolversTypes['Viewer'], ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type ViewerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CreatePostMutationsResponse?: CreatePostMutationsResponseResolvers<ContextType>,
  Cursor?: GraphQLScalarType,
  Date?: GraphQLScalarType,
  DeletePostMutationResponse?: DeletePostMutationResponseResolvers<ContextType>,
  Media?: MediaResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  MutationResponse?: MutationResponseResolvers,
  PageInfo?: PageInfoResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  PostConnection?: PostConnectionResolvers<ContextType>,
  PostEdge?: PostEdgeResolvers<ContextType>,
  PostMedia?: PostMediaResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  Viewer?: ViewerResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
