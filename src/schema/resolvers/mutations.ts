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

      return { user, token };
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
    return { user, token };
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
};

export default Mutation;
