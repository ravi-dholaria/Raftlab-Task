import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import schema from './schema/typeDefs';
import { createContext } from './context';
import express from 'express';
import cors from 'cors';
import http from 'http';

/**
 * Creates an Apollo Server and starts an HTTP server.
 * @returns {Promise<http.Server>} - The created HTTP server
 */
export const createServer = async (): Promise<http.Server> => {
  // Create an Express app
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Create an HTTP server
  const httpServer = http.createServer(app);

  // Create an Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      // Plugin to drain the HTTP server when the Apollo Server is stopped
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  app.use(
    '/',
    expressMiddleware(server, {
      // The context factory
      context: createContext,
    }),
  );

  return httpServer;
};
