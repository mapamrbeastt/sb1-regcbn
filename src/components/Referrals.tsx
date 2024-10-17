import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface ReferralsProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const Referrals: React.FC<ReferralsProps> = ({ coins, setCoins }) => {
  const [referrals, setReferrals] = useState(0);

  const addReferral = () => {
    const cost = (referrals + 1) * 50;
    if (coins >= cost) {
      setCoins(prevCoins => prevCoins - cost);
      setReferrals(prevReferrals => prevReferrals + 1);
    }
  };

  return (
    <div className="bg-red-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Referidos</h2>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
        onClick={addReferral}
        disabled={coins < (referrals + 1) * 50}
      >
        <Users className="mr-2" /> Añadir Referido
      </button>
      <p className="mt-2 text-sm">Referidos: {referrals}</p>
      <p className="text-sm">Costo: {(referrals + 1) * 50} monedas</p>
    </div>
  );
};

export default Referrals;