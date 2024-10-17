import React from 'react';
import { X } from 'lucide-react';

interface BoostersPopupProps {
  onClose: () => void;
}

const BoostersPopup: React.FC<BoostersPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Potenciadores</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p>Lista de potenciadores disponibles aquí...</p>
      </div>
    </div>
  );
};

export default BoostersPopup;