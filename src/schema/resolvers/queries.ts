import { GraphQLError } from 'graphql';
import { Message, QueryResolvers } from '../types';
import convertToPlainObject from './utility';
import { Document, PopulatedDoc } from 'mongoose';
import Room from './room';

const Query: QueryResolvers = {
  me: async (parent, args, context) => {
    //check if user is authenticated
    if (!context.userId) {
      throw new Error('User not authenticated');
    }
    const user = await context.models.user.findById(context.userId).lean();
    return convertToPlainObject(user);
  },

  //#region Room queries
  rooms: async (parent, args, context) => {
    const rooms = await context.models.room.find({}, { messages: 0 }).lean();
    return rooms.map((room) => convertToPlainObject(room));
  },
  room: async (_parent, { id }, context) => {
    const room = await context.models.room.findById(id).lean();
    if (!room) {
      throw new GraphQLError('Room not found');
    }
    return {
      id: room._id.toString(),
      name: room.name,
      messages: null,
    };
  },
  messages: async (_parent, { roomId }, context) => {
    const room = await context.models.room.findById(roomId).lean();
    if (!room) {
      throw new GraphQLError('Room not found');
    }
    const plainRoom = {
      id: room._id.toString(),
      name: room.name,
      messages: null,
    };
    const messages = await context.models.message.find({ room: roomId }).lean();
    return messages.map(async (message) => {
      return {
        id: message._id.toString(),
        text: message.text,
        createdAt: message.createdAt.toString(),
        user: convertToPlainObject(await context.models.user.findById(message.user).lean()),
        room: plainRoom,
      };
    });
  },
  //#endregion
};

export default Query;
