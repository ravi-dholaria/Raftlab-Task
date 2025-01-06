import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema/schema.graphql',
  generates: {
    './src/schema/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../server#MyContext',
      },
    },
  },
};

export default config;

