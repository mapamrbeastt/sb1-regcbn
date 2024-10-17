import React from 'react';
import { X } from 'lucide-react';

interface AboutProps {
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Acerca de Hamster Minería</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <p className="mb-4">
          Hamster Minería es un juego incremental inspirado en Hamster Kombat y MrBeast. En este juego, tu objetivo es acumular la mayor cantidad de monedas posible mediante la minería, referidos, bonificaciones y potenciadores.
        </p>
        <p className="mb-4">
          Características principales:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Sistema de minería con mejoras</li>
          <li>Referidos para aumentar tus ganancias</li>
          <li>Bonificaciones periódicas</li>
          <li>Potenciadores temporales</li>
          <li>¡Haz clic en el hámster para ganar 100 monedas instantáneas!</li>
        </ul>
        <p>
          ¡Disfruta jugando y conviértete en el hamster minero más rico!
        </p>
      </div>
    </div>
  );
};

export default About;