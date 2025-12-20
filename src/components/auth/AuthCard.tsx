import React from 'react';

interface AuthCardProps {
    children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
    return (
        <div className="w-full max-w-md mx-auto relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-accent/5 blur-[120px] rounded-full -z-10 animate-pulse-soft"></div>

            <div className="bg-brand-surface-1/60 backdrop-blur-xl border border-brand-border-base shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] rounded-2xl p-8 md:p-12">
                {children}
            </div>
        </div>
    );
};
