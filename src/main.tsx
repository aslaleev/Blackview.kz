import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SiteContentProvider } from './content/siteContent';
import './styles/theme.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
  </React.StrictMode>,
);
