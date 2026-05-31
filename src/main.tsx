import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ReducedEffectsProvider } from './hooks/useReducedEffects';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReducedEffectsProvider>
        <App />
      </ReducedEffectsProvider>
    </BrowserRouter>
  </StrictMode>,
);
