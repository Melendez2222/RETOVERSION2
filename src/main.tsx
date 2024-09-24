import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { AuthProvider } from './auth/AuthProv.tsx'
import store from './Redux/store/Store.tsx'
import { Provider as ReduxProvider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ReduxProvider store={store}>
      <AuthProvider >
        <App />
      </AuthProvider>
    </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
)
