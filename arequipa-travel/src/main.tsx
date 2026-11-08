import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './components/charts/setup';
import { ColorModeProvider } from './context/ColorMode';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ColorModeProvider>
  </React.StrictMode>,
);
