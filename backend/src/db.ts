import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 3001;

export const connectToDb = async () => {
  try {
    const url = process.env.MONGO_URI;
    if (url === undefined) return;
    await mongoose.connect(url, { dbName: 'iamjunior' });
    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('Could not connect to the database', err);
    process.exit(1);
  }
};

module.exports = { connectToDb, PORT };
