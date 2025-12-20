import React from 'react';

interface AuthCardProps {
    children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
    return (
        <div className="w-full max-w-md mx-auto">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full -z-10 delay-700"></div>

            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[32px] p-8 md:p-12 ring-1 ring-black/5 dark:ring-white/10">
                {children}
            </div>
        </div>
    );
};
