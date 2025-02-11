import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/Header.tsx'

import WebSocketProvider from './components/WebSocketProvider.tsx'

const WS_URL = import.meta.env.VITE_WS_URL as string

createRoot(document.getElementById('root')!).render(
    <WebSocketProvider url={WS_URL}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
)
