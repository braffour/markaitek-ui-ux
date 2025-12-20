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
        <div className="flex flex-col h-full animate-in">
            {/* Debug Session Header */}
            <div className="px-6 mb-6">
                <div className="p-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Bug size={14} className="text-indigo-400" />
                            <span className="text-[11px] font-bold text-slate-100 uppercase tracking-widest">{t('execution.debug.session')}</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">Run #12</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-all">
                            <ArrowRight size={14} />
                            {t('execution.debug.step')}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg transition-all">
                            <Play size={14} fill="currentColor" />
                            {t('execution.debug.continue')}
                        </button>
                        <button
                            onClick={onStop}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-all"
                        >
                            <Square size={14} fill="currentColor" />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="hidden" />
                            <div className="w-6 h-3.5 bg-indigo-500 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase group-hover:text-slate-200">{t('execution.debug.breakOnError')}</span>
                        </label>
                        <span className="text-[9px] font-bold text-indigo-400">Step 4/12</span>
                    </div>
                </div>
            </div>

            {/* Step Inspector */}
            <div className="flex-1 px-6">
                <div className="mb-4">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('execution.debug.inspector')}</h4>
                    <div className="p-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex">
                        {(['input', 'output', 'logs', 'diff'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setInspectorTab(tab)}
                                className={`flex-1 py-1 text-[10px] font-bold uppercase transition-all rounded-md ${inspectorTab === tab ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                {t(`execution.debug.tabs.${tab}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-500"><Copy size={12} /></button>
                        <button className="p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-500"><Eye size={12} /></button>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm min-h-[200px] overflow-hidden">
                        {inspectorTab === 'input' && (
                            <pre className="text-[11px] font-mono text-slate-600 dark:text-slate-400 animate-in">
                                {JSON.stringify(mockStep.input, null, 2)}
                            </pre>
                        )}
                        {inspectorTab === 'output' && (
                            <pre className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 animate-in">
                                {JSON.stringify(mockStep.output, null, 2)}
                            </pre>
                        )}
                        {inspectorTab === 'logs' && (
                            <div className="space-y-1.5 animate-in">
                                {mockStep.logs.map((log, i) => (
                                    <div key={i} className="flex gap-2 text-[10px] font-mono leading-relaxed">
                                        <span className="text-slate-300 dark:text-slate-700 select-none">[{i + 1}]</span>
                                        <span className={log.includes('INFO') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}>{log}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {inspectorTab === 'diff' && (
                            <div className="space-y-3 animate-in">
                                {Object.entries(mockStep.diff).map(([key, val]) => (
                                    <div key={key} className="space-y-1.5">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{key}</span>
                                        <div className="grid grid-cols-1 gap-1">
                                            <div className="p-1.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-[10px] font-mono rounded line-through opacity-70">
                                                - {JSON.stringify(val.old)}
                                            </div>
                                            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono rounded">
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
                <div className="mt-6 grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <Code size={12} />
                        {t('execution.debug.openEditor')}
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <MessageSquare size={12} />
                        {t('execution.debug.addNote')}
                    </button>
                    <button className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <Zap size={12} />
                        {t('execution.debug.saveTestCase')}
                    </button>
                </div>
            </div>
        </div>
    );
};
