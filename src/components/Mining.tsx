import React from 'react';
import { Pickaxe } from 'lucide-react';

interface MiningProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  miningRate: number;
  setMiningRate: React.Dispatch<React.SetStateAction<number>>;
}

const Mining: React.FC<MiningProps> = ({ coins, setCoins, miningRate, setMiningRate }) => {
  const handleMine = () => {
    setCoins(prevCoins => prevCoins + miningRate);
  };

  const upgradeMiningRate = () => {
    const cost = miningRate * 10;
    if (coins >= cost) {
      setCoins(prevCoins => prevCoins - cost);
      setMiningRate(prevRate => prevRate + 1);
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Minería</h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full flex items-center justify-center"
        onClick={handleMine}
      >
        <Pickaxe className="mr-2" /> Minar
      </button>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
        onClick={upgradeMiningRate}
        disabled={coins < miningRate * 10}
      >
        Mejorar (Costo: {miningRate * 10})
      </button>
      <p className="mt-2 text-sm">Tasa de minería: {miningRate}/s</p>
    </div>
  );
};

export default Mining;