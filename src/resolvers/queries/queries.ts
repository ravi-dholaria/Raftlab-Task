import { GraphQLError } from 'graphql';
import { QueryResolvers, RoomDbObject, UserDbObject } from '../../schema/types';

const Query: QueryResolvers = {
  me: async (parent, args, context) => {
    //check if user is authenticated
    if (!context.userId) {
      throw new GraphQLError('User not authenticated');
    }
    const user: UserDbObject | null = await context.models.user.findById(context.userId).lean();

    return user;
  },

  //#region Room queries
  rooms: async (parent, args, context) => {
    const rooms: RoomDbObject[] = await context.models.room.find({}, { messages: 0 }).lean();
    return rooms;
  },
  messages: async (_parent, { roomId }, context) => {
    const room: RoomDbObject | null = await context.models.room.findById(roomId).lean();
    if (!room) {
      throw new GraphQLError('Room not found');
    }
    return room;
  },
  //#endregion
};

export default Query;
