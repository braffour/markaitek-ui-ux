import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
    return (
        <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 rounded-lg border border-brand-border-base bg-brand-surface-1 checked:bg-brand-accent checked:border-brand-accent transition-all duration-300 outline-none focus:ring-4 focus:ring-brand-accent/10"
                    {...props}
                />
                <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
            </div>
            {label && (
                <span className="text-sm font-semibold text-brand-text-secondary group-hover:text-brand-text-primary transition-colors">
                    {label}
                </span>
            )}
        </label>
    );
};
