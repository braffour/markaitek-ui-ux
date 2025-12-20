import React, { useState, useRef, useEffect } from 'react';
import {
    Target,
    Stethoscope,
    Map,
    Wrench,
    FileText,
    Send,
    BrainCircuit,
    CheckCircle2,
    AlertTriangle,
    ChevronRight,
    TrendingUp,
    Shield,
    Users,
    Clock,
    ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- Types ---

type AdvisorStep = 'INTENT' | 'CONVERSATION' | 'SUMMARY';

type IntentId = 'objective' | 'diagnosis' | 'strategy' | 'tools' | 'brief';

interface IntentOption {
    id: IntentId;
    labelKey: string;
    descKey: string;
    icon: React.ElementType;
    color: string;
}

interface Message {
    id: string;
    role: 'advisor' | 'user';
    content: string;
    timestamp: Date;
}

interface BusinessContext {
    objective?: string;
    targetMarket?: string;
    constraints?: string[];
    kpis?: string[];
    risks?: string[];
}

// --- Constants ---

const INTENTS: IntentOption[] = [
    {
        id: 'objective',
        labelKey: 'advisor.intents.objective.title',
        descKey: 'advisor.intents.objective.desc',
        icon: Target,
        color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20'
    },
    {
        id: 'diagnosis',
        labelKey: 'advisor.intents.diagnose.title',
        descKey: 'advisor.intents.diagnose.desc',
        icon: Stethoscope,
        color: 'text-red-400 bg-red-400/10 border-red-400/20'
    },
    {
        id: 'strategy',
        labelKey: 'advisor.intents.strategy.title',
        descKey: 'advisor.intents.strategy.desc',
        icon: Map,
        color: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
    },
    {
        id: 'tools',
        labelKey: 'advisor.intents.tools.title',
        descKey: 'advisor.intents.tools.desc',
        icon: Wrench,
        color: 'text-brand-warning bg-brand-warning/10 border-brand-warning/20'
    },
    {
        id: 'brief',
        labelKey: 'advisor.intents.brief.title',
        descKey: 'advisor.intents.brief.desc',
        icon: FileText,
        color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    }
];

// --- Main Component ---

const AdvisorView = () => {
    const { t, i18n } = useTranslation();
    const [step, setStep] = useState<AdvisorStep>('INTENT');
    const [selectedIntent, setSelectedIntent] = useState<IntentId | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Business Context State
    const [context, setContext] = useState<BusinessContext>({
        constraints: ['Budget: < $5k', 'Timeline: 2 weeks'],
        kpis: ['ROI > 3x', 'CAC < $50'],
        risks: ['Market saturation']
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleIntentSelect = (intent: IntentId) => {
        setSelectedIntent(intent);
        setStep('CONVERSATION');

        // Initial Advisor Message
        const initialMsg: Message = {
            id: 'init-1',
            role: 'advisor',
            content: i18n.language.startsWith('fr')
                ? `Je peux vous aider à ${t(INTENTS.find(i => i.id === intent)?.labelKey || '').toLowerCase()}. Pour commencer, pourriez-vous m'en dire un peu plus sur l'objectif spécifique que vous recherchez ?`
                : `I can help you ${t(INTENTS.find(i => i.id === intent)?.labelKey || '').toLowerCase()}. To get started, could you tell me a bit more about the specific outcome you're looking for?`,
            timestamp: new Date()
        };
        setMessages([initialMsg]);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Update context based on input (Mock logic)
        setContext(prev => ({
            ...prev,
            objective: !prev.objective ? inputValue : prev.objective, // Simple capture
        }));

        // Mock Advisor Reply
        setTimeout(() => {
            setIsTyping(false);
            const replies = i18n.language.startsWith('fr')
                ? [
                    "C'est logique. Quel est le public cible principal pour cela ?",
                    "Compris. Y a-t-il des contraintes spécifiques (budget, temps, ressources) dont nous devrions tenir compte ?",
                    "C'est noté. Comment mesurerez-vous le succès ? Quels sont vos principaux indicateurs de performance ?",
                    "Je vois. Regardons les risques. Quelle est votre plus grande préoccupation en ce moment ?"
                ]
                : [
                    "That makes sense. Who is the primary target audience for this?",
                    "Understood. Are there any specific constraints (budget, time, resources) we should be aware of?",
                    "Got it. How will you measure success? What are your key KPIs?",
                    "I see. Let's look at the risks. What's the biggest concern you have right now?"
                ];
            // Simple rotation or logic could be added here. For now, randomish or sequential.
            const nextReply = replies[messages.length % replies.length];

            // Check if we should finish
            if (messages.length > 5) {
                setStep('SUMMARY');
                return;
            }

            const advisorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'advisor',
                content: nextReply,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, advisorMsg]);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // --- Sub-Components ---

    const renderIntentSelection = () => (
        <div className="flex flex-col items-center justify-start p-6 md:p-12 max-w-7xl mx-auto h-full overflow-y-auto w-full custom-scrollbar space-y-20">
            <div className="text-center mt-12 space-y-6">
                <div className="w-24 h-24 bg-brand-accent/5 backdrop-blur-3xl border border-brand-accent/20 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-brand-accent/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <BrainCircuit size={48} className="text-brand-accent relative z-10 transition-transform group-hover:scale-110 duration-500" />
                </div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-brand-text-primary tracking-tight leading-tight">{t('advisor.welcome')}</h2>
                <p className="text-brand-text-muted max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium uppercase tracking-[0.1em] opacity-60">
                    {t('advisor.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4">
                {INTENTS.map((intent) => {
                    const Icon = intent.icon;
                    return (
                        <button
                            key={intent.id}
                            onClick={() => handleIntentSelect(intent.id)}
                            className="bg-brand-surface-1/30 backdrop-blur-2xl p-10 rounded-[40px] border border-brand-border-low hover:border-brand-accent/40 hover:bg-brand-surface-1/40 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 text-left flex flex-col gap-10 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                <ArrowRight className="text-brand-accent" size={24} />
                            </div>
                            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border shadow-2xl transition-transform group-hover:scale-110 duration-500 ${intent.color}`}>
                                <Icon size={32} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-extrabold text-brand-text-primary text-2xl group-hover:text-brand-accent transition-colors tracking-tight">
                                    {t(intent.labelKey)}
                                </h3>
                                <p className="text-brand-text-muted text-sm leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                    {t(intent.descKey)}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Recent Workflows Section */}
            <div className="w-full px-4 mb-20 space-y-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)]"></div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-text-muted opacity-60">Recent Strategic Sessions</h3>
                    </div>
                    <button className="text-[10px] font-bold text-brand-accent hover:text-brand-accent-hover uppercase tracking-widest px-4 py-2 bg-brand-accent/5 rounded-xl border border-brand-accent/10 transition-all">View Analytics Library</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Global Expansion', status: 'Active', time: '2h ago' },
                        { name: 'Retention Strategy', status: 'Paused', time: '5h ago' },
                        { name: 'Supply Chain Audit', status: 'Active', time: '1d ago' },
                        { name: 'Market Positioning', status: 'Draft', time: '2d ago' },
                    ].map((wf, i) => (
                        <div key={i} className="p-6 bg-brand-surface-1/30 backdrop-blur-xl border border-brand-border-low rounded-[24px] hover:border-brand-accent/30 transition-all cursor-pointer group hover:bg-brand-surface-1/50 hover:shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${wf.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                                    wf.status === 'Paused' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' :
                                        'bg-brand-text-muted/10 text-brand-text-muted border border-brand-border-low font-bold'
                                    }`}>{wf.status}</span>
                                <span className="text-[10px] text-brand-text-muted font-bold opacity-40 uppercase tracking-tighter">{wf.time}</span>
                            </div>
                            <h4 className="text-[15px] font-extrabold text-brand-text-secondary group-hover:text-brand-text-primary transition-colors tracking-tight">{wf.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContextPanel = () => (
        <div className="w-[340px] border-l border-brand-border-low bg-brand-surface-1/20 backdrop-blur-xl p-8 overflow-y-auto hidden xxl:block custom-scrollbar">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text-muted mb-12 flex items-center gap-3 opacity-60">
                <BrainCircuit size={16} className="text-brand-accent" />
                Decision Architecture
            </h3>

            <div className="space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-brand-accent font-bold text-[10px] uppercase tracking-[0.2em] px-1">
                        <Target size={14} /> Outcome Focus
                    </div>
                    <div className="text-[13px] text-brand-text-primary bg-brand-surface-2/40 p-5 rounded-2xl border border-brand-border-low shadow-inner leading-relaxed font-medium">
                        {context.objective || <span className="text-brand-text-muted italic opacity-30">Synthesizing objective...</span>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-brand-accent font-bold text-[10px] uppercase tracking-[0.2em] px-1">
                        <Users size={14} /> Market Context
                    </div>
                    <div className="text-[13px] text-brand-text-primary bg-brand-surface-2/40 p-5 rounded-2xl border border-brand-border-low shadow-inner leading-relaxed font-medium">
                        {context.targetMarket || <span className="text-brand-text-muted italic opacity-30">Analyzing segments...</span>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-brand-warning font-bold text-[10px] uppercase tracking-[0.2em] px-1">
                        <AlertTriangle size={14} /> Guardrails
                    </div>
                    {context.constraints && context.constraints.length > 0 ? (
                        <div className="flex flex-col gap-2.5">
                            {context.constraints.map((item, i) => (
                                <span key={i} className="text-[11px] font-bold px-4 py-2 bg-brand-surface-2/60 text-brand-text-secondary rounded-xl border border-brand-border-low shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-brand-text-muted italic text-[13px] opacity-30">Extracting limitations...</span>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] px-1">
                        <TrendingUp size={14} /> Core Metrics
                    </div>
                    {context.kpis && context.kpis.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2.5">
                            {context.kpis.map((item, i) => (
                                <span key={i} className="text-[11px] font-bold px-4 py-2 bg-emerald-400/5 text-emerald-400 rounded-xl border border-emerald-400/20 shadow-sm flex items-center justify-between">
                                    {item}
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-brand-text-muted italic text-[13px] opacity-30">Defining success factors...</span>
                    )}
                </div>
            </div>
        </div>
    );

    const renderChatInterface = () => (
        <div className="flex flex-1 h-full overflow-hidden relative">
            <div className="flex-1 flex flex-col h-full relative">
                {/* Chat Header */}
                <div className="h-20 border-b border-brand-border-low flex items-center justify-between px-8 bg-brand-surface-1/40 backdrop-blur-2xl z-20">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setStep('INTENT')} className="p-3 bg-brand-surface-2/40 border border-brand-border-low rounded-xl text-brand-text-muted hover:text-brand-accent transition-all hover:scale-105 active:scale-95">
                            <ArrowRight size={20} className="rotate-180" />
                        </button>
                        <div className="h-6 w-px bg-brand-border-base opacity-40"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.3em] opacity-60">Strategic Path</span>
                            <span className="font-extrabold text-brand-text-primary text-base tracking-tight">
                                {t(INTENTS.find(i => i.id === selectedIntent)?.labelKey || '')}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setStep('SUMMARY')} className="text-[11px] font-extrabold text-brand-bg bg-brand-accent hover:bg-brand-accent-hover px-6 py-3 rounded-[16px] shadow-2xl shadow-brand-accent/20 transition-all active:scale-95 uppercase tracking-[0.15em]">
                        {t('advisor.generateBrief') || 'Finalize Brief'}
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 space-y-12 bg-brand-bg/10 custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex w-full ${msg.role === 'advisor' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                            {msg.role === 'advisor' && (
                                <div className="w-12 h-12 rounded-[20px] bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0 mr-6 shadow-2xl shadow-brand-accent/5">
                                    <BrainCircuit size={24} className="text-brand-accent" />
                                </div>
                            )}
                            <div className={`max-w-[85%] md:max-w-2xl p-7 rounded-[32px] shadow-2xl text-[15px] leading-relaxed font-medium transition-all ${msg.role === 'advisor'
                                ? 'bg-brand-surface-1/60 backdrop-blur-xl text-brand-text-secondary rounded-tl-none border border-brand-border-low'
                                : 'bg-brand-accent text-brand-bg rounded-tr-none font-bold shadow-brand-accent/20'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="w-12 h-12 rounded-[20px] bg-brand-surface-1/50 flex items-center justify-center shrink-0 mr-6">
                                <BrainCircuit size={24} className="text-brand-text-muted opacity-40 animate-pulse-soft" />
                            </div>
                            <div className="bg-brand-surface-1/40 backdrop-blur-xl p-6 rounded-[24px] rounded-tl-none border border-brand-border-low flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60 animate-bounce"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60 animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60 animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-8 bg-brand-surface-1/40 border-t border-brand-border-low backdrop-blur-2xl">
                    <div className="max-w-5xl mx-auto relative group">
                        <div className="absolute -inset-4 bg-brand-accent/5 rounded-[32px] opacity-0 group-focus-within:opacity-100 transition-all duration-700 blur-xl"></div>
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={i18n.language.startsWith('fr') ? "Exprimez votre vision stratégique..." : "Articulate your strategic vision..."}
                            className="w-full pl-8 pr-20 py-6 min-h-[90px] max-h-[300px] bg-brand-surface-2/60 border border-brand-border-low focus:border-brand-accent/40 focus:bg-brand-surface-2 rounded-3xl resize-none outline-none transition-all shadow-inner placeholder-brand-text-muted/30 text-brand-text-primary text-base font-medium leading-relaxed relative z-10"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="absolute right-4 bottom-4 p-4 bg-brand-accent text-brand-bg rounded-2xl hover:bg-brand-accent-hover disabled:opacity-20 disabled:scale-95 transition-all shadow-2xl shadow-brand-accent/30 active:scale-90 z-20"
                        >
                            <Send size={24} className="font-extrabold" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Render Context Sidebar */}
            {renderContextPanel()}
        </div>
    );

    const renderDecisionSummary = () => (
        <div className="flex flex-col h-full bg-brand-bg overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto w-full p-8 md:p-16 space-y-16">
                <button onClick={() => setStep('CONVERSATION')} className="text-brand-text-muted hover:text-brand-accent transition-all flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] group">
                    <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-2 transition-transform" /> {i18n.language.startsWith('fr') ? 'Révision Stratégique' : 'Refine Decisions'}
                </button>

                <div className="flex items-center gap-8 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div className="w-24 h-24 bg-brand-accent/10 text-brand-accent rounded-[32px] flex items-center justify-center border border-brand-accent/20 shadow-[0_40px_100px_-20px_rgba(45,212,191,0.2)]">
                        <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-5xl font-extrabold text-brand-text-primary tracking-tight leading-tight">{i18n.language.startsWith('fr') ? 'Brief Exécutif' : 'Execution Brief'}</h1>
                        <p className="text-brand-text-muted font-bold tracking-[0.2em] uppercase text-xs opacity-50 flex items-center gap-3">
                            <Clock size={14} /> {i18n.language.startsWith('fr') ? 'Validé le' : 'Validated on'} {new Intl.DateTimeFormat(i18n.language).format(new Date())}
                        </p>
                    </div>
                </div>

                <div className="bg-brand-surface-1/30 backdrop-blur-3xl rounded-[48px] border border-brand-border-low overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-1000">
                    <div className="p-12 md:p-16 border-b border-brand-border-low bg-gradient-to-br from-brand-accent/[0.03] to-transparent">
                        <h3 className="text-[10px] font-bold uppercase text-brand-text-muted mb-10 tracking-[0.4em] opacity-40">{i18n.language.startsWith('fr') ? 'Analyse Stratégique' : 'Strategic Analysis'}</h3>
                        <p className="text-2xl md:text-3xl text-brand-text-primary leading-tight font-extrabold tracking-tight italic opacity-90">
                            {i18n.language.startsWith('fr')
                                ? <>Architecture d'une solution pour <span className="text-brand-accent">{context.objective || 'votre vision stratégique'}</span>. Déploiement optimisé pour le <span className="text-brand-accent">{context.targetMarket || 'marché désigné'}</span> sous contraintes strictes.</>
                                : <>Architeting a high-impact solution for <span className="text-brand-accent">{context.objective || 'your strategic vision'}</span>. Deployment optimized for <span className="text-brand-accent">{context.targetMarket || 'designated segments'}</span> under strict guardrails.</>
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-12 md:p-16 border-r border-brand-border-low">
                            <h3 className="text-[10px] font-bold uppercase text-brand-text-muted mb-10 tracking-[0.3em] flex items-center gap-3 opacity-50">
                                <TrendingUp size={18} className="text-brand-accent" />
                                {i18n.language.startsWith('fr') ? 'Feuille de Route' : 'Phase Implementation'}
                            </h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-accent mt-1.5 shadow-[0_0_12px_rgba(45,212,191,0.8)]"></div>
                                    <div className="space-y-1">
                                        <span className="text-brand-text-primary font-extrabold text-lg tracking-tight block">Phase 1: Logic & Core Integration</span>
                                        <p className="text-sm text-brand-text-muted font-medium opacity-60">Building the fundamental workflow blocks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-border-base mt-1.5"></div>
                                    <div className="space-y-1">
                                        <span className="text-brand-text-primary font-bold text-lg tracking-tight block opacity-60">Phase 2: Scale & Optimization</span>
                                        <p className="text-sm text-brand-text-muted font-medium opacity-40">Automated performance tuning.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-12 md:p-16 bg-brand-surface-2/10">
                            <h3 className="text-[10px] font-bold uppercase text-brand-text-muted mb-10 tracking-[0.3em] flex items-center gap-3 opacity-50">
                                <Shield size={18} className="text-brand-warning" />
                                {i18n.language.startsWith('fr') ? 'Facteurs de Risque' : 'Mitigation Guardrails'}
                            </h3>
                            <ul className="space-y-6">
                                {context.risks?.map((risk, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 bg-brand-surface-2/40 rounded-2xl border border-brand-border-low">
                                        <AlertTriangle size={20} className="text-brand-warning shrink-0" />
                                        <span className="text-brand-text-primary font-bold text-sm tracking-tight">{risk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 pb-10">
                    <button className="flex-[1.5] py-7 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold rounded-[24px] shadow-[0_40px_100px_-20px_rgba(45,212,191,0.4)] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] active:scale-95">
                        {i18n.language.startsWith('fr') ? 'Transférer à l\'AGENT' : 'Handoff to Expert Agent'} <ArrowRight size={24} />
                    </button>
                    <button className="flex-1 py-7 bg-brand-surface-1/40 hover:bg-brand-surface-1/60 text-brand-text-primary border border-brand-border-low font-extrabold rounded-[24px] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] active:scale-95 shadow-2xl">
                        <FileText size={24} className="text-brand-accent" /> {i18n.language.startsWith('fr') ? 'Exporter le Brief' : 'Export Strategy'}
                    </button>
                </div>

            </div>
        </div>
    );

    return (
        <div className="h-full w-full bg-brand-bg flex flex-col">
            {step === 'INTENT' && renderIntentSelection()}
            {step === 'CONVERSATION' && renderChatInterface()}
            {step === 'SUMMARY' && renderDecisionSummary()}
        </div>
    );
};

export default AdvisorView;
