import './index.css'
import React from 'react'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);