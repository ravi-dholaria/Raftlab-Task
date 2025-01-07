import { GraphQLError } from 'graphql';
import { MessageResolvers, RoomDbObject, UserDbObject } from '../types';

const Message: MessageResolvers = {
  room: async (parent, args, context) => {
    const room: RoomDbObject | null = await context.models.room.findById(parent.room).lean();
    if (!room) {
      throw new GraphQLError('Room not found');
    }
    return room;
  },
  user: async (parent, args, context) => {
    const user: UserDbObject | null = await context.models.user.findById(parent.user).lean();
    if (!user) {
      throw new GraphQLError('User not found');
    }
    return user;
  },
};

export default Message;
