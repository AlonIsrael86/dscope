import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Alternative scroll-driven Δ prism hero — standalone page mounted at /scroll-hero.
// Lazy-loaded so it has zero impact on the main App bundle.
const PrismHeroPage = lazy(() => import('./scroll-hero/PrismHeroPage'));

const isScrollHero =
  typeof window !== 'undefined' && window.location.pathname.startsWith('/scroll-hero');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isScrollHero ? (
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: '#020617',
              color: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'monospace',
              letterSpacing: '0.3em',
              fontSize: 11,
              textTransform: 'uppercase',
            }}
          >
            loading prism
          </div>
        }
      >
        <PrismHeroPage />
      </Suspense>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
);
