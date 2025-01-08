import user from './user';
import room from './room';
import message from './message';

export interface IModels {
  user: typeof user;
  room: typeof room;
  message: typeof message;
}

export type RoomWithMessages = Omit<typeof room, 'messages'> & { messages: (typeof message)[] };

const models: IModels = {
  user,
  room,
  message,
};

export default models;
