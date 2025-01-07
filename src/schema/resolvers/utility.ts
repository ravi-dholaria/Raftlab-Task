import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid DateTime value compatible with MongoDB Date',
  serialize(value) {
    // Convert MongoDB Date to ISO string
    if (!(value instanceof Date)) {
      throw new Error('DateTime must be a Date object');
    }
    return value.toISOString();
  },
  parseValue(value) {
    // Parse input from the client
    //check if value is string | number | Date
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid DateTime format');
      }
      return date; // Return a valid Date object
    }
    console.error('value is not string | number | Date');
    return new Date();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid DateTime format');
      }
      return date; // Return a valid Date object
    }
    throw new Error('DateTime must be a valid ISO 8601 string');
  },
});
