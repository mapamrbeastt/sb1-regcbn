import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

interface BonusesProps {
  onBonus: () => void;
}

const Bonuses: React.FC<BonusesProps> = ({ onBonus }) => {
  const [nextBonus, setNextBonus] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextBonus(prevBonus => {
        if (prevBonus === 0) {
          onBonus();
          return 60;
        }
        return prevBonus - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onBonus]);

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Bonificaciones</h2>
      <div className="flex items-center justify-center">
        <Gift className="mr-2 text-blue-600" />
        <p className="text-sm">Próximo bono en: {nextBonus}s</p>
      </div>
    </div>
  );
};

export default Bonuses;