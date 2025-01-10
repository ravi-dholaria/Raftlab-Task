import { createServer } from './app';
import connectDB from './database/db';
import socketServer from './socket.io-server';

void (async () => {
  await connectDB();

  //apollo server instance with express middleware
  const httpServer = await createServer();

  socketServer(httpServer);

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
})();
