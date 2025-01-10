import { MutationResolvers, User } from '../../schema/types';
import { GraphQLError } from 'graphql';
import {
  isString,
  validateEmail,
  validateInputUser,
  validateUpdateUser,
} from '../helper/validation';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../../config';

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
      const token = sign({ userId: user._id }, config.JWT_SECRET);

      return {
        userId: user._id.toString(),
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
    if (!user) throw new GraphQLError('User not found');

    //compare password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new GraphQLError('Invalid password');

    //create token
    const token = sign({ userId: user._id }, config.JWT_SECRET);
    return { userId: user._id.toString(), token };
  },
  //#endregion

  //#region Profile Management
  updateUser: async (parent, args, context) => {
    //check if user is authenticated
    if (!context.userId) throw new GraphQLError('User not authenticated');

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
    if (!updatedUser) throw new GraphQLError('Something went wrong while updating the user');

    return updatedUser;
  },

  deleteUser: async (_, __, context) => {
    //check if user is authenticated
    if (!context.userId) throw new GraphQLError('User not authenticated');

    //delete user
    const deletedUser = await context.models.user.findByIdAndDelete(context.userId).lean();
    if (!deletedUser) throw new GraphQLError('Something went wrong while deleting the user');

    return deletedUser;
  },
  //#endregion

  //#region Room Management
  createRoom: async (_, { name }, context) => {
    //check if user is authenticated
    if (!context.userId) throw new GraphQLError('User not authenticated');

    //create room
    const room = await context.models.room.create({ name, messages: [] });
    return room;
  },

  joinRoom: async (_, { name }, context) => {
    //check if user is authenticated
    if (!context.userId) throw new GraphQLError('User not authenticated');

    //join room
    const room = await context.models.room.findOne({ name }).lean();
    if (!room) throw new GraphQLError('Room not found');

    return room;
  },
  //#endregion

  //#region Message Management
  sendMessage: async (_, { text, roomId }, context) => {
    //check if user is authenticated
    if (!context.userId) throw new GraphQLError('User not authenticated');

    //send message
    const message = await context.models.message.create({
      text,
      user: context.userId,
      room: roomId,
    });
    return message;
  },
  //#endregion
};

export default Mutation;
