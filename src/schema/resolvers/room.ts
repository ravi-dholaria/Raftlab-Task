import { RoomDbObject, RoomResolvers, MessageDbObject } from '../types';
import { GraphQLError } from 'graphql';
import fs from 'fs';
import message from '../../models/message';
import { ObjectId } from 'mongodb';

const Room: RoomResolvers = {
  messages: async (parent: RoomDbObject, _args, context) => {
    if (!parent || !parent._id) {
      throw new GraphQLError('Invalid parent room object provided.');
    }

    const roomMessages : ObjectId[] | undefined = parent.messages ?? (await context.models.room
      .findById(parent._id, { messages: 1 })
      .lean())?.messages;

    if (!roomMessages) {
      return [];
    }

    return await context.models.message
      .find({ _id: { $in: roomMessages } })
      .lean();
  },
};

export default Room;
