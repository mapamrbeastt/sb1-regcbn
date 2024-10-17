import React, { useState, useEffect } from 'react';
import { Settings, Info } from 'lucide-react';
import Config from './components/Config';
import Navbar from './components/Navbar';
import MiningScene from './components/MiningScene';
import TasksScene from './components/TasksScene';
import TokenInfoScene from './components/TokenInfoScene';
import FriendsScene from './components/FriendsScene';
import HomeScene from './components/HomeScene';
import ErrorBoundary from './components/ErrorBoundary';
import LevelUpPopup from './components/LevelUpPopup';
import LoadingScreen from './components/LoadingScreen';
import AuthScene from './components/AuthScene';
import { fetchUserData, updateUserData } from './api/userApi';

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    moneda_principal: 0,
    monedas_minadas: 0,
    cantidad_referidos: 0,
    usdt: 0,
    potenciador_activo: false,
    carta_activa: '',
    clicks: 0,
    miningRate: 1,
    currentLevel: 1,
    levelProgress: 0,
  });
  const [currentScene, setCurrentScene] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const [color, setColor] = useState('#81d4fa');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppDisabled, setIsAppDisabled] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      loadUserData(storedUserId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserData = async (id: string) => {
    try {
      const fetchedUserData = await fetchUserData(id);
      setUserData(fetchedUserData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (newUserId: string) => {
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
    loadUserData(newUserId);
  };

  const updateUser = async (updatedData: Partial<typeof userData>) => {
    if (userId) {
      try {
        await updateUserData(userId, updatedData);
        setUserData(prevData => ({ ...prevData, ...updatedData }));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!userId) {
    return <AuthScene onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <ErrorBoundary>
      <div className="app-container" style={{ backgroundColor: color }}>
        <div className="content-area">
          {currentScene === 'home' && (
            <HomeScene
              userData={userData}
              setUserData={setUserData}
              setCurrentScene={setCurrentScene}
              backgroundColor={color}
            />
          )}
          {currentScene === 'mining' && (
            <MiningScene
              coins={userData.moneda_principal}
              setCoins={(newCoins) => updateUser({ moneda_principal: newCoins })}
              miningRate={userData.miningRate}
              setMiningRate={(newRate) => updateUser({ miningRate: newRate })}
              resetGameState={() => {
                // Implement reset game state logic
              }}
            />
          )}
          {currentScene === 'tasks' && (
            <TasksScene
              coins={userData.moneda_principal}
              setCoins={(newCoins) => updateUser({ moneda_principal: newCoins })}
            />
          )}
          {currentScene === 'friends' && (
            <FriendsScene
              coins={userData.moneda_principal}
              setCoins={(newCoins) => updateUser({ moneda_principal: newCoins })}
            />
          )}
          {currentScene === 'tokenInfo' && (
            <TokenInfoScene setCurrentScene={setCurrentScene} />
          )}
        </div>
        {showNavbar && (
          <Navbar setCurrentScene={setCurrentScene} currentScene={currentScene} />
        )}
        {showLevelUp && (
          <LevelUpPopup
            level={userData.currentLevel}
            skinUrl={`https://example.com/skins/level${userData.currentLevel}.png`}
            onClose={() => setShowLevelUp(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;