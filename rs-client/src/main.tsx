import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'

import WebSocketProvider from './components/WebSocketProvider.tsx'
import Layout from './components/Layout.tsx'

const WS_URL = import.meta.env.VITE_WS_URL as string

createRoot(document.getElementById('root')!).render(
    <WebSocketProvider url={WS_URL}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
)
