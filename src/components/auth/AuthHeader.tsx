import React from 'react';
import logo from '../../markaitek.svg';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-8 relative flex items-center justify-center group">
                {/* Elevated Logo Badge with Gradient Background */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_32px_-8px_rgba(13,148,136,0.4)]">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-brand-accent/90 to-brand-accent/80"></div>
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '16px 16px'
                    }}></div>
                    {/* Logo Container with Inverted/White Filter */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            src={logo} 
                            alt="Markaitek" 
                            className="w-10 h-10 object-contain brightness-0 invert opacity-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" 
                        />
                    </div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
                {/* Enhanced Ambient Glow behind the badge */}
                <div className="absolute inset-0 bg-brand-accent/20 blur-2xl -z-10 rounded-full scale-150 group-hover:opacity-100 opacity-70 transition-opacity animate-pulse-soft"></div>
                {/* Outer Ring Glow */}
                <div className="absolute inset-0 border-2 border-brand-accent/30 rounded-2xl -z-10 scale-110 group-hover:border-brand-accent/50 group-hover:scale-115 transition-all duration-300"></div>
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
