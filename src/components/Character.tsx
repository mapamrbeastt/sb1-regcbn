import React, { useState, useEffect } from 'react';
import ClickLimitPopup from './ClickLimitPopup';

interface CharacterProps {
  addCoins: (amount: number) => void;
  coins: number;
  miningRate: number;
  level: number;
  progress: number;
  extraClicks: number;
  setExtraClicks: React.Dispatch<React.SetStateAction<number>>;
}

const Character: React.FC<CharacterProps> = ({ 
  addCoins, 
  coins, 
  miningRate, 
  level, 
  progress, 
  extraClicks, 
  setExtraClicks 
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const maxClicks = 7;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canClick) {
      timer = setInterval(() => {
        setCooldownTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setCanClick(true);
            setClickCount(0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canClick]);

  const handleClick = () => {
    if (canClick && clickCount < maxClicks) {
      addCoins(100);
      setClickCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount >= maxClicks) {
          setCanClick(false);
          setShowPopup(true);
          setCooldownTime(3);
        }
        return newCount;
      });
    }
  };

  const getCharacterImage = () => {
    if (level >= 5) return "https://i.ibb.co/McqsQVc/lv5.png";
    if (level >= 4) return "https://i.ibb.co/PjcChMq/lv4.png";
    if (level >= 3) return "https://i.ibb.co/j52pYWw/lv3.png";
    if (level >= 2) return "https://i.ibb.co/L6WD8md/lv2.png";
    return "https://i.ibb.co/zs4W2SP/lv1.png";
  };

  return (
    <div className="flex items-center justify-center h-full relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        <div className="text-sm font-bold text-white mb-2">Nivel {level}</div>
        <div className="w-2 h-24 bg-gray-200 rounded-full relative">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-full" 
            style={{ height: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div 
          className="w-64 h-64 relative cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={getCharacterImage()}
            alt="Character"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-2 text-sm text-white">
          {clickCount}/{maxClicks} clicks
        </div>
        {!canClick && (
          <div className="mt-1 text-xs text-yellow-300">
            Próximo click en {cooldownTime}s
          </div>
        )}
      </div>
      {showPopup && <ClickLimitPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Character;