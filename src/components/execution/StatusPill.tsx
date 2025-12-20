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
        idle: 'bg-brand-surface-2 text-brand-text-muted border-brand-border-low',
        running: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20 shadow-[0_0_15px_-3px_rgba(45,212,191,0.1)]',
        success: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
        failed: 'bg-red-400/10 text-red-400 border-red-400/20',
        warning: 'bg-brand-warning/10 text-brand-warning border-brand-warning/20',
    };

    const labels = {
        idle: t('execution.status.idle'),
        running: t('execution.status.running'),
        success: t('execution.status.success'),
        failed: t('execution.status.failed'),
        warning: t('execution.status.warning'),
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] border ${styles[status]} ${className}`}>
            {status === 'running' && (
                <span className="mr-2 flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent shadow-[0_0_8px_rgba(45,212,191,0.5)]"></span>
                </span>
            )}
            {labels[status]}
        </span>
    );
};
