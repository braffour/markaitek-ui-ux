import React, { useState } from 'react';
import { Zap, Activity, ShieldCheck, FileText, Cpu } from 'lucide-react';

const POLICIES = ["GDPR Strict", "Internal Only", "SOC2 Compliant", "Public Sandbox"];
const ENVIRONMENTS = ["Dev", "Staging", "Prod"];

const AgentView = () => {
    const [transcript, setTranscript] = useState<{ text: string; time: string }[]>([]);
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
        <div className="h-full flex flex-col lg:flex-row gap-6 p-6 overflow-hidden">
            {/* Left: Intent Panel */}
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                <div className="bg-gradient-to-br from-brand-blue to-indigo-900 rounded-2xl p-8 text-white shadow-glow-blue shrink-0 relative overflow-hidden border border-brand-border">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <h2 className="text-3xl font-bold mb-2 relative z-10">What are we automating today?</h2>
                    <p className="text-indigo-100 mb-6 relative z-10">Express your goal. Markaitek handles the governance.</p>

                    <div className="relative z-10">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., Whenever a high-priority ticket arrives in Jira, summarize it with GPT-4 and slack the Engineering Ops channel..."
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[120px] backdrop-blur-sm transition-all"
                        />
                        <button
                            onClick={simulateAgent}
                            disabled={!input || isBuilding}
                            className="absolute bottom-4 right-4 bg-white text-brand-blue px-4 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg"
                        >
                            {isBuilding ? <Activity className="animate-spin" size={18} /> : <Zap size={18} />}
                            Execute
                        </button>
                    </div>

                    <div className="mt-4 flex gap-2 flex-wrap relative z-10">
                        <span className="text-xs text-indigo-200 font-semibold uppercase tracking-wider self-center mr-2">Quick Prompts:</span>
                        {['Sync Leads to CRM', 'Daily Report', 'Onboard User'].map(p => (
                            <button key={p} onClick={() => setInput(p)} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-sm text-white transition border border-white/10">
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mandatory Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-surface/70 backdrop-blur-md p-6 rounded-2xl border border-brand-border shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Governance Context</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Policy Scope</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-2.5 text-brand-blue" size={16} />
                                    <select className="w-full pl-10 pr-4 py-2 border border-brand-border rounded-lg bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-200 appearance-none">
                                        {POLICIES.map(p => <option key={p}>{p}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Context File (RAG)</label>
                                <div className="border-2 border-dashed border-brand-border rounded-lg p-4 text-center hover:bg-brand-surface cursor-pointer transition group">
                                    <FileText className="mx-auto text-slate-500 group-hover:text-brand-blue transition-colors mb-1" size={20} />
                                    <span className="text-xs text-slate-400">Drag spec or click to upload</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-surface/70 backdrop-blur-md p-6 rounded-2xl border border-brand-border shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Execution Parameters</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Urgency</label>
                                <div className="flex bg-brand-dark rounded-lg p-1 border border-brand-border">
                                    {['ASAP', 'Today', 'Flexible'].map((u, i) => (
                                        <button key={u} className={`flex-1 py-1.5 text-sm rounded-md font-medium transition ${i === 0 ? 'bg-brand-blue shadow text-white' : 'text-slate-400 hover:text-slate-200'}`}>
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
                                                <input type="checkbox" defaultChecked={env === 'Dev'} className="peer h-4 w-4 rounded border-slate-600 text-brand-blue focus:ring-brand-blue bg-brand-dark" />
                                            </div>
                                            <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{env}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Live Transcript */}
            <div className="w-full lg:w-96 bg-brand-surface rounded-2xl p-6 flex flex-col shadow-2xl shadow-black/50 shrink-0 border border-brand-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-purple-500 to-pink-500"></div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-border">
                    <div className="flex items-center gap-2">
                        <Cpu className="text-brand-blue" size={20} />
                        <h3 className="font-mono text-slate-200 font-semibold">Agent Terminal</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-brand-dark px-2 py-1 rounded-full border border-brand-border">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Online</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto font-mono text-sm space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pr-2">
                    {transcript.length === 0 && !isBuilding && (
                        <div className="text-slate-600 italic text-center mt-10 flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-2">
                                <Activity size={20} className="opacity-50" />
                            </div>
                            Waiting for intent...
                        </div>
                    )}
                    {transcript.map((log, idx) => (
                        <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <span className="text-slate-600 shrink-0 text-xs pt-1 font-mono opacity-70">{log.time}</span>
                            <div className="text-emerald-400 border-l-2 border-emerald-900/50 pl-3">
                                {log.text}
                            </div>
                        </div>
                    ))}
                    {isBuilding && (
                        <div className="flex items-center gap-2 text-brand-blue mt-4 pl-1">
                            <span className="animate-pulse">_</span>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-brand-border">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <ShieldCheck size={14} />
                        <span>Audit logging active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentView;
