import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Auth0Provider } from "@auth0/auth0-react";

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={'https://dev-x98dzbui.us.auth0.com'}
        clientId={'mH911eWXFxL1Y2tZ1dxXf8FCi34wie2v'}
        redirectUri={'http://localhost:4200/'}
      >
        <App />
      </Auth0Provider>  
    </BrowserRouter>
  </StrictMode>
);
