import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
    const isSuccess = type === 'success';

    return (
        <div className={`
            fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-300
            ${isSuccess
                ? 'bg-emerald-50/90 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400'
                : 'bg-red-50/90 dark:bg-red-500/10 border-red-200/50 dark:border-red-500/20 text-red-900 dark:text-red-400'
            }
        `}>
            {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <p className="text-sm font-semibold">{message}</p>
            {onClose && (
                <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                    <X size={14} />
                </button>
            )}
        </div>
    );
};
