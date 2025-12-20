import React from 'react';

interface DividerProps {
    children?: React.ReactNode;
    className?: string;
}

export const Divider: React.FC<DividerProps> = ({ children, className = '' }) => {
    return (
        <div className={`relative flex items-center py-4 ${className}`}>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            {children && (
                <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                    {children}
                </span>
            )}
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>
    );
};
