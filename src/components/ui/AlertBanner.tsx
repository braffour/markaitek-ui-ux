import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface AlertBannerProps {
    type?: 'info' | 'warning' | 'error' | 'success';
    title?: string;
    message: string;
    className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
    type = 'info',
    title,
    message,
    className = ''
}) => {
    const icons = {
        info: Info,
        warning: AlertTriangle,
        error: AlertCircle,
        success: CheckCircle2
    };

    const styles = {
        info: 'bg-blue-50/50 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/20 text-blue-900 dark:text-blue-400',
        warning: 'bg-amber-50/50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20 text-amber-900 dark:text-amber-400',
        error: 'bg-red-50/50 dark:bg-red-500/10 border-red-200/50 dark:border-red-500/20 text-red-900 dark:text-red-400',
        success: 'bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400'
    };

    const Icon = icons[type];

    return (
        <div className={`flex gap-3 p-4 rounded-2xl border ${styles[type]} ${className}`}>
            <Icon className="shrink-0 mt-0.5" size={18} />
            <div className="flex flex-col gap-0.5">
                {title && <h5 className="text-sm font-bold">{title}</h5>}
                <p className="text-[13px] font-medium opacity-90 leading-snug">{message}</p>
            </div>
        </div>
    );
};
