import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from 'thirdweb/react'

import { StateContextProvider } from './context';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider>
    <Router>
      <ThemeProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </ThemeProvider>
    </Router>
  </ThirdwebProvider>
);
