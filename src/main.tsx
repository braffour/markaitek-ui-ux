import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactFlowProvider } from '@xyflow/react'
import AppShell from './components/layout/AppShell'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="markaitek-theme">
      <ReactFlowProvider>
        <AppShell />
      </ReactFlowProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
