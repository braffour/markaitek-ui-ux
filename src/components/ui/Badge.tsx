import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    type?: 'neutral' | 'success' | 'warning' | 'purple';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, type = 'neutral', className = '' }) => {
    const colors = {
        neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        success: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30',
        warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/30',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/30',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[type]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
