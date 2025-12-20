import React, { useState } from 'react';
import {
    CheckCircle2,
    Circle,
    XCircle,
    Clock,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Copy,
    Search,
    Play
} from 'lucide-react';

export interface StepData {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'running' | 'success' | 'failed';
    startTime?: string;
    duration?: string;
    input?: any;
    output?: any;
    logs?: string[];
}

interface StepTimelineItemProps {
    step: StepData;
    isActive?: boolean;
    isLast?: boolean;
}

export const StepTimelineItem: React.FC<StepTimelineItemProps> = ({
    step,
    isActive = false,
    isLast = false
}) => {
    const [isExpanded, setIsExpanded] = useState(isActive);

    const icons = {
        pending: <Circle size={16} className="text-slate-300 dark:text-slate-700" />,
        running: (
            <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <Play size={12} className="relative inline-flex text-indigo-500 m-auto fill-current" />
            </div>
        ),
        success: <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-50 dark:fill-emerald-950/30" />,
        failed: <XCircle size={16} className="text-rose-500 fill-rose-50 dark:fill-rose-950/30" />,
    };

    return (
        <div className={`relative flex gap-4 px-6 ${isLast ? '' : 'pb-6'}`}>
            {/* Thread Line */}
            {!isLast && (
                <div className="absolute left-[31px] top-6 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />
            )}

            {/* Status Icon */}
            <div className="relative z-10 flex-shrink-0 mt-0.5 bg-white dark:bg-slate-900 ring-4 ring-white dark:ring-slate-900 rounded-full">
                {icons[step.status]}
            </div>

            {/* Content */}
            <div className={`flex-1 min-w-0 flex flex-col gap-1 ${step.status === 'pending' ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-1 flex items-center gap-2 text-left group"
                    >
                        <span className={`text-[13px] font-bold truncate transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 group-hover:text-indigo-500'}`}>
                            {step.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{step.duration}</span>
                        {isExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                    </button>

                    {step.status === 'failed' && (
                        <button className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-[9px] font-bold rounded uppercase tracking-wider">
                            Debug
                        </button>
                    )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed truncate">
                    {step.description}
                </p>

                {isExpanded && (
                    <div className="mt-3 space-y-3 animate-in">
                        {/* Summary Info */}
                        <div className="flex items-center gap-4 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1"><Clock size={10} /> {step.startTime}</span>
                        </div>

                        {/* Inspector Mini Tabs */}
                        <div className="space-y-2">
                            {step.input && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        <span>Input</span>
                                        <button className="hover:text-indigo-500"><Copy size={10} /></button>
                                    </div>
                                    <pre className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg text-[10px] font-mono text-slate-600 dark:text-slate-400 overflow-x-auto border border-black/5 dark:border-white/5">
                                        {JSON.stringify(step.input, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {step.output && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        <span>Output</span>
                                        <button className="hover:text-indigo-500"><Copy size={10} /></button>
                                    </div>
                                    <pre className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg text-[10px] font-mono text-indigo-600 dark:text-indigo-400 overflow-x-auto border border-black/5 dark:border-white/5">
                                        {JSON.stringify(step.output, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {step.logs && step.logs.length > 0 && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        <span>Logs</span>
                                        <button className="hover:text-indigo-500"><Search size={10} /></button>
                                    </div>
                                    <div className="p-3 bg-slate-900 rounded-lg text-[10px] font-mono text-slate-300 space-y-1 max-h-32 overflow-y-auto custom-scrollbar border border-white/5 shadow-inner">
                                        {step.logs.map((log, i) => (
                                            <div key={i} className="flex gap-2">
                                                <span className="text-slate-600 select-none">{i + 1}</span>
                                                <span>{log}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <ExternalLink size={12} />
                            Open in Editor
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
