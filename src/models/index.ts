import user from './user';
import room from './room';
import message from './message';

export interface Imodels {
  user: typeof user;
  room: typeof room;
  message: typeof message;
}

export type roomWithMessages = Omit<typeof room, 'messages'> & { messages: (typeof message)[] };

const models: Imodels = {
  user,
  room,
  message,
};

export default models;
