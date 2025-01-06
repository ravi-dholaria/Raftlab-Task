import { GraphQLError } from 'graphql';
import { MessageResolvers } from '../types';
import convertToPlainObject from './utility';

const Message: MessageResolvers = {
  room: async (parent, args, context) => {
    const room = await context.models.room.findById(parent.room).lean();
    if (!room) {
      throw new GraphQLError('Room not found');
    }
    return {
      id: room._id.toString(),
      name: room.name,
      messages: null,
    };
  },
  user: async (parent, args, context) => {
    const user = await context.models.user.findById(parent.user).lean();
    return convertToPlainObject(user);
  },
};

export default Message;
