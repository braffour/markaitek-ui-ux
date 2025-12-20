import React from 'react';
import { useTranslation } from 'react-i18next';

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'failed' | 'warning';

interface StatusPillProps {
    status: ExecutionStatus;
    className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, className = '' }) => {
    const { t } = useTranslation();
    const styles = {
        idle: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        running: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800',
        success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800',
        failed: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-100 dark:border-rose-800',
        warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-100 dark:border-amber-800',
    };

    const labels = {
        idle: t('execution.status.idle'),
        running: t('execution.status.running'),
        success: t('execution.status.success'),
        failed: t('execution.status.failed'),
        warning: t('execution.status.warning'),
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]} ${className}`}>
            {status === 'running' && (
                <span className="mr-1.5 flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                </span>
            )}
            {labels[status]}
        </span>
    );
};
