import React from 'react';
import { X, RefreshCw, MousePointer, Plus, Percent } from 'lucide-react';

interface WalletPopupProps {
  onClose: () => void;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  addExtraClicks: () => void;
  extraClicks: number;
}

const WalletPopup: React.FC<WalletPopupProps> = ({ onClose, coins, setCoins, addExtraClicks, extraClicks }) => {
  const handleExtraClicksPurchase = () => {
    if (coins >= 4000 && extraClicks === 0) {
      setCoins(prevCoins => prevCoins - 4000);
      addExtraClicks();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Potenciadores</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Gratis</h3>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <RefreshCw size={20} className="mr-2" />
              <span>Recarga 7 clicks, cada 24 hs</span>
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">23:03:40 restantes</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">De pago</h3>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center mt-2">
              <Percent size={20} className="mr-2" />
              <span>Multiplicar por 1.2 tus ganancias x click y minería</span>
            </button>
            <button 
              className={`w-full mt-2 ${
                coins >= 4000 && extraClicks === 0
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white font-bold py-2 px-4 rounded flex items-center justify-center`}
              onClick={handleExtraClicksPurchase}
              disabled={coins < 4000 || extraClicks > 0}
            >
              <MousePointer size={20} className="mr-2" />
              <Plus size={14} className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <img src="https://i.ibb.co/Q9NNLK5/tu-ruta-moneda-amarilla.png" alt="Coin" className="w-5 h-5 mr-2" />
              <span>Obtén 3 clicks extras (4000 monedas)</span>
            </button>
            {extraClicks > 0 && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Ya has comprado clicks extras ({extraClicks} restantes)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;