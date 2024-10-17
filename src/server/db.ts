import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

export async function connectToDatabase() {
  try {
    await mongoose.connect(
      'mongodb+srv://aguscordes17:<L8kyMXrYPkpjdawB>@mrbeastairdrop.5wew6.mongodb.net/?retryWrites=true&w=majority&appName=Mrbeastairdrop'
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export async function closeDatabaseConnection() {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
}
