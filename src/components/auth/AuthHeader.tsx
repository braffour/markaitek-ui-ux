import React from 'react';
import logo from '../../markaitek.svg';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-8 relative flex items-center justify-center">
                {/* Elevated Logo Badge */}
                <div className="w-16 h-16 bg-brand-surface-2 border border-brand-border-high rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-brand-accent/40 group-hover:shadow-brand-accent/10">
                    <img src={logo} alt="Markaitek" className="w-10 h-10 object-contain" />
                </div>
                {/* Subtle Ambient Glow behind the badge */}
                <div className="absolute inset-0 bg-brand-accent/10 blur-xl -z-10 rounded-full scale-150 group-hover:opacity-100 opacity-60 transition-opacity"></div>
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
