import Query from './queries/queries';
import { DateTime } from './helper/utility';
import user_resolver from './individual-resolvers/user';
import message_resolver from './individual-resolvers/message';
import room_resolver from './individual-resolvers/room';
import Mutation from './mutations/mutations';
import { Resolvers } from '../schema/types';

const resolvers: Resolvers = {
  Query,
  Mutation,
  DateTime,
  User: user_resolver,
  Message: message_resolver,
  Room: room_resolver,
};

export default resolvers;
