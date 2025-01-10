import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { MyContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type InputUser = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  room: Room;
  text: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  Login: AuthPayload;
  createRoom: Room;
  deleteUser: User;
  joinRoom: Room;
  leaveRoom?: Maybe<Scalars['Boolean']['output']>;
  sendMessage: Message;
  signUp: AuthPayload;
  updateUser: User;
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationCreateRoomArgs = {
  name: Scalars['String']['input'];
};

export type MutationJoinRoomArgs = {
  name: Scalars['String']['input'];
};

export type MutationLeaveRoomArgs = {
  roomId: Scalars['String']['input'];
};

export type MutationSendMessageArgs = {
  roomId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type MutationSignUpArgs = {
  input: InputUser;
};

export type MutationUpdateUserArgs = {
  input: InputUser;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  messages: Room;
  rooms?: Maybe<Array<Room>>;
};

export type QueryMessagesArgs = {
  roomId: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  _id: Scalars['ID']['output'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

import { ObjectId } from 'mongodb';
export type MessageDbObject = {
  _id: ObjectId;
  createdAt: any;
  room: RoomDbObject['_id'];
  text: string;
  user: UserDbObject['_id'];
};

export type RoomDbObject = {
  _id: ObjectId;
  messages?: Maybe<Array<MessageDbObject['_id']>>;
  name: string;
};

export type UserDbObject = {
  _id: ObjectId;
  email: string;
  name: string;
  password: string;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
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

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  InputUser: InputUser;
  Message: ResolverTypeWrapper<MessageDbObject>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Room: ResolverTypeWrapper<RoomDbObject>;
  User: ResolverTypeWrapper<UserDbObject>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  String: Scalars['String']['output'];
  DateTime: Scalars['DateTime']['output'];
  InputUser: InputUser;
  Message: MessageDbObject;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Boolean: Scalars['Boolean']['output'];
  Query: {};
  Room: RoomDbObject;
  User: UserDbObject;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = UnionDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = AbstractEntityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = EntityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = ColumnDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = IdDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = LinkDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = EmbeddedDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = MapDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload'],
> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MessageResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message'],
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  Login?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'email' | 'password'>
  >;
  createRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoomArgs, 'name'>
  >;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  joinRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<MutationJoinRoomArgs, 'name'>
  >;
  leaveRoom?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationLeaveRoomArgs, 'roomId'>
  >;
  sendMessage?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, 'roomId' | 'text'>
  >;
  signUp?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, 'input'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >;
};

export type QueryResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  messages?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<QueryMessagesArgs, 'roomId'>
  >;
  rooms?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType>;
};

export type RoomResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room'],
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MyContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};
