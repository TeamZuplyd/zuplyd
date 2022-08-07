import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import App from './app/app';
import Home from './app/pages/home/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);
