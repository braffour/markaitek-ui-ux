import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Monitor, User } from 'lucide-react';
import logo from '../../assets/logo.png';

interface TopBarProps {
    currentView: 'agent' | 'workflow' | 'insights';
    onViewChange: (view: 'agent' | 'workflow' | 'insights') => void;
}

const TopBar: React.FC<TopBarProps> = ({ currentView, onViewChange }) => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-dark/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                {/* Left: Logo & Brand */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Markaitek Logo" className="w-8 h-8 rounded-lg shadow-sm" />
                    <span className="font-semibold text-white tracking-tight">Markaitek Agentic Composer</span>
                </div>

                {/* Center: Navigation Tabs */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="flex items-center p-1 bg-brand-surface/80 backdrop-blur rounded-full border border-brand-border">
                        {[
                            { id: 'agent', label: 'Agent' },
                            { id: 'workflow', label: 'Workflow' },
                            { id: 'insights', label: 'Insights' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onViewChange(tab.id as any)}
                                className={`
                  px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                  ${currentView === tab.id
                                        ? 'bg-brand-blue text-white shadow-glow-blue'
                                        : 'text-slate-400 hover:text-white'
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <div className="flex items-center p-1 bg-brand-surface/50 rounded-full border border-brand-border">
                        <button
                            onClick={() => setTheme('light')}
                            className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'bg-brand-surface text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Sun size={14} />
                        </button>
                        <button
                            onClick={() => setTheme('system')}
                            className={`p-1.5 rounded-full transition-colors ${theme === 'system' ? 'bg-brand-surface text-brand-blue' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Monitor size={14} />
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'bg-brand-surface text-brand-blue' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Moon size={14} />
                        </button>
                    </div>

                    {/* User Profile */}
                    <button className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-brand-blue border border-brand-border ml-2 hover:shadow-glow-blue transition-shadow">
                        <User size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
