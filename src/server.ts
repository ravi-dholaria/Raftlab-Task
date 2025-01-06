import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import resolvers from './schema/resolvers';
import typeDefs from './schema/typeDefs';
import connectDB from './db';
import models, { Imodels } from './models/index';

export interface MyContext {
  models: Imodels;
  userId?: string;
}

const app = express();

const httpServer = http.createServer(app);
connectDB();

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

void (async () => {
  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),

    expressMiddleware(server, {
      // eslint-disable-next-line @typescript-eslint/require-await
      context: async ({ req }) => ({
        models,
        userId: req.headers?.authorization || undefined,
      }),
    }),
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
})();
