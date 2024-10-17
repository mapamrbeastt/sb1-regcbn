import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface DailyRewardsPopupProps {
  onClose: () => void;
  onClaim: (amount: number) => void;
}

const DailyRewardsPopup: React.FC<DailyRewardsPopupProps> = ({ onClose, onClaim }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [claimedDays, setClaimedDays] = useState<number[]>([]);
  const [nextClaimTime, setNextClaimTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const rewards = [100, 200, 300, 500, 700, 1000, 1500, 2000, 3000];

  useEffect(() => {
    const storedData = localStorage.getItem('dailyRewardsData');
    if (storedData) {
      const { currentDay, claimedDays, nextClaimTime } = JSON.parse(storedData);
      setCurrentDay(currentDay);
      setClaimedDays(claimedDays);
      setNextClaimTime(nextClaimTime);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextClaimTime) {
        const now = Date.now();
        const diff = nextClaimTime - now;
        if (diff <= 0) {
          setNextClaimTime(null);
          setTimeLeft('');
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextClaimTime]);

  const handleClaim = (day: number) => {
    if (day === currentDay && !claimedDays.includes(day) && !nextClaimTime) {
      onClaim(rewards[day - 1]);
      const newClaimedDays = [...claimedDays, day];
      setClaimedDays(newClaimedDays);
      const newNextClaimTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
      setNextClaimTime(newNextClaimTime);
      
      if (day === 9) {
        setCurrentDay(1);
        setClaimedDays([]);
      } else {
        setCurrentDay(prev => prev + 1);
      }

      localStorage.setItem('dailyRewardsData', JSON.stringify({
        currentDay: day === 9 ? 1 : day + 1,
        claimedDays: day === 9 ? [] : newClaimedDays,
        nextClaimTime: newNextClaimTime,
      }));
    }
  };

  const getUsdtValue = (coins: number) => {
    return (coins / 100).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recompensas Diarias</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        {timeLeft && (
          <div className="text-center mb-4 p-2 bg-blue-100 rounded-lg">
            <p className="font-bold">Próxima recompensa en:</p>
            <p className="text-xl">{timeLeft}</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {rewards.map((reward, index) => (
            <button
              key={index}
              onClick={() => handleClaim(index + 1)}
              className={`p-4 rounded-lg ${
                index + 1 === currentDay && !nextClaimTime
                  ? 'bg-yellow-500 text-white'
                  : index + 1 < currentDay || nextClaimTime
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-gray-100 text-gray-400'
              } ${(index + 1 > currentDay || nextClaimTime) ? 'cursor-not-allowed' : 'hover:bg-yellow-600'} relative`}
              disabled={index + 1 > currentDay || !!nextClaimTime}
            >
              <div className="font-bold">Día {index + 1}</div>
              <div className="flex items-center justify-center">
                <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Crypto" className="w-5 h-5 mr-1" />
                <span>{reward}</span>
              </div>
              <div className="text-xs flex items-center justify-center mt-1">
                <img src="https://i.ibb.co/fCJCdsy/pngwing-com-34.png" alt="USDT" className="w-4 h-4 mr-1" />
                <span>{getUsdtValue(reward)} </span>
              </div>
              {claimedDays.includes(index + 1) && (
                <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
                  <Check size={12} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyRewardsPopup;