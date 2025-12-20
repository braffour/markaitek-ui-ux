import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, RefreshCcw, Bug } from 'lucide-react';

interface ErrorBannerProps {
    error: {
        stepName: string;
        message: string;
        code?: string;
        details?: string;
    };
    onRetry?: () => void;
    onDebug?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onRetry, onDebug }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="mx-6 mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl shadow-sm animate-in">
            <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <AlertCircle className="text-rose-600 dark:text-rose-400" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-bold text-rose-900 dark:text-rose-200 leading-tight">
                        Run failed at {error.stepName}
                    </h3>
                    <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-1 leading-relaxed">
                        {error.message}
                    </p>

                    <div className="flex items-center gap-2 mt-4">
                        <button
                            onClick={onDebug}
                            className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm"
                        >
                            <Bug size={14} />
                            Open Debug
                        </button>
                        <button
                            onClick={onRetry}
                            className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-1.5 bg-white dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-[11px] font-bold rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/50 transition-all"
                        >
                            <RefreshCcw size={14} />
                            Retry
                        </button>
                    </div>

                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-rose-400 hover:text-rose-600 dark:hover:text-rose-200 tracking-wide uppercase transition-colors"
                    >
                        Technical Details
                        {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    {showDetails && (
                        <div className="mt-3 p-3 bg-black/5 dark:bg-black/20 rounded-lg space-y-2 animate-in">
                            {error.code && (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[9px] font-bold text-rose-400 uppercase">Code:</span>
                                    <code className="text-[10px] font-mono text-rose-600 dark:text-rose-300">{error.code}</code>
                                </div>
                            )}
                            <div className="text-[10px] font-mono text-rose-600/70 dark:text-rose-300/70 leading-relaxed break-words">
                                {error.details || 'No additional technical details available.'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
