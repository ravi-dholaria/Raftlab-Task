import { readFileSync } from 'fs';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import resolvers from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';
// Combine DIRECTIVES with your schema
const schemaSDL = gql(readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' }));
const schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, schemaSDL],
  resolvers,
});
export default schema;
