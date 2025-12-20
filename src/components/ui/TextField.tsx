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
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted ml-0.5">
                    {label}
                </label>
            )}
            <div className="relative group">
                {leftIcon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted group-focus-within:text-brand-accent transition-colors">
                        {leftIcon}
                    </div>
                )}
                <input
                    className={`
                        w-full px-4 py-3 bg-[#1A2328] border rounded-xl text-sm font-medium
                        transition-all duration-300 outline-none
                        placeholder:text-brand-text-muted/60
                        text-brand-text-primary
                        ${leftIcon ? 'pl-11' : ''}
                        ${rightIcon ? 'pr-11' : ''}
                        ${error
                            ? 'border-brand-warning/50 focus:ring-4 focus:ring-brand-warning/10'
                            : 'border-brand-border-base focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5'
                        }
                    `}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-secondary transition-colors cursor-pointer">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <span className="text-[11px] font-semibold text-brand-warning ml-0.5 mt-0.5 animate-in">
                    {error}
                </span>
            )}
        </div>
    );
};
