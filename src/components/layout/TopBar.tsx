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
        <header className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                {/* Left: Logo & Brand */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Markaitek Logo" className="w-8 h-8 rounded-lg shadow-sm" />
                    <span className="font-semibold text-slate-900 dark:text-white tracking-tight">Markaitek Agentic Composer</span>
                </div>

                {/* Center: Navigation Tabs */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="flex items-center p-1 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur rounded-lg border border-black/5 dark:border-white/5">
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
                                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
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
                    <div className="flex items-center p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-black/5 dark:border-white/5">
                        <button
                            onClick={() => setTheme('light')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Sun size={14} />
                        </button>
                        <button
                            onClick={() => setTheme('system')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Monitor size={14} />
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Moon size={14} />
                        </button>
                    </div>

                    {/* User Profile */}
                    <button className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 ml-2">
                        <User size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
