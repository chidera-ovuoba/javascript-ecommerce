import React from'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProvider from './lib/context';
import {  BrowserRouter as  Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
      <App />
      </Router>
     </AppProvider>
  </React.StrictMode>
);