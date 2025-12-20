import React, { useState } from 'react';
import { Activity, Zap, ShieldCheck, FileText, Cpu, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WORKSPACES, POLICIES, ENVIRONMENTS } from '../../constants';

const YoloView = () => {
    const { t, i18n } = useTranslation();
    const [transcript, setTranscript] = useState<{ text: string, time: string }[]>([]);
    const [isBuilding, setIsBuilding] = useState(false);
    const [input, setInput] = useState('');

    const simulateAgent = () => {
        setIsBuilding(true);
        const steps = i18n.language.startsWith('fr')
            ? [
                "Analyse de l'intention...",
                "Récupération du contexte à partir des docs vectorisés...",
                "Vérification de la conformité SOC2...",
                "Rédaction de la définition du flux...",
                "Simulation d'exécution à blanc...",
                "Prêt pour révision."
            ]
            : [
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
            setTranscript(prev => [...prev, { text: steps[stepIndex], time: new Date().toLocaleTimeString().split(' ')[0] }]);
            stepIndex++;
        }, 800);
    };

    return (
        <div className="h-full flex flex-col lg:flex-row gap-8 p-6 lg:p-10 overflow-y-auto lg:overflow-hidden max-w-7xl mx-auto w-full pb-20 lg:pb-10">
            {/* Left: Intent Panel */}
            <div className="flex-1 flex flex-col gap-8 overflow-visible lg:overflow-y-auto custom-scrollbar pr-2">
                <div className="bg-brand-surface-1/40 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-brand-border-low shadow-2xl relative overflow-hidden group min-h-[400px]">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[100px] -mr-32 -mt-32 pointer-events-none group-hover:bg-brand-accent/10 transition-all duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 blur-[100px] -ml-32 -mb-32 pointer-events-none group-hover:bg-brand-accent/10 transition-all duration-1000"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl shadow-inner">
                                <MessageSquare className="text-brand-accent shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-transform group-hover:scale-110" size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-text-primary">{t('agent.terminal')}</h2>
                                <p className="text-brand-text-muted mt-1 text-[13px] font-bold uppercase tracking-[0.2em] opacity-60">Neural Engine v4.0</p>
                            </div>
                        </div>

                        <p className="text-brand-text-secondary mb-8 text-base md:text-lg leading-relaxed max-w-2xl font-medium">{t('agent.description')}</p>

                        <div className="relative group/input">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-purple-400/20 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-700"></div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('agent.placeholder')}
                                className="w-full bg-brand-surface-2/40 border border-brand-border-low rounded-2xl p-6 text-base md:text-lg text-brand-text-primary placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent/40 min-h-[160px] md:min-h-[200px] relative z-10 backdrop-blur-md transition-all resize-none font-bold shadow-inner leading-relaxed"
                            />
                            <button
                                onClick={simulateAgent}
                                disabled={!input || isBuilding}
                                className="absolute bottom-6 right-6 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-3 z-20 shadow-2xl shadow-brand-accent/20 disabled:opacity-30 disabled:cursor-not-allowed text-sm md:text-base active:scale-95 group/btn uppercase tracking-widest"
                            >
                                {isBuilding ? <Activity className="animate-spin" size={20} /> : <Zap size={20} className="group-hover/btn:scale-125 transition-transform" />}
                                {t('agent.execute')}
                            </button>
                        </div>

                        <div className="mt-8 flex gap-3 flex-wrap items-center">
                            <span className="text-[10px] text-brand-text-muted font-bold uppercase tracking-[0.25em] mr-4 w-full md:w-auto opacity-60">{t('agent.quickPrompts')}</span>
                            {[
                                { key: 'agent.syncLeads' },
                                { key: 'agent.dailyReport' },
                                { key: 'agent.onboardUser' }
                            ].map(p => (
                                <button
                                    key={p.key}
                                    onClick={() => setInput(t(p.key))}
                                    className="bg-brand-surface-1/40 hover:bg-brand-accent/10 px-4 py-2 rounded-full text-[12px] font-bold text-brand-text-secondary hover:text-brand-accent transition-all backdrop-blur-md border border-brand-border-low hover:border-brand-accent/40 active:scale-95 shadow-sm"
                                >
                                    {t(p.key)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mandatory Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-brand-surface-1/40 backdrop-blur-2xl p-8 rounded-3xl border border-brand-border-low shadow-xl group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <h3 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em]">{t('agent.governance')}</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3 px-1">{t('agent.policyScope')}</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                                    <select className="w-full pl-12 pr-4 py-3 border border-brand-border-low rounded-xl bg-brand-surface-2/40 focus:outline-none focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 transition-all appearance-none text-brand-text-primary text-sm font-bold shadow-inner custom-select">
                                        {i18n.language.startsWith('fr') ? <option>RGPD strict</option> : <option>GDPR Strict</option>}
                                        <option>ISO27001</option>
                                        <option>SOC2 Type II</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3 px-1">{t('agent.contextFile')}</label>
                                <div className="border-2 border-dashed border-brand-border-low rounded-xl p-8 text-center hover:bg-brand-surface-2/40 hover:border-brand-accent/40 cursor-pointer transition-all group/upload shadow-inner">
                                    <FileText className="mx-auto text-brand-text-muted group-hover/upload:text-brand-accent group-hover/upload:scale-110 transition-all mb-3" size={32} />
                                    <span className="text-[11px] text-brand-text-muted font-bold uppercase tracking-widest leading-loose">{t('agent.uploadHint')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-surface-1/40 backdrop-blur-2xl p-8 rounded-3xl border border-brand-border-low shadow-xl group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                            <h3 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em]">{t('agent.params')}</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3 px-1">{t('agent.urgency')}</label>
                                <div className="flex bg-brand-surface-2/40 p-1.5 rounded-2xl shadow-inner border border-brand-border-low">
                                    {[
                                        { key: 'agent.asap' },
                                        { key: 'agent.today' },
                                        { key: 'agent.flexible' }
                                    ].map((u, i) => (
                                        <button key={u.key} className={`flex-1 py-2.5 text-[11px] rounded-xl font-bold uppercase transition-all tracking-wider ${i === 0 ? 'bg-brand-surface-1 text-brand-accent shadow-xl border border-brand-border-low shadow-black/40' : 'text-brand-text-muted hover:text-brand-text-primary'}`}>
                                            {t(u.key)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3 px-1">{t('agent.environments')}</label>
                                <div className="flex flex-wrap gap-6 pt-2 px-1">
                                    {[
                                        { id: 'dev', key: 'agent.dev' },
                                        { id: 'staging', key: 'agent.staging' },
                                        { id: 'prod', key: 'agent.prod' }
                                    ].map(env => (
                                        <label key={env.id} className="flex items-center gap-3 cursor-pointer group/env">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" defaultChecked={env.id === 'dev'} className="peer hidden" />
                                                <div className="w-5 h-5 rounded-lg border-2 border-brand-border-low peer-checked:bg-brand-accent peer-checked:border-brand-accent transition-all group-hover/env:border-brand-accent/40 shadow-inner">
                                                    <ShieldCheck className="text-brand-bg opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" size={16} />
                                                </div>
                                            </div>
                                            <span className="text-[12px] font-bold text-brand-text-secondary group-hover/env:text-brand-text-primary transition-colors tracking-tight uppercase">{t(env.key)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Live Transcript */}
            <div className="w-full lg:w-[400px] bg-[#0F1519] rounded-3xl p-8 flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] shrink-0 border border-brand-border-low relative overflow-hidden min-h-[400px] lg:h-auto group">
                {/* Decoration */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/5 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-accent/10 rounded-xl border border-brand-accent/20">
                            <Cpu className="text-brand-accent" size={18} />
                        </div>
                        <div>
                            <h3 className="text-[11px] font-bold text-brand-text-primary uppercase tracking-[0.2em]">{t('agent.trace')}</h3>
                            <p className="text-[9px] font-mono text-brand-accent/60 mt-0.5">LATENCY: 12ms</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-brand-surface-1/40 px-3 py-1.5 rounded-full border border-brand-border-low shadow-sm">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{t('agent.online')}</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto font-mono text-[13px] space-y-5 pr-2 custom-scrollbar">
                    {transcript.length === 0 && !isBuilding && (
                        <div className="h-full flex flex-col items-center justify-center text-brand-text-muted/30 italic py-20">
                            <div className="w-20 h-20 rounded-[32px] bg-brand-surface-2/40 flex items-center justify-center mb-6 border border-brand-border-low shadow-inner">
                                <Activity size={32} className="opacity-20" />
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em]">{t('agent.waiting')}</p>
                        </div>
                    )}
                    {transcript.map((log, idx) => (
                        <div key={idx} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <span className="text-brand-text-muted/40 shrink-0 text-[10px] pt-1.5 font-bold tracking-tighter w-12">{log.time}</span>
                            <div className="text-emerald-400/90 pl-4 border-l border-emerald-400/20 leading-relaxed font-medium">
                                <span className="opacity-40 text-brand-text-muted mr-1">❯</span> {log.text}
                            </div>
                        </div>
                    ))}
                    {isBuilding && (
                        <div className="flex items-center gap-3 text-brand-accent mt-6 pl-16">
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"></div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Architecting...</span>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between text-[10px] text-brand-text-muted uppercase tracking-widest font-bold px-1">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck size={14} className="text-brand-accent" />
                            <span>{t('agent.auditActive')}</span>
                        </div>
                        <span className="font-mono opacity-40">NODE_X92</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YoloView;
