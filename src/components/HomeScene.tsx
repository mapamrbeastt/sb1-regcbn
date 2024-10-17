import React, { useState } from 'react';
import Character from './Character';
import { Wallet, Zap, Gift, Pickaxe } from 'lucide-react';
import WalletPopup from './WalletPopup';
import BoostersPopup from './BoostersPopup';
import RewardsPopup from './RewardsPopup';

interface HomeSceneProps {
  userData: {
    moneda_principal: number;
    monedas_minadas: number;
    cantidad_referidos: number;
    usdt: number;
    potenciador_activo: boolean;
    carta_activa: string;
    clicks: number;
    miningRate: number;
    currentLevel: number;
    levelProgress: number;
  };
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  setCurrentScene: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor: string;
}

const HomeScene: React.FC<HomeSceneProps> = ({
  userData,
  setUserData,
  setCurrentScene,
  backgroundColor,
}) => {
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [showBoostersPopup, setShowBoostersPopup] = useState(false);
  const [showRewardsPopup, setShowRewardsPopup] = useState(false);

  const addCoins = (amount: number) => {
    setUserData(prevData => ({
      ...prevData,
      moneda_principal: prevData.moneda_principal + amount,
      monedas_minadas: prevData.monedas_minadas + amount
    }));
  };

  const usdtAmount = (userData.moneda_principal / 100).toFixed(2); // 100 puntos = 1$ USDT

   return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="absolute top-5 left-2 right-2 flex justify-between items-center bg-white bg-opacity-80 rounded-lg p-2" style={{ top: 'calc(1rem - -20px)' }}>
        <div className="flex items-center">
          <img src="https://i.ibb.co/fCJCdsy/pngwing-com-34.png" alt="USDT" className="w-4 h-4 mr-1" />
          <span className="text-sm">{usdtAmount} USDT</span>
        </div>
        <div className="flex items-center">
          <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-6 h-6 mr-2" />
          <span className="text-xl font-bold">{userData.moneda_principal.toFixed(2)}</span>
        </div>
        <div className="flex items-center text-sm">
          <Pickaxe size={16} className="mr-1" />
          <span className="font-bold">{(userData.miningRate * 3600).toFixed(2)}</span>/hora
        </div>
      </div>
      
      <div className="relative" style={{ marginTop: '-1.5cm' }}>
        <Character 
          addCoins={addCoins} 
          userData={userData}
          setUserData={setUserData}
        />
        
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 flex flex-col space-y-4">
          <button 
            onClick={() => setShowWalletPopup(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            <Wallet size={24} />
          </button>
          <button 
            onClick={() => setShowBoostersPopup(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            <Zap size={24} />
          </button>
          <button 
            onClick={() => setShowRewardsPopup(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            <Gift size={24} />
          </button>
        </div>
      </div>
      
      {showWalletPopup && (
        <WalletPopup 
          onClose={() => setShowWalletPopup(false)} 
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {showBoostersPopup && (
        <BoostersPopup onClose={() => setShowBoostersPopup(false)} />
      )}
      {showRewardsPopup && (
        <RewardsPopup onClose={() => setShowRewardsPopup(false)} />
      )}
    </div>
  );
};

export default HomeScene;