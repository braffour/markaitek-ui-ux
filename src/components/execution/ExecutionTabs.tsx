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
        <div className="flex p-1.5 bg-brand-surface-2/60 backdrop-blur-md rounded-2xl mx-6 my-6 border border-brand-border-low">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                            flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-300
                            ${isActive
                                ? 'bg-brand-surface-1 text-brand-accent shadow-xl shadow-black/30 border border-brand-border-base'
                                : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-white/5'
                            }
                        `}
                    >
                        <Icon size={14} className={isActive ? 'text-brand-accent' : 'text-brand-text-muted'} />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
