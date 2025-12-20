import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InlineErrorTextProps {
    message: string;
}

export const InlineErrorText: React.FC<InlineErrorTextProps> = ({ message }) => {
    return (
        <div className="flex items-center gap-2 p-3 bg-red-50/50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={16} className="shrink-0" />
            <p className="text-xs font-bold leading-tight">{message}</p>
        </div>
    );
};
