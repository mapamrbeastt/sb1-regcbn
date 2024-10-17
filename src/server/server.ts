import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from './db';
import { userRouter } from './routes/userRoutes';
import { taskRouter } from './routes/taskRoutes';
import { authRouter } from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', mongodbUri: process.env.MONGODB_URI ? 'Defined' : 'Not defined' });
});

async function startServer() {
  try {
    await connectToDatabase();
    console.log('Connected to database');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    process.on('SIGINT', async () => {
      await closeDatabaseConnection();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();