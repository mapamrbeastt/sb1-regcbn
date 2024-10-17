import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface BoostersProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  miningRate: number;
  setMiningRate: React.Dispatch<React.SetStateAction<number>>;
}

const Boosters: React.FC<BoostersProps> = ({ coins, setCoins, miningRate, setMiningRate }) => {
  const [boosterActive, setBoosterActive] = useState(false);

  const activateBooster = () => {
    const cost = 100;
    if (coins >= cost && !boosterActive) {
      setCoins(prevCoins => prevCoins - cost);
      setBoosterActive(true);
      setMiningRate(prevRate => prevRate * 2);
      setTimeout(() => {
        setBoosterActive(false);
        setMiningRate(prevRate => prevRate / 2);
      }, 30000);
    }
  };

  return (
    <div className="bg-red-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Potenciadores</h2>
      <button
        className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center ${boosterActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={activateBooster}
        disabled={boosterActive || coins < 100}
      >
        <Zap className="mr-2" /> {boosterActive ? 'Activo' : 'Activar (100 monedas)'}
      </button>
      {boosterActive && <p className="mt-2 text-sm text-center">¡Potenciador activo por 30 segundos!</p>}
    </div>
  );
};

export default Boosters;