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
        color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
    },
    {
        id: 'diagnosis',
        labelKey: 'advisor.intents.diagnose.title',
        descKey: 'advisor.intents.diagnose.desc',
        icon: Stethoscope,
        color: 'text-red-500 bg-red-50 dark:bg-red-900/20'
    },
    {
        id: 'strategy',
        labelKey: 'advisor.intents.strategy.title',
        descKey: 'advisor.intents.strategy.desc',
        icon: Map,
        color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20'
    },
    {
        id: 'tools',
        labelKey: 'advisor.intents.tools.title',
        descKey: 'advisor.intents.tools.desc',
        icon: Wrench,
        color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
    },
    {
        id: 'brief',
        labelKey: 'advisor.intents.brief.title',
        descKey: 'advisor.intents.brief.desc',
        icon: FileText,
        color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
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
        <div className="flex flex-col items-center justify-center p-8 max-w-5xl mx-auto h-full overflow-y-auto">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
                    <BrainCircuit size={32} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{t('advisor.welcome')}</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg">
                    {t('advisor.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
                {INTENTS.map((intent) => {
                    const Icon = intent.icon;
                    return (
                        <button
                            key={intent.id}
                            onClick={() => handleIntentSelect(intent.id)}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all text-left flex flex-col gap-4 group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${intent.color}`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {t(intent.labelKey)}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                                    {t(intent.descKey)}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const renderContextPanel = () => (
        <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 overflow-y-auto hidden xl:block">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <BrainCircuit size={14} />
                Business Context
            </h3>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                        <Target size={14} /> {t('insights.intent')}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        {context.objective || <span className="text-slate-400 italic">Defining...</span>}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                        <Users size={14} /> Target Market
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        {context.targetMarket || <span className="text-slate-400 italic">Identifying...</span>}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium text-sm">
                        <AlertTriangle size={14} /> Constraints
                    </div>
                    {context.constraints && context.constraints.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {context.constraints.map((item, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded border border-amber-100 dark:border-amber-800/50">
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-slate-400 italic text-sm">Listing...</span>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                        <TrendingUp size={14} /> Success Metrics
                    </div>
                    {context.kpis && context.kpis.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {context.kpis.map((item, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-100 dark:border-emerald-800/50">
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-slate-400 italic text-sm">Defining...</span>
                    )}
                </div>
            </div>
        </div>
    );

    const renderChatInterface = () => (
        <div className="flex flex-1 h-full overflow-hidden relative">
            <div className="flex-1 flex flex-col h-full relative">
                {/* Chat Header */}
                <div className="h-14 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setStep('INTENT')} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <ChevronRight size={16} className="rotate-180" />
                        </button>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                            {t(INTENTS.find(i => i.id === selectedIntent)?.labelKey || '')}
                        </span>
                    </div>
                    <button onClick={() => setStep('SUMMARY')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 bg-indigo-50 rounded-md border border-indigo-100 transition-colors">
                        {t('advisor.intents.brief.title')}
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'advisor' ? 'justify-start' : 'justify-end'}`}>
                            {msg.role === 'advisor' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 mr-3 shadow-sm mt-1">
                                    <BrainCircuit size={16} className="text-white" />
                                </div>
                            )}
                            <div className={`max-w-[80%] md:max-w-2xl p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.role === 'advisor'
                                ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
                                : 'bg-indigo-600 text-white rounded-tr-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mr-3 mt-1">
                                <BrainCircuit size={16} className="text-slate-400" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto relative group">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={i18n.language.startsWith('fr') ? "Tapez votre réponse..." : "Type your response..."}
                            className="w-full pl-5 pr-14 py-4 min-h-[60px] max-h-[200px] bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl resize-none outline-none transition-all shadow-sm group-hover:shadow-md text-slate-800 dark:text-slate-100 text-sm"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="absolute right-3 top-3 p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Render Context Sidebar */}
            {renderContextPanel()}
        </div>
    );

    const renderDecisionSummary = () => (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full p-8 md:p-12">
                <button onClick={() => setStep('CONVERSATION')} className="text-slate-400 hover:text-indigo-500 transition-colors flex items-center gap-2 mb-8 text-sm font-medium">
                    <ChevronRight size={16} className="rotate-180" /> {i18n.language.startsWith('fr') ? 'Retour à la conversation' : 'Back to Conversation'}
                </button>

                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{i18n.language.startsWith('fr') ? 'Résumé de la décision' : 'Decision Summary'}</h1>
                        <p className="text-slate-500">{i18n.language.startsWith('fr') ? 'Généré le' : 'Generated on'} {new Intl.DateTimeFormat(i18n.language).format(new Date())}</p>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">{i18n.language.startsWith('fr') ? 'Diagnostic métier' : 'Business Diagnosis'}</h3>
                        <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            {i18n.language.startsWith('fr')
                                ? <>L'utilisateur a besoin d'une solution pour <span className="text-indigo-600 dark:text-indigo-400">{context.objective || 'atteindre des objectifs commerciaux spécifiques'}</span>. L'accent principal est mis sur l'entrée dans le <span className="text-indigo-600 dark:text-indigo-400">{context.targetMarket || 'marché cible désigné'}</span> tout en respectant des contraintes budgétaires et de calendrier strictes.</>
                                : <>The user requires a solution to <span className="text-indigo-600 dark:text-indigo-400">{context.objective || 'achieve specific business goals'}</span>. The primary focus is on entering the <span className="text-indigo-600 dark:text-indigo-400">{context.targetMarket || 'designated target market'}</span> while adhering to strict budgetary and timeline constraints.</>
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 border-r border-slate-100 dark:border-slate-800">
                            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider flex items-center gap-2">
                                <TrendingUp size={16} className="text-emerald-500" />
                                {i18n.language.startsWith('fr') ? 'Stratégie recommandée' : 'Recommended Strategy'}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></span>
                                    <span className="text-slate-600 dark:text-slate-300">Phase 1: Validation MVP</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></span>
                                    <span className="text-slate-600 dark:text-slate-300">Phase 2: Market Testing</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8">
                            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider flex items-center gap-2">
                                <Shield size={16} className="text-amber-500" />
                                {i18n.language.startsWith('fr') ? 'Risques et compromis' : 'Risks & Trade-offs'}
                            </h3>
                            <ul className="space-y-3">
                                {context.risks?.map((risk, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <AlertTriangle size={14} className="text-amber-500 mt-1 shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">{risk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                        {i18n.language.startsWith('fr') ? 'Transférer à l\'AGENT' : 'Hand off to AGENT'} <ArrowRight size={18} />
                    </button>
                    <button className="flex-1 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                        <FileText size={18} /> {i18n.language.startsWith('fr') ? 'Enregistrer comme brief' : 'Save as Brief'}
                    </button>
                </div>

            </div>
        </div>
    );

    return (
        <div className="h-full w-full bg-slate-50 dark:bg-slate-950 flex flex-col">
            {step === 'INTENT' && renderIntentSelection()}
            {step === 'CONVERSATION' && renderChatInterface()}
            {step === 'SUMMARY' && renderDecisionSummary()}
        </div>
    );
};

export default AdvisorView;
