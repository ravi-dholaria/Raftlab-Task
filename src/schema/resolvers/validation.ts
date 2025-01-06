/* eslint-disable @typescript-eslint/no-unused-expressions */
import { GraphQLError } from 'graphql';
import { isObjectIdOrHexString } from 'mongoose';
import { InputUser, Maybe } from '../types';

export const validatePassword = (password: string): void => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    throw new GraphQLError(
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.',
    );
  }
};

export const validateEmail = (email: string): void => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    throw new GraphQLError('Invalid email address');
  }
};

export const validateName = (name: string): void => {
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    throw new GraphQLError('Name must contain only letters and spaces');
  }
};

export const validateId = (id: string): void => {
  if (!isObjectIdOrHexString(id)) {
    throw new GraphQLError('Invalid ID');
  }
};

export const isString = (name: string, value: Maybe<string> | undefined): value is string => {
  if (value === null || value === undefined) {
    throw new GraphQLError(`${name} is required`);
  }
  return typeof value === 'string';
};

export const validateInputUser: (input: InputUser) => asserts input is {
  email: string;
  name: string;
  password: string;
} = (input) => {
  isString('email', input.email) && validateEmail(input.email);
  isString('name', input.name) && validateName(input.name);
  isString('password', input.password) && validatePassword(input.password);
};

export const validateUpdateUser = ({ email, name, password }: InputUser): void => {
  email && validateEmail(email);
  name && validateName(name);
  password && validatePassword(password);
};
