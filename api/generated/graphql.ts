import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { PostMapper, CategoryMapper, CommentMapper, UserMapper, GQLContext } from '@api/shared/shared.types';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  SocialAccountType: SocialAccountType;
  Session: ResolverTypeWrapper<Session>;
  SessionEdge: ResolverTypeWrapper<SessionEdge>;
  SessionConnection: ResolverTypeWrapper<SessionConnection>;
  Category: ResolverTypeWrapper<CategoryMapper>;
  AddPostCommentInput: AddPostCommentInput;
  Comment: ResolverTypeWrapper<CommentMapper>;
  CommentEdge: ResolverTypeWrapper<Omit<CommentEdge, 'node'> & { node: ResolversTypes['Comment'] }>;
  CommentConnection: ResolverTypeWrapper<Omit<CommentConnection, 'edges'> & { edges: Array<ResolversTypes['CommentEdge']> }>;
  GraphImage: ResolverTypeWrapper<GraphImage>;
  GraphMedia: ResolverTypeWrapper<GraphMedia>;
  Post: ResolverTypeWrapper<PostMapper>;
  PostEdge: ResolverTypeWrapper<Omit<PostEdge, 'node'> & { node: ResolversTypes['Post'] }>;
  PostConnection: ResolverTypeWrapper<Omit<PostConnection, 'edges'> & { edges: Array<ResolversTypes['PostEdge']> }>;
  PostInput: PostInput;
  ReactionType: ReactionType;
  AddReactionPayload: ResolverTypeWrapper<AddReactionPayload>;
  RemoveReactionPayload: ResolverTypeWrapper<RemoveReactionPayload>;
  Reactable: ResolversTypes['Comment'] | ResolversTypes['Post'];
  ReactionsCount: ResolverTypeWrapper<ReactionsCount>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Connection: ResolversTypes['SessionConnection'] | ResolversTypes['CommentConnection'] | ResolversTypes['PostConnection'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  UserInput: UserInput;
  User: ResolverTypeWrapper<UserMapper>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  ID: Scalars['ID'];
  Mutation: {};
  Session: Session;
  SessionEdge: SessionEdge;
  SessionConnection: SessionConnection;
  Category: CategoryMapper;
  AddPostCommentInput: AddPostCommentInput;
  Comment: CommentMapper;
  CommentEdge: Omit<CommentEdge, 'node'> & { node: ResolversParentTypes['Comment'] };
  CommentConnection: Omit<CommentConnection, 'edges'> & { edges: Array<ResolversParentTypes['CommentEdge']> };
  GraphImage: GraphImage;
  GraphMedia: GraphMedia;
  Post: PostMapper;
  PostEdge: Omit<PostEdge, 'node'> & { node: ResolversParentTypes['Post'] };
  PostConnection: Omit<PostConnection, 'edges'> & { edges: Array<ResolversParentTypes['PostEdge']> };
  PostInput: PostInput;
  AddReactionPayload: AddReactionPayload;
  RemoveReactionPayload: RemoveReactionPayload;
  Reactable: ResolversParentTypes['Comment'] | ResolversParentTypes['Post'];
  ReactionsCount: ReactionsCount;
  Date: Scalars['Date'];
  Cursor: Scalars['Cursor'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  EmailAddress: Scalars['EmailAddress'];
  Connection: ResolversParentTypes['SessionConnection'] | ResolversParentTypes['CommentConnection'] | ResolversParentTypes['PostConnection'];
  PageInfo: PageInfo;
  UserInput: UserInput;
  User: UserMapper;
}>;

export type QueryResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'slug'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'first'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  addPostComment?: Resolver<Maybe<ResolversTypes['CommentEdge']>, ParentType, ContextType, RequireFields<MutationAddPostCommentArgs, 'input'>>;
  addReaction?: Resolver<ResolversTypes['AddReactionPayload'], ParentType, ContextType, RequireFields<MutationAddReactionArgs, 'reactableId' | 'type'>>;
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteViewerSessions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  linkViewerSocialAccount?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLinkViewerSocialAccountArgs, 'socialAccountType' | 'token'>>;
  removePostComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemovePostCommentArgs, 'id'>>;
  removeReaction?: Resolver<ResolversTypes['RemoveReactionPayload'], ParentType, ContextType, RequireFields<MutationRemoveReactionArgs, 'reactableId'>>;
  unlinkViewerSocialAccount?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUnlinkViewerSocialAccountArgs, 'socialAccountType'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
}>;

export type SessionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  browser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  isCurrent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionEdgeResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['SessionEdge'] = ResolversParentTypes['SessionEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Session'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['SessionConnection'] = ResolversParentTypes['SessionConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['SessionEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, RequireFields<CategoryPostsArgs, 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  commenter?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  reactionsCount?: Resolver<ResolversTypes['ReactionsCount'], ParentType, ContextType>;
  viewerReaction?: Resolver<Maybe<ResolversTypes['ReactionType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentEdgeResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['CommentEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphImageResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['GraphImage'] = ResolversParentTypes['GraphImage']> = ResolversObject<{
  width?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphMediaResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['GraphMedia'] = ResolversParentTypes['GraphMedia']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['GraphImage'], ParentType, ContextType>;
  smallImage?: Resolver<ResolversTypes['GraphImage'], ParentType, ContextType>;
  standardImage?: Resolver<ResolversTypes['GraphImage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['GraphMedia']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  viewerReaction?: Resolver<Maybe<ResolversTypes['ReactionType']>, ParentType, ContextType>;
  reactionsCount?: Resolver<ResolversTypes['ReactionsCount'], ParentType, ContextType>;
  commentsCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['CommentConnection'], ParentType, ContextType, RequireFields<PostCommentsArgs, 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostEdgeResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddReactionPayloadResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['AddReactionPayload'] = ResolversParentTypes['AddReactionPayload']> = ResolversObject<{
  reactableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  viewerReaction?: Resolver<ResolversTypes['ReactionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveReactionPayloadResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['RemoveReactionPayload'] = ResolversParentTypes['RemoveReactionPayload']> = ResolversObject<{
  reactableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  viewerReaction?: Resolver<Maybe<ResolversTypes['ReactionType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReactableResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Reactable'] = ResolversParentTypes['Reactable']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Comment' | 'Post', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  viewerReaction?: Resolver<Maybe<ResolversTypes['ReactionType']>, ParentType, ContextType>;
  reactionsCount?: Resolver<ResolversTypes['ReactionsCount'], ParentType, ContextType>;
}>;

export type ReactionsCountResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['ReactionsCount'] = ResolversParentTypes['ReactionsCount']> = ResolversObject<{
  likesCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  dislikesCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ConnectionResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = ResolversObject<{
  __resolveType: TypeResolveFn<'SessionConnection' | 'CommentConnection' | 'PostConnection', ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googleProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebookProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postsCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, RequireFields<UserPostsArgs, 'first'>>;
  sessions?: Resolver<ResolversTypes['SessionConnection'], ParentType, ContextType, RequireFields<UserSessionsArgs, 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GQLContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionEdge?: SessionEdgeResolvers<ContextType>;
  SessionConnection?: SessionConnectionResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  GraphImage?: GraphImageResolvers<ContextType>;
  GraphMedia?: GraphMediaResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  AddReactionPayload?: AddReactionPayloadResolvers<ContextType>;
  RemoveReactionPayload?: RemoveReactionPayloadResolvers<ContextType>;
  Reactable?: ReactableResolvers<ContextType>;
  ReactionsCount?: ReactionsCountResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Cursor?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Connection?: ConnectionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GQLContext> = Resolvers<ContextType>;
