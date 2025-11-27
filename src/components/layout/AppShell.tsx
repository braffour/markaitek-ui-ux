import React from 'react';
import TopBar from './TopBar';

interface AppShellProps {
    children: React.ReactNode;
    currentView: 'agent' | 'workflow' | 'insights';
    onViewChange: (view: 'agent' | 'workflow' | 'insights') => void;
}

const AppShell: React.FC<AppShellProps> = ({ children, currentView, onViewChange }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans">
            <TopBar currentView={currentView} onViewChange={onViewChange} />
            <main className="flex-1 relative overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
};

export default AppShell;
