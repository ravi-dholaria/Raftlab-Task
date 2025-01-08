import { createServer } from './app';
import connectDB from './database/db';

void (async () => {
  await connectDB();

  const httpServer = await createServer();

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
})();
