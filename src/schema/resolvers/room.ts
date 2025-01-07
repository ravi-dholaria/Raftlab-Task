import { RoomDbObject, RoomResolvers } from '../types';
import { ObjectId } from 'mongodb';

const Room: RoomResolvers = {
  messages: async (parent: RoomDbObject, _args, context) => {
    // Get the messages for the parent room
    const roomMessages: ObjectId[] | undefined =
      parent.messages ??
      (await context.models.room.findById(parent._id, { messages: 1 }).lean())?.messages;

    if (!roomMessages) return [];

    return await context.models.message.find({ _id: { $in: roomMessages } }).lean();
  },
};

export default Room;
