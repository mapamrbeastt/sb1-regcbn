import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from './models/userModel';
import { connectToDatabase, closeDatabaseConnection } from './db';

dotenv.config();

async function initializeDatabase() {
  await connectToDatabase();

  try {
    // Eliminar todos los usuarios existentes
    await UserModel.deleteMany({});

    // Crear usuarios de ejemplo
    const users = [
      {
        coins: 1000,
        miningRate: 1,
        currentLevel: 1,
        levelProgress: 0,
        clickCount: 50,
        minedCoins: 500,
        referralCode: 'USER1CODE',
      },
      {
        coins: 2000,
        miningRate: 2,
        currentLevel: 2,
        levelProgress: 50,
        clickCount: 100,
        minedCoins: 1000,
        referralCode: 'USER2CODE',
      },
      {
        coins: 5000,
        miningRate: 5,
        currentLevel: 3,
        levelProgress: 75,
        clickCount: 200,
        minedCoins: 3000,
        referralCode: 'USER3CODE',
      },
    ];

    for (const userData of users) {
      const user = new UserModel(userData);
      await user.save();
      console.log(`Usuario creado con ID: ${user._id}`);
    }

    console.log('Base de datos inicializada con éxito');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await closeDatabaseConnection();
  }
}

initializeDatabase();