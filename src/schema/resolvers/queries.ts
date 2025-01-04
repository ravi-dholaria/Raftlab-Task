import { QueryResolvers } from '../types';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const Query: QueryResolvers = {
  books: async (parent, args, context) => {
    return books;
  },
};

export default Query;
