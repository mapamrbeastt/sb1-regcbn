import React, { useState, useEffect } from 'react';
import { Pickaxe, RefreshCw } from 'lucide-react';

interface MiningSceneProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  miningRate: number;
  setMiningRate: React.Dispatch<React.SetStateAction<number>>;
  resetGameState: () => void;
}

interface MiningCard {
  id: number;
  name: string;
  levels: number[];
  prices: number[];
  currentLevel: number;
  production: number;
}

const initialCards: MiningCard[] = [
  { id: 1, name: "Minero Novato", levels: [10, 15, 25], prices: [1000, 2000, 4000], currentLevel: 0, production: 0 },
  { id: 2, name: "Minero Avanzado", levels: [30, 35, 45], prices: [5000, 7000, 10000], currentLevel: 0, production: 0 },
  { id: 3, name: "Minero Experto", levels: [50, 55, 65], prices: [12000, 15000, 20000], currentLevel: 0, production: 0 },
  { id: 4, name: "Minero Maestro", levels: [70, 75, 100], prices: [22000, 25000, 30000], currentLevel: 0, production: 0 },
];

const MiningScene: React.FC<MiningSceneProps> = ({ coins, setCoins, miningRate, setMiningRate, resetGameState }) => {
  const [cards, setCards] = useState<MiningCard[]>(() => {
    const savedCards = localStorage.getItem('miningCards');
    return savedCards ? JSON.parse(savedCards) : initialCards;
  });
  const [lastUpgradeTime, setLastUpgradeTime] = useState(Date.now());

  useEffect(() => {
    localStorage.setItem('miningCards', JSON.stringify(cards));
    const totalProduction = cards.reduce((total, card) => total + card.production, 0);
    setMiningRate(totalProduction / 3600); // Convertir producción por hora a por segundo
  }, [cards, setMiningRate]);

  const handleUpgrade = (cardId: number) => {
    const now = Date.now();
    if (now - lastUpgradeTime < 5000) {
      alert("Por favor, espera 5 segundos entre mejoras.");
      return;
    }

    setCards(prevCards => prevCards.map(card => {
      if (card.id === cardId && card.currentLevel < 3) {
        const nextLevel = card.currentLevel + 1;
        const upgradeCost = card.prices[card.currentLevel];
        if (coins >= upgradeCost) {
          setCoins(prevCoins => prevCoins - upgradeCost);
          const newProduction = card.levels[card.currentLevel];
          setLastUpgradeTime(now);
          return { 
            ...card, 
            currentLevel: nextLevel, 
            production: card.production + newProduction 
          };
        }
      }
      return card;
    }));
  };

  const resetCache = () => {
    resetGameState();
    setCards(initialCards);
    setMiningRate(0);
  };

  const usdtAmount = (coins / 100).toFixed(2); // 100 puntos = 1$ USDT

  return (
    <div className="w-full max-w-md">
      <div className="bg-transparent rounded-lg p-4 w-full mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-8 h-8 mr-2" />
            <span className="text-3xl font-bold text-white">{coins.toFixed(2)}</span>
            <div className="flex items-center ml-2">
              <img src="https://i.ibb.co/fCJCdsy/pngwing-com-34.png" alt="USDT" className="w-4 h-4 mr-1" />
              <span className="text-sm text-white">    {usdtAmount}</span>
            </div>
          </div>
          <button
            onClick={resetCache}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded flex items-center"
          >
            <RefreshCw className="mr-1" size={14} />
            Reiniciar
          </button>
        </div>
        <p className="text-sm text-white flex items-center">
          <Pickaxe size={14} className="text-yellow-500 mr-1" />
          <span>Tasa de minería: {Math.floor(miningRate * 3600)} /hora</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {cards.map(card => (
          <div key={card.id} className="bg-white rounded-lg p-2">
            <h3 className="text-sm font-bold text-black mb-1">{card.name}</h3>
            <p className="text-xs text-black mb-1">
              Nivel: {card.currentLevel} / 3
            </p>
            <p className="text-xs text-black mb-1">
              Producción: {card.production} /hora
            </p>
            {card.currentLevel < 3 && (
              <>
                <p className="text-xs text-black mb-1">
                  Mejora: +{card.levels[card.currentLevel]} /hora
                </p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleUpgrade(card.id)}
                  disabled={coins < card.prices[card.currentLevel]}
                >
                  {coins < card.prices[card.currentLevel] ? 'Insuficiente' : `Comprar (${card.prices[card.currentLevel]})`}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiningScene;