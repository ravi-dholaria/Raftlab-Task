import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema/schema.graphql',
  generates: {
    './src/schema/types.ts': {
      plugins: ['typescript', 'typescript-mongodb', 'typescript-resolvers'],
      config: {
        contextType: '../server#MyContext',
        objectIdType: 'ObjectId#mongodb',
        idFieldName: '_id', // Customize ObjectId type
        useTypeImports: true,
        mappers: {
          User: 'UserDbObject',
          Room: 'RoomDbObject',
          Message: 'MessageDbObject',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
