import React from 'react';
import TopBar from './TopBar';

interface AppShellProps {
    children: React.ReactNode;
    currentView: 'agent' | 'workflow' | 'insights';
    onViewChange: (view: 'agent' | 'workflow' | 'insights') => void;
}

const AppShell: React.FC<AppShellProps> = ({ children, currentView, onViewChange }) => {
    return (
        <div className="min-h-screen bg-brand-dark text-white transition-colors duration-300 flex flex-col font-sans">
            <TopBar currentView={currentView} onViewChange={onViewChange} />
            <main className="flex-1 relative overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
};

export default AppShell;
