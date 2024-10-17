import React, { useState } from 'react';
import { Instagram, Youtube, Twitter, Coins } from 'lucide-react';
import DailyRewardsPopup from './DailyRewardsPopup';

interface TasksSceneProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const TasksScene: React.FC<TasksSceneProps> = ({ coins, setCoins }) => {
  const [showDailyRewards, setShowDailyRewards] = useState(false);

  const handleTaskCompletion = (points: number) => {
    setCoins(prevCoins => prevCoins + points);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Tareas diarias</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coins className="text-yellow-500 mr-2" />
              <span className="text-black">Gana monedas diariamente</span>
            </div>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setShowDailyRewards(true)}
            >
              <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-5 h-5 mr-1" />
              +3000
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Tareas Sociales</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Instagram className="text-black mr-2" />
                <span className="text-black">Seguir en Instagram</span>
              </div>
              <button 
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => handleTaskCompletion(200)}
              >
                <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-5 h-5 mr-1" />
                +200
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Youtube className="text-black mr-2" />
                <span className="text-black">Suscribirse en YouTube</span>
              </div>
              <button 
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => handleTaskCompletion(250)}
              >
                <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-5 h-5 mr-1" />
                +250
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Twitter className="text-black mr-2" />
                <span className="text-black">Seguir en X (Twitter)</span>
              </div>
              <button 
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => handleTaskCompletion(180)}
              >
                <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-5 h-5 mr-1" />
                +180
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 015.2-2.64V6.54a7.93 7.93 0 006.59 7.23l.63.09V6.69z" />
                </svg>
                <span className="text-black">Seguir en TikTok</span>
              </div>
              <button 
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => handleTaskCompletion(220)}
              >
                <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-5 h-5 mr-1" />
                +220
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDailyRewards && (
        <DailyRewardsPopup onClose={() => setShowDailyRewards(false)} onClaim={handleTaskCompletion} />
      )}
    </div>
  );
};

export default TasksScene;