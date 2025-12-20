import React from 'react';
import { PlayCircle, Bug, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type ExecutionTabId = 'run' | 'debug' | 'history';

interface ExecutionTabsProps {
    activeTab: ExecutionTabId;
    onChange: (tab: ExecutionTabId) => void;
}

export const ExecutionTabs: React.FC<ExecutionTabsProps> = ({ activeTab, onChange }) => {
    const { t } = useTranslation();
    const tabs = [
        { id: 'run', label: t('execution.tabs.run'), icon: PlayCircle },
        { id: 'debug', label: t('execution.tabs.debug'), icon: Bug },
        { id: 'history', label: t('execution.tabs.history'), icon: History },
    ] as const;

    return (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg mx-6 my-4">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                            flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all
                            ${isActive
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                            }
                        `}
                    >
                        <Icon size={14} className={isActive ? 'text-indigo-500' : ''} />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
