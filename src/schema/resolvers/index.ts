import Query from './queries';
import { DateTime } from './utility';
import user_resolver from './user';
import message_resolver from './message';
import room_resolver from './room';
import { Resolvers } from '../types';

const resolvers : Resolvers = {
  Query,
  DateTime,
  User: user_resolver,
  Message: message_resolver,
  Room: room_resolver,
} 

export default resolvers;
