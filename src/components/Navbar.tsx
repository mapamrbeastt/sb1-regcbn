import React, { useState } from 'react';
import { Home, Pickaxe, Users, ClipboardList } from 'lucide-react';
import ParticipationPopup from './ParticipationPopup';

interface NavbarProps {
  setCurrentScene: React.Dispatch<React.SetStateAction<string>>;
  currentScene: string;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentScene, currentScene }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getButtonClass = (scene: string) => {
    const baseClass = "flex flex-col items-center p-2 rounded-lg transition-colors duration-200";
    return currentScene === scene
      ? `${baseClass} text-pink-500`
      : `${baseClass} text-gray-600`;
  };

  const getIconColor = (scene: string) => {
    return currentScene === scene ? "#ec4899" : "#4b5563";
  };

  return (
    <>
      <nav className="fixed left-0 right-0 bg-white bg-opacity-80 rounded-t-lg shadow-lg" style={{ bottom: 'calc(1cm + 0.12cm)' }}>
        {currentScene === 'home' && (
          <button 
            onClick={() => setShowPopup(true)}
            className="absolute left-1/2 transform -translate-x-1/2 -top-7 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-base font-bold transition-all duration-200 ease-in-out whitespace-nowrap"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            Participa por $1.000.000
          </button>
        )}
        <ul className="flex justify-around py-2 mt-4">
          <li>
            <button className={getButtonClass('home')} onClick={() => setCurrentScene('home')}>
              <Home size={24} color={getIconColor('home')} />
              <span className="text-xs mt-1">Inicio</span>
            </button>
          </li>
          <li>
            <button className={getButtonClass('mining')} onClick={() => setCurrentScene('mining')}>
              <Pickaxe size={24} color={getIconColor('mining')} />
              <span className="text-xs mt-1">Minería</span>
            </button>
          </li>
          <li>
            <button className={getButtonClass('tasks')} onClick={() => setCurrentScene('tasks')}>
              <ClipboardList size={24} color={getIconColor('tasks')} />
              <span className="text-xs mt-1">Tareas</span>
            </button>
          </li>
          <li>
            <button className={getButtonClass('friends')} onClick={() => setCurrentScene('friends')}>
              <Users size={24} color={getIconColor('friends')} />
              <span className="text-xs mt-1">Amigos</span>
            </button>
          </li>
        </ul>
      </nav>
      {showPopup && <ParticipationPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Navbar;