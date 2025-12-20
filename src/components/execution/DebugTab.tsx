import React, { useState } from 'react';
import {
    Play,
    ArrowRight,
    Circle,
    Bug,
    ChevronRight,
    Copy,
    Code,
    MessageSquare,
    Eye,
    Zap,
    History as HistoryIcon,
    PauseCircle,
    Square
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DebugTabProps {
    onStop: () => void;
}

export const DebugTab: React.FC<DebugTabProps> = ({ onStop }) => {
    const { t } = useTranslation();
    const [inspectorTab, setInspectorTab] = useState<'input' | 'output' | 'logs' | 'diff'>('input');
    const [isStepping, setIsStepping] = useState(true);

    const mockStep = {
        name: 'Transform Payload',
        input: { id: 102, user: 'johndoe', type: 'premium' },
        output: { uuid: 'a1-b2-c3', customer_id: 102, tier: 'GOLD' },
        logs: ['[INFO] Starting transformation...', '[DEBUG] Mapping user to customer_id', '[INFO] Success'],
        diff: {
            tier: { old: 'premium', new: 'GOLD' },
            customer_id: { old: undefined, new: 102 }
        }
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500 pb-10">
            {/* Debug Session Header */}
            <div className="px-6 mb-8 pt-2">
                <div className="p-6 bg-[#0F1519] rounded-[24px] shadow-2xl border border-brand-border-base relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent/10 blur-[64px] group-hover:bg-brand-accent/20 transition-all duration-700" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl">
                                    <Bug size={16} className="text-brand-accent" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em]">{t('execution.debug.session')}</span>
                                    <h3 className="text-sm font-bold text-brand-text-primary tracking-wide">Production Run #12</h3>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2.5 py-1 rounded-lg tracking-widest uppercase">Paused</span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <button className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-[#0F1519] text-[11px] font-bold rounded-2xl transition-all shadow-xl shadow-brand-accent/10 active:scale-95 uppercase tracking-widest">
                                <ArrowRight size={16} />
                                Next Step
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[11px] font-bold rounded-2xl transition-all active:scale-95 uppercase tracking-widest">
                                <Play size={16} fill="currentColor" />
                                Resume
                            </button>
                            <button
                                onClick={onStop}
                                className="p-3.5 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 text-red-400 rounded-2xl transition-all active:scale-95"
                            >
                                <Square size={16} fill="currentColor" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 py-3 border-t border-white/5">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="hidden peer" />
                                <div className="w-10 h-5 bg-white/10 rounded-full relative transition-colors peer-checked:bg-brand-accent/80 border border-white/10">
                                    <div className="absolute left-1 top-1 w-2.5 h-2.5 bg-white rounded-full shadow-lg transition-transform peer-checked:translate-x-5" />
                                </div>
                                <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest group-hover:text-brand-text-primary transition-colors">{t('execution.debug.breakOnError')}</span>
                            </label>
                            <span className="text-[11px] font-bold text-brand-accent tracking-widest font-mono">STEP 04/12</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step Inspector */}
            <div className="flex-1 px-6">
                <div className="mb-6">
                    <h4 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em] mb-4 px-1">{t('execution.debug.inspector')}</h4>
                    <div className="p-1.5 bg-brand-surface-2/60 backdrop-blur-md rounded-2xl flex border border-brand-border-low shadow-inner">
                        {(['input', 'output', 'logs', 'diff'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setInspectorTab(tab)}
                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 rounded-xl ${inspectorTab === tab ? 'bg-brand-surface-1 text-brand-accent shadow-xl shadow-black/30 border border-brand-border-base' : 'text-brand-text-muted hover:text-brand-text-primary'}`}
                            >
                                {t(`execution.debug.tabs.${tab}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute right-3.5 top-3.5 flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 z-20">
                        <button className="p-2 bg-brand-surface-1/90 backdrop-blur-xl rounded-xl border border-brand-border-base text-brand-text-muted hover:text-brand-accent shadow-2xl"><Copy size={16} /></button>
                        <button className="p-2 bg-brand-surface-1/90 backdrop-blur-xl rounded-xl border border-brand-border-base text-brand-text-muted hover:text-brand-accent shadow-2xl"><Eye size={16} /></button>
                    </div>

                    <div className="p-6 bg-brand-surface-1/40 backdrop-blur-sm border border-brand-border-low rounded-2xl shadow-inner min-h-[250px] overflow-hidden relative">
                        {inspectorTab === 'input' && (
                            <pre className="text-[12px] font-mono text-brand-text-secondary animate-in fade-in duration-500">
                                {JSON.stringify(mockStep.input, null, 2)}
                            </pre>
                        )}
                        {inspectorTab === 'output' && (
                            <pre className="text-[12px] font-mono text-brand-accent animate-in fade-in duration-500">
                                {JSON.stringify(mockStep.output, null, 2)}
                            </pre>
                        )}
                        {inspectorTab === 'logs' && (
                            <div className="space-y-2.5 animate-in fade-in duration-500">
                                {mockStep.logs.map((log, i) => (
                                    <div key={i} className="flex gap-4 text-[11px] font-mono leading-relaxed">
                                        <span className="text-brand-text-muted/30 select-none font-bold">[{i + 1}]</span>
                                        <span className={log.includes('INFO') ? 'text-emerald-400 font-medium' : 'text-brand-text-muted'}>{log}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {inspectorTab === 'diff' && (
                            <div className="space-y-5 animate-in fade-in duration-500">
                                {Object.entries(mockStep.diff).map(([key, val]) => (
                                    <div key={key} className="space-y-2">
                                        <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.2em]">{key}</span>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            <div className="p-3 bg-red-400/5 text-red-100/60 text-[11px] font-mono rounded-xl line-through border border-red-400/10 shadow-inner">
                                                - {JSON.stringify(val.old)}
                                            </div>
                                            <div className="p-3 bg-emerald-400/5 text-emerald-400 text-[11px] font-mono rounded-xl border border-emerald-400/10 shadow-inner">
                                                + {JSON.stringify(val.new)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Debug Actions Portfolio */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-3 px-4 py-3.5 bg-brand-surface-1 border border-brand-border-low rounded-2xl text-[11px] font-bold text-brand-text-primary hover:bg-white/5 hover:border-brand-border-base transition-all uppercase tracking-widest active:scale-95 shadow-xl">
                        <Code size={16} className="text-brand-accent" />
                        Editor
                    </button>
                    <button className="flex items-center justify-center gap-3 px-4 py-3.5 bg-brand-surface-1 border border-brand-border-low rounded-2xl text-[11px] font-bold text-brand-text-primary hover:bg-white/5 hover:border-brand-border-base transition-all uppercase tracking-widest active:scale-95 shadow-xl">
                        <MessageSquare size={16} className="text-brand-accent" />
                        Note
                    </button>
                    <button className="col-span-2 flex items-center justify-center gap-3 px-4 py-4 bg-brand-surface-1 border border-brand-border-low rounded-2xl text-[11px] font-bold text-brand-text-primary hover:bg-white/5 hover:border-brand-border-base transition-all uppercase tracking-[0.15em] active:scale-[0.98] shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap size={18} className="text-brand-accent" />
                        Save as Test Case
                    </button>
                </div>
            </div>
        </div>
    );
};
