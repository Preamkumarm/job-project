import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import StoreContext from './context/ArrContext';
import { ClerkProvider } from '@clerk/clerk-react';

// Use process.env to access the environment variable in Create React App
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter>
      <StoreContext>
        <App />
      </StoreContext>
    </BrowserRouter>
  </ClerkProvider>
);
