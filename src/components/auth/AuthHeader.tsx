import React from 'react';
import logo from '../../markaitek.svg';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col items-center text-center mb-10">
            <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-brand-accent blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <img src={logo} alt="Markaitek" className="w-20 h-20 rounded-2xl shadow-2xl relative z-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-brand-text-primary mb-3">
                {title}
            </h1>
            <p className="text-brand-text-secondary font-medium px-4 leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
};
