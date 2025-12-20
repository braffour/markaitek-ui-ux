import React from 'react';

interface DividerProps {
    children?: React.ReactNode;
    className?: string;
}

export const Divider: React.FC<DividerProps> = ({ children, className = '' }) => {
    return (
        <div className={`relative flex items-center py-4 ${className}`}>
            <div className="flex-grow border-t border-brand-border-base opacity-40"></div>
            {children && (
                <span className="flex-shrink mx-6 text-[10px] font-extrabold uppercase tracking-[0.3em] text-brand-text-muted opacity-60">
                    {children}
                </span>
            )}
            <div className="flex-grow border-t border-brand-border-base opacity-40"></div>
        </div>
    );
};
