import React from 'react';
import { X } from 'lucide-react';

interface ClickLimitPopupProps {
  onClose: () => void;
}

const ClickLimitPopup: React.FC<ClickLimitPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Límite de clicks alcanzado</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-lg mb-4">
          Has alcanzado el límite de 7 clicks. Espera 3 segundos para seguir ganando monedas.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default ClickLimitPopup;