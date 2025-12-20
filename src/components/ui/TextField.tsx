import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        {leftIcon}
                    </div>
                )}
                <input
                    className={`
                        w-full px-4 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium
                        transition-all duration-200 outline-none
                        placeholder:text-slate-400 dark:placeholder:text-slate-500
                        text-slate-900 dark:text-slate-100
                        ${leftIcon ? 'pl-10' : ''}
                        ${rightIcon ? 'pr-10' : ''}
                        ${error
                            ? 'border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5'
                        }
                    `}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <span className="text-[11px] font-medium text-red-500 ml-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                    {error}
                </span>
            )}
        </div>
    );
};
