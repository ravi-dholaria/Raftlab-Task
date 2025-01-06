import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT ?? '3000',
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  db_url: process.env.MONGO_URI ?? 'mongodb://localhost:27017/test',
};
