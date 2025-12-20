import React from 'react';
import logo from '../../markaitek.svg';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <img src={logo} alt="Markaitek" className="w-20 h-20 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 relative z-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                {title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium px-4">
                {subtitle}
            </p>
        </div>
    );
};
