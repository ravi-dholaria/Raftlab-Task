import { Server } from 'socket.io';
import http from 'http';
import models from './models';
import { GraphQLError } from 'graphql';
import { isTokenValid } from './auth';
import resolvers from './resolvers';
const socketServer = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    //check if user is authenticated
    const token: string | null = socket.handshake.auth.token as string | null;
    const userId = token ? isTokenValid(token) : null;
    if (!userId) {
      socket.emit('error', 'Invalid token');
      socket.disconnect();
      return;
    }
    console.log('A user connected', socket.id, userId);

    socket.on('joinRoom', async (roomName) => {
      try {
        //check if mutation is a function
        if (typeof resolvers.Mutation?.joinRoom !== 'function') {
          throw new GraphQLError('joinRoom resolver is not a function');
        }

        //call mutation
        const room = await resolvers.Mutation.joinRoom(
          {},
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          { name: roomName },
          { models, userId },
        );

        //emit to user that he joined
        await socket.join(room._id.toString());
        io.to(room._id.toString()).emit('roomJoined', room._id);
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', 'Error joining room');
      }
    });

    // Listen for messages from clients
    socket.on(
      'sendMessage',

      async ({ text, roomId }: { text: string; roomId: string }) => {
        try {
          console.log('Sending message:', text, userId, roomId);

          //check if mutation is a function
          if (typeof resolvers.Mutation?.sendMessage !== 'function') {
            throw new GraphQLError('sendMessage resolver is not a function');
          }

          //call mutation
          const message = await resolvers.Mutation.sendMessage(
            {},
            { text, roomId },
            { models, userId },
          );

          //emit message to room
          // console.log('Emitting to room: ', roomId, ' message: ', message);
          io.to(roomId).emit('newMessage', message);
        } catch (error) {
          console.error('Error sending message:', error);
          socket.emit('error', 'Error sending message');
        }
      },
    );

    socket.on('disconnect', () => {
      console.log('A user disconnected', socket.id);
    });
  });
};

export default socketServer;
