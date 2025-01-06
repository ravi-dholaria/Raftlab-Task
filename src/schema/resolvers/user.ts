import { UserResolvers } from '../types';

const User: UserResolvers = {
  email: (parent) => parent.email,
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  password: (parent) => parent.password,
};

export default User;
