import React from 'react';

interface AuthCardProps {
    children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
    return (
        <div className="w-full max-w-md mx-auto relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-accent/5 blur-[120px] rounded-full -z-10 animate-pulse-soft"></div>

            <div className="bg-brand-surface-1/80 backdrop-blur-2xl border border-brand-border-high shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] rounded-[32px] p-8 md:p-12 relative overflow-hidden">
                {/* Subtle Grain/Noise or Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
