import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-200 outline-none focus:ring-4 focus:ring-indigo-500/10"
                    {...props}
                />
                <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
            </div>
            {label && (
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                    {label}
                </span>
            )}
        </label>
    );
};
