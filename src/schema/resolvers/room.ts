import { RoomResolvers } from '../types';
import convertToPlainObject from './utility';

const Room: RoomResolvers = {
  id: (parent) => parent.id.toString(),
  name: (parent) => parent.name,
  messages: async (parent, args, context) => {
    const messages = await context.models.message.find({ room: parent.id }).lean();
    return messages.map(async (message) => {
        return {
            id: message._id.toString(),
            text: message.text,
            createdAt: message.createdAt.toString(),
            user: convertToPlainObject(await context.models.user.findById(message.user).lean()),
            room: parent,
      };
    });
  },
};

export default Room;
