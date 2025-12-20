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
        <div className="mx-6 mb-10 p-8 bg-red-400/5 backdrop-blur-xl border border-red-400/20 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(248,113,113,0.15)] animate-in slide-in-from-top-4 duration-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="flex gap-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-red-400/10 flex items-center justify-center shrink-0 border border-red-400/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <AlertCircle className="text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" size={28} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col mb-1.5">
                        <span className="text-[10px] font-bold text-red-400/60 uppercase tracking-[0.3em] mb-1">Execution Failure</span>
                        <h3 className="text-lg font-extrabold text-red-100 leading-tight tracking-tight">
                            Workflow failed at <span className="text-red-400">{error.stepName}</span>
                        </h3>
                    </div>
                    <p className="text-[13px] text-red-100/60 leading-relaxed font-medium max-w-xl">
                        {error.message}
                    </p>

                    <div className="flex items-center gap-4 mt-8">
                        <button
                            onClick={onDebug}
                            className="flex-1 flex items-center justify-center gap-3 py-4 bg-red-400 hover:bg-red-500 text-[#0F1519] text-[11px] font-extrabold rounded-2xl transition-all shadow-xl shadow-red-400/20 active:scale-95 uppercase tracking-[0.2em]"
                        >
                            <Bug size={18} />
                            Initiate Debug Trace
                        </button>
                        <button
                            onClick={onRetry}
                            className="flex-shrink-0 flex items-center justify-center gap-3 px-8 py-4 bg-brand-bg/40 border border-red-400/30 text-red-400 text-[11px] font-extrabold rounded-2xl hover:bg-red-400/10 transition-all active:scale-95 uppercase tracking-[0.2em]"
                        >
                            <RefreshCcw size={18} />
                            Retry
                        </button>
                    </div>

                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex items-center gap-2 mt-8 text-[10px] font-bold text-brand-text-muted hover:text-red-400 tracking-[0.3em] uppercase transition-all mx-auto opacity-40 hover:opacity-100"
                    >
                        {showDetails ? 'Conceal Protocol' : 'Technical Protocol'}
                        {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showDetails && (
                        <div className="mt-6 p-6 bg-[#0F1519] border border-red-400/10 rounded-2xl space-y-4 animate-in slide-in-from-top-4 duration-500 shadow-2xl">
                            {error.code && (
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[10px] font-bold text-red-400/40 uppercase tracking-[0.2em]">Error Code:</span>
                                    <code className="text-[12px] font-mono text-white tracking-tight bg-white/5 px-2 py-0.5 rounded-md">{error.code}</code>
                                </div>
                            )}
                            <div className="text-[12px] font-mono text-red-100/40 leading-relaxed break-words bg-red-400/[0.03] p-4 rounded-xl border border-red-400/5">
                                {error.details || 'No additional telemetry data found for this failure event.'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
