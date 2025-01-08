import mongoose from 'mongoose';
import config from '../config';
const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ Connected to MongoDB');
    });
    await mongoose.connect(config.db_url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
