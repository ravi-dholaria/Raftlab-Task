***schema.graphql***
```graphql
type Query {
  # User queries
  me: User

  # Room queries
  rooms: [RoomWithoutMessages!]
  room(id: ID!): Room!
  messages(roomId: ID!): [Message!]
}

type RoomWithoutMessages {
  id: ID!
  name: String!
}

type Mutation {
  # Authentication
  signUp(input: InputUser!): AuthPayload!
  Login(email: String!, password: String!): AuthPayload!

  # Profile management
  updateUser(input: InputUser!): User!
  deleteUser: User!

  # Room management
  createRoom(name: String!): Room!
  joinRoom(id: ID!): Room!

  # Message management
  sendMessage(roomId: ID!, text: String!): Message!
}

type Subscription {
  messageSent(roomId: ID!): Message!
}

input InputUser {
  name: String
  email: String
  password: String
}

type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type Room {
  id: ID!
  name: String!
  messages: [Message!]
}

type Message {
  id: ID!
  text: String!
  user: User!
  room: Room!
  createdAt: String!
}

```


**UserModel**
```Typescript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema);

```
**RoomModel**
```Typescript
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

export default mongoose.model('Room', roomSchema);

```
**MessageModel**

```Typescript
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
```
**User Resolvers**
```Typescript
import { UserResolvers } from '../types';

const User: UserResolvers = {
  email: (parent) => parent.email,
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  password: (parent) => parent.password,
};

export default User;
```
**Room Resolvers**
```Typescript
import { RoomResolvers } from "../types";
import convertToPlainObject from "./utility";

const Room: RoomResolvers = {
  id: (parent) => parent.id.toString(),
  name: (parent) => parent.name,
  messages: async (parent, args, context) => {
    const messages = await context.models.message
      .find({ room: parent.id })
      .lean();
    return messages.map(async (message) => {
      return {
        id: message._id.toString(),
        text: message.text,
        createdAt: message.createdAt.toString(),
        user: convertToPlainObject(
          await context.models.user.findById(message.user).lean()
        ),
        room: parent,
      };
    });
  },
};

export default Room;
```
**Message Resolvers**
```Typescript
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

```
**Query Resolvers**
```Typescript
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

```
**Mutation Resolvers**
```Typescript
import { MutationResolvers, User } from '../types';
import { GraphQLError } from 'graphql';
import {
  isString,
  validateEmail,
  validateInputUser,
  validateUpdateUser,
} from '../resolvers/validation';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const Mutation: MutationResolvers = {
  //#region Authentication
  signUp: async (parent, args, context) => {
    //validate inputs
    validateInputUser(args.input);

    //create user
    try {
      const hashedPassword = await hash(args.input.password, 10);
      const user = await context.models.user.create({
        ...args.input,
        password: hashedPassword,
      });

      //create token
      const token = sign({ userId: user.id }, process.env.JWT_SECRET!);

      return {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          password: user.password,
        },
        token,
      };
    } catch (error: unknown) {
      throw new GraphQLError(
        error instanceof Error ? error.message : 'An error occurred while registering the user',
      );
    }
  },
  Login: async (parent, { email, password }, context) => {
    //validate inputs
    (() => {
      isString('email', email);
      isString('password', password);
      validateEmail(email);
    })();

    //find user
    const user: User | null = await context.models.user.findOne({
      email,
    });

    //check if user exists
    if (!user) {
      throw new GraphQLError('User not found');
    }

    //compare password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new GraphQLError('Invalid password');
    }

    //create token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET!);
    return {
      user,
      token,
    };
  },
  //#endregion

  //#region Profile Management
  updateUser: async (parent, args, context) => {
    //check if user is authenticated
    if (!context.userId) {
      throw new GraphQLError('User not authenticated');
    }
    //validate inputs
    validateUpdateUser(args.input);
    if (args.input.password) {
      const hashedPassword = await hash(args.input.password, 10);
      args.input.password = hashedPassword;
    }

    //update user
    const updatedUser = await context.models.user
      .findByIdAndUpdate(context.userId, args.input, { new: true })
      .lean();
    if (!updatedUser) {
      throw new GraphQLError('Something went wrong while updating the user');
    }
    return {
      id: updatedUser._id.toString(),
      email: updatedUser.email,
      name: updatedUser.name,
      password: updatedUser.password,
    };
  },
  deleteUser: async (parent, args, context) => {
    //check if user is authenticated
    if (!context.userId) {
      throw new GraphQLError('User not authenticated');
    }
    //delete user
    const deletedUser = await context.models.user.findByIdAndDelete(context.userId).lean();
    if (!deletedUser) {
      throw new GraphQLError('Something went wrong while deleting the user');
    }
    return {
      id: deletedUser._id.toString(),
      email: deletedUser.email,
      name: deletedUser.name,
      password: deletedUser.password,
    };
  },
  //#endregion
};

export default Mutation;

```