import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TokenInfoSceneProps {
  setCurrentScene: React.Dispatch<React.SetStateAction<string>>;
}

const TokenInfoScene: React.FC<TokenInfoSceneProps> = ({ setCurrentScene }) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 w-full mb-4">
        <h2 className="text-2xl font-bold text-black mb-4">Acerca del Token</h2>
        <p className="text-black mb-4">
          Aquí irá la información sobre el token. Esta sección está en desarrollo.
        </p>
        <button
          onClick={() => setCurrentScene('home')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <ArrowLeft className="mr-2" />
          Volver
        </button>
      </div>
    </div>
  );
};

export default TokenInfoScene;