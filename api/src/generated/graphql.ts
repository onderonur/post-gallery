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
  Date: any,
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreatePostInput = {
  title: Scalars['String'],
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

export type PaginationOptions = {
   __typename?: 'PaginationOptions',
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['Cursor']>,
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title: Scalars['String'],
  postFiles: Array<Maybe<PostFile>>,
};

export type PostConnection = {
   __typename?: 'PostConnection',
  totalCount: Scalars['Int'],
  pageInfo: PageInfo,
  edges: Array<Maybe<PostEdge>>,
};

export type PostEdge = {
   __typename?: 'PostEdge',
  node: Post,
  cursor: Scalars['Cursor'],
};

export type PostFile = {
   __typename?: 'PostFile',
  id: Scalars['ID'],
  filepath: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  post?: Maybe<Post>,
  posts: PostConnection,
};


export type QueryPostArgs = {
  id: Scalars['ID']
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
  PostFile: ResolverTypeWrapper<PostFile>,
  PostConnection: ResolverTypeWrapper<PostConnection>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  PostEdge: ResolverTypeWrapper<PostEdge>,
  Mutation: ResolverTypeWrapper<{}>,
  CreatePostInput: CreatePostInput,
  CreatePostMutationsResponse: ResolverTypeWrapper<CreatePostMutationsResponse>,
  MutationResponse: ResolverTypeWrapper<MutationResponse>,
  DeletePostMutationResponse: ResolverTypeWrapper<DeletePostMutationResponse>,
  CacheControlScope: CacheControlScope,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  PaginationOptions: ResolverTypeWrapper<PaginationOptions>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Post: Post,
  String: Scalars['String'],
  PostFile: PostFile,
  PostConnection: PostConnection,
  Int: Scalars['Int'],
  PageInfo: PageInfo,
  Cursor: Scalars['Cursor'],
  Boolean: Scalars['Boolean'],
  PostEdge: PostEdge,
  Mutation: {},
  CreatePostInput: CreatePostInput,
  CreatePostMutationsResponse: CreatePostMutationsResponse,
  MutationResponse: MutationResponse,
  DeletePostMutationResponse: DeletePostMutationResponse,
  CacheControlScope: CacheControlScope,
  Date: Scalars['Date'],
  PaginationOptions: PaginationOptions,
  Upload: Scalars['Upload'],
}>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CreatePostMutationsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostMutationsResponse'] = ResolversParentTypes['CreatePostMutationsResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
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
}>;

export type PaginationOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationOptions'] = ResolversParentTypes['PaginationOptions']> = ResolversObject<{
  first?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  after?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>,
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postFiles?: Resolver<Array<Maybe<ResolversTypes['PostFile']>>, ParentType, ContextType>,
}>;

export type PostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<Maybe<ResolversTypes['PostEdge']>>, ParentType, ContextType>,
}>;

export type PostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>,
}>;

export type PostFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostFile'] = ResolversParentTypes['PostFile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  filepath?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  CreatePostMutationsResponse?: CreatePostMutationsResponseResolvers<ContextType>,
  Cursor?: GraphQLScalarType,
  Date?: GraphQLScalarType,
  DeletePostMutationResponse?: DeletePostMutationResponseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  MutationResponse?: MutationResponseResolvers,
  PageInfo?: PageInfoResolvers<ContextType>,
  PaginationOptions?: PaginationOptionsResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  PostConnection?: PostConnectionResolvers<ContextType>,
  PostEdge?: PostEdgeResolvers<ContextType>,
  PostFile?: PostFileResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Upload?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;