import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ConfigProps {
  onClose: () => void;
}

const Config: React.FC<ConfigProps> = ({ onClose }) => {
  const [language, setLanguage] = useState('es');
  const [usdtAddress, setUsdtAddress] = useState('');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleUsdtAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdtAddress(e.target.value);
  };

  const handleSave = () => {
    // Here you would typically save these settings to your state or local storage
    console.log('Saving settings:', { language, usdtAddress });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Configuración</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Idioma
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="usdtAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección USDT BEP20
          </label>
          <input
            type="text"
            id="usdtAddress"
            value={usdtAddress}
            onChange={handleUsdtAddressChange}
            placeholder="Ingrese su dirección USDT BEP20"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default Config;