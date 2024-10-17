import React from 'react';
import { X } from 'lucide-react';

interface ParticipationPopupProps {
  onClose: () => void;
}

const ParticipationPopup: React.FC<ParticipationPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Participa por $1.000.000</h2>
        <p>
          Aquí puedes agregar más información sobre cómo participar en el sorteo 
          de $1.000.000. Incluye detalles sobre los requisitos, fechas importantes, 
          y cualquier otra información relevante.
        </p>
      </div>
    </div>
  );
};

export default ParticipationPopup;