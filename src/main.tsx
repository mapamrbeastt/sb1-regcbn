import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Manejador de errores global
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && event.error.message.includes("Failed to execute 'insertBefore' on 'Node'")) {
    console.warn("Se produjo un error al manipular el DOM. Por favor, intenta de nuevo.");
    event.preventDefault(); // Previene que el error detenga la aplicación
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)