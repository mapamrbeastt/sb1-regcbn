import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-blue-500 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
        <p className="mt-4 text-white text-xl font-bold">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;