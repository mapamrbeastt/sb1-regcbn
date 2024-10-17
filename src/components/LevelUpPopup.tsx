import React, { useState, useEffect } from 'react';

interface LevelUpPopupProps {
  level: number;
  skinUrl: string;
  onClose: () => void;
}

const LevelUpPopup: React.FC<LevelUpPopupProps> = ({ level, skinUrl, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApply = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Esperar a que termine la animación antes de cerrar
  };

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 1: return '#a3e1ff'; // 1000 monedas
      case 2: return '#48caff'; // 5000 monedas
      case 3: return '#6cd96f'; // 10000 monedas
      case 4: return '#f3e064'; // 30000 monedas
      case 5: return '#b139ff'; // 100000 monedas
      default: return '#a3e1ff';
    }
  };

  const backgroundColor = getLevelColor(level);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className={`rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`} style={{ backgroundColor }}>
        <div className="relative h-64" style={{ background: `linear-gradient(to bottom, ${backgroundColor}, ${adjustBrightness(backgroundColor, -30)})` }}>
          <img src={skinUrl} alt={`Nivel ${level} skin`} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 object-contain" />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Nuevo nivel alcanzado!
          </h2>
          <p className="text-lg text-white mb-4">
            Has llegado al nivel {level}
          </p>
          <p className="text-sm text-white mb-6">
            Cada vez vas haciendo más dinero. ¡Sigue así!
          </p>
          <button
            onClick={handleApply}
            className="bg-white text-black font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

// Función para ajustar el brillo del color de fondo
function adjustBrightness(color: string, amount: number) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

export default LevelUpPopup;