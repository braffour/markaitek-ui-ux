import React, { useState } from 'react';
import { Activity, Zap, ShieldCheck, FileText, Cpu, MessageSquare } from 'lucide-react';
import { WORKSPACES, POLICIES, ENVIRONMENTS } from '../../constants';

const YoloView = () => {
    const [transcript, setTranscript] = useState<{ text: string, time: string }[]>([]);
    const [isBuilding, setIsBuilding] = useState(false);
    const [input, setInput] = useState('');

    const simulateAgent = () => {
        setIsBuilding(true);
        const steps = [
            "Parsing intent...",
            "Retrieving context from vectorized docs...",
            "Matching against SOC2 Policy scope...",
            "Drafting workflow definition...",
            "Simulating dry-run...",
            "Ready for review."
        ];

        let stepIndex = 0;
        setTranscript([]);

        const interval = setInterval(() => {
            if (stepIndex >= steps.length) {
                clearInterval(interval);
                setIsBuilding(false);
                return;
            }
            setTranscript(prev => [...prev, { text: steps[stepIndex], time: new Date().toLocaleTimeString() }]);
            stepIndex++;
        }, 800);
    };

    return (
        <div className="h-full flex flex-col lg:flex-row gap-6 p-6 overflow-hidden max-w-7xl mx-auto w-full">
            {/* Left: Intent Panel */}
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-900 dark:to-violet-900 rounded-2xl p-8 text-white shadow-xl shadow-indigo-900/10 shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <MessageSquare className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Agent Terminal</h2>
                    </div>
                    <p className="text-indigo-100 mb-6 text-lg font-light relative z-10">What are we automating today? Markaitek handles the governance.</p>

                    <div className="relative group z-10">
                        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., Whenever a high-priority ticket arrives in Jira, summarize it with GPT-4 and slack the Engineering Ops channel..."
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[140px] relative z-10 backdrop-blur-sm transition-all resize-none font-medium"
                        />
                        <button
                            onClick={simulateAgent}
                            disabled={!input || isBuilding}
                            className="absolute bottom-4 right-4 bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 z-20 shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isBuilding ? <Activity className="animate-spin" size={18} /> : <Zap size={18} />}
                            Execute
                        </button>
                    </div>

                    <div className="mt-6 flex gap-3 flex-wrap items-center relative z-10">
                        <span className="text-xs text-indigo-200 font-bold uppercase tracking-widest mr-2">Quick Prompts</span>
                        {['Sync Leads to CRM', 'Daily Report', 'Onboard User'].map(p => (
                            <button key={p} onClick={() => setInput(p)} className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/30">
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mandatory Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Governance Context</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Policy Scope</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-2.5 text-emerald-500" size={16} />
                                    <select className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none dark:text-slate-200">
                                        {POLICIES.map(p => <option key={p}>{p}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Context File (RAG)</label>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-5 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                                    <FileText className="mx-auto text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" size={24} />
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Drag spec or click to upload</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Execution Parameters</h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Urgency</label>
                                <div className="flex bg-slate-100/80 dark:bg-slate-800 p-1 rounded-xl">
                                    {['ASAP', 'Today', 'Flexible'].map((u, i) => (
                                        <button key={u} className={`flex-1 py-1.5 text-sm rounded-lg font-medium transition-all ${i === 0 ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                                            {u}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Environments</label>
                                <div className="flex gap-4">
                                    {ENVIRONMENTS.map(env => (
                                        <label key={env} className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" defaultChecked={env === 'Dev'} className="peer w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 transition-all bg-transparent" />
                                            </div>
                                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{env}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Live Transcript */}
            <div className="w-full lg:w-96 bg-slate-900 dark:bg-black rounded-2xl p-6 flex flex-col shadow-2xl shrink-0 border border-slate-800 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-500/20 rounded-md">
                            <Cpu className="text-indigo-400" size={16} />
                        </div>
                        <h3 className="font-mono text-indigo-100 font-semibold tracking-tight">Agent Trace</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Online</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto font-mono text-sm space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {transcript.length === 0 && !isBuilding && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                                <Activity size={24} className="opacity-20" />
                            </div>
                            Waiting for intent...
                        </div>
                    )}
                    {transcript.map((log, idx) => (
                        <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <span className="text-slate-600 shrink-0 text-[10px] pt-1 font-medium opacity-70">{log.time}</span>
                            <div className="text-emerald-400 pl-3 border-l-2 border-emerald-500/30">
                                {log.text}
                            </div>
                        </div>
                    ))}
                    {isBuilding && (
                        <div className="flex items-center gap-2 text-indigo-400 mt-4 pl-12">
                            <span className="animate-pulse">_</span>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        <ShieldCheck size={12} />
                        <span>Audit logging active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YoloView;
