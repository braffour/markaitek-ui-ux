import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactFlowProvider } from '@xyflow/react'
import AppShell from './components/layout/AppShell'
import { AuthShell } from './components/auth/AuthShell'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider defaultTheme="system" storageKey="markaitek-theme">
      {isAuthenticated ? (
        <ReactFlowProvider>
          <AppShell />
        </ReactFlowProvider>
      ) : (
        <AuthShell onAuthenticated={() => setIsAuthenticated(true)} />
      )}
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
