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
        pending: <Circle size={16} className="text-brand-text-muted opacity-30" />,
        running: (
            <div className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-40"></span>
                <Play size={14} className="relative inline-flex text-brand-accent m-auto fill-current shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
            </div>
        ),
        success: <CheckCircle2 size={18} className="text-emerald-400 fill-emerald-400/5 shadow-[0_0_12px_rgba(52,211,153,0.2)]" />,
        failed: <XCircle size={18} className="text-red-400 fill-red-400/5 shadow-[0_0_12px_rgba(248,113,113,0.2)]" />,
    };

    return (
        <div className={`relative flex gap-6 px-8 group ${isLast ? '' : 'pb-8'}`}>
            {/* Thread Line */}
            {!isLast && (
                <div className="absolute left-[34px] top-10 bottom-0 w-[2px] bg-brand-border-low rounded-full opacity-20" />
            )}

            {/* Status Icon */}
            <div className="relative z-10 flex-shrink-0 mt-1.5 bg-brand-bg ring-[8px] ring-brand-bg rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                {icons[step.status]}
            </div>

            {/* Content */}
            <div className={`flex-1 min-w-0 flex flex-col gap-1.5 ${step.status === 'pending' ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-1 flex items-center gap-3 text-left group"
                    >
                        <span className={`text-[14px] font-bold tracking-tight transition-all duration-300 ${isActive ? 'text-brand-accent scale-[1.02] origin-left' : 'text-brand-text-primary group-hover:text-brand-accent'}`}>
                            {step.name}
                        </span>
                        <span className="text-[10px] text-brand-text-muted font-bold uppercase tracking-widest">{step.duration}</span>
                        {isExpanded ? <ChevronUp size={16} className="text-brand-text-muted" /> : <ChevronDown size={16} className="text-brand-text-muted group-hover:text-brand-text-primary transition-colors" />}
                    </button>

                    {step.status === 'failed' && (
                        <button className="px-2.5 py-1 bg-red-400/10 border border-red-400/20 text-red-400 text-[9px] font-bold rounded-lg uppercase tracking-[0.15em] hover:bg-red-400/20 transition-all active:scale-95 shadow-lg shadow-red-400/5">
                            Debug
                        </button>
                    )}
                </div>

                <p className="text-[12px] text-brand-text-muted leading-relaxed truncate font-medium">
                    {step.description}
                </p>

                {isExpanded && (
                    <div className="mt-5 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        {/* Summary Info */}
                        <div className="flex items-center gap-5 text-[10px] text-brand-text-muted font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Clock size={12} className="text-brand-accent/60" /> {step.startTime}</span>
                        </div>

                        {/* Inspector Mini Tabs */}
                        <div className="space-y-4">
                            {step.input && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.15em]">
                                        <span>Input Data</span>
                                        <button className="hover:text-brand-accent transition-colors"><Copy size={12} /></button>
                                    </div>
                                    <pre className="p-4 bg-brand-surface-2 border border-brand-border-low rounded-2xl text-[11px] font-mono text-brand-text-secondary overflow-x-auto shadow-inner">
                                        {JSON.stringify(step.input, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {step.output && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.15em]">
                                        <span>Output Result</span>
                                        <button className="hover:text-brand-accent transition-colors"><Copy size={12} /></button>
                                    </div>
                                    <pre className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl text-[11px] font-mono text-brand-accent overflow-x-auto shadow-inner">
                                        {JSON.stringify(step.output, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {step.logs && step.logs.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.15em]">
                                        <span>Execution Logs</span>
                                        <button className="hover:text-brand-accent transition-colors"><Search size={12} /></button>
                                    </div>
                                    <div className="p-4 bg-[#0F1519] border border-white/5 rounded-2xl text-[11px] font-mono text-brand-text-muted space-y-2 max-h-40 overflow-y-auto custom-scrollbar shadow-2xl">
                                        {step.logs.map((log, i) => (
                                            <div key={i} className="flex gap-4">
                                                <span className="text-brand-text-muted/30 select-none font-bold">{i + 1}</span>
                                                <span className="text-brand-text-secondary leading-relaxed">{log}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-brand-surface-1 border border-brand-border-low rounded-2xl text-[11px] font-bold text-brand-text-primary hover:bg-white/5 transition-all shadow-xl uppercase tracking-widest active:scale-95">
                            <ExternalLink size={14} className="text-brand-accent" />
                            Open in Workflow Editor
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
