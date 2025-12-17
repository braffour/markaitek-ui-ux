import React from 'react';

type BadgeType = 'neutral' | 'success' | 'warning' | 'purple';

interface BadgeProps {
    children: React.ReactNode;
    type?: BadgeType;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'neutral', className = '' }) => {
    const colors = {
        neutral: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
        warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
        purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[type]} ${className}`}>
            {children}
        </span>
    );
};
