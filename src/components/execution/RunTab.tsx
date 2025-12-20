import React from 'react';
import { PlayCircle, Zap, CheckCircle2, AlertCircle, BarChart3, RotateCcw } from 'lucide-react';
import { StepTimelineItem, StepData } from './StepTimelineItem';
import { ErrorBanner } from './ErrorBanner';
import { SuggestedFixCard } from './SuggestedFixCard';
import { ExecutionStatus } from './StatusPill';
import { useTranslation } from 'react-i18next';

interface RunTabProps {
    status: ExecutionStatus;
    steps: StepData[];
    onRun: () => void;
    onReset: () => void;
    onDebug: () => void;
}

export const RunTab: React.FC<RunTabProps> = ({
    status,
    steps,
    onRun,
    onReset,
    onDebug
}) => {
    const { t, i18n } = useTranslation();
    // Idle State
    if (status === 'idle') {
        return (
            <div className="h-full flex flex-col items-center justify-center px-8 py-12 text-center">
                <div className="w-20 h-20 rounded-[32px] bg-brand-surface-2/40 border border-brand-border-low flex items-center justify-center mb-10 shadow-inner group">
                    <PlayCircle size={40} className="text-brand-text-muted transition-colors group-hover:text-brand-accent group-hover:scale-110 duration-300" />
                </div>
                <h3 className="text-xl font-bold text-brand-text-primary mb-3 tracking-tight">{t('execution.run.noRuns')}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed mb-10 max-w-sm mx-auto">
                    {t('execution.run.noRunsDesc')}
                </p>
                <div className="flex flex-col w-full gap-4 max-w-xs mx-auto">
                    <button
                        onClick={onRun}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-brand-accent hover:bg-brand-accent-hover text-[#0F1519] text-[13px] font-bold rounded-2xl transition-all shadow-2xl shadow-brand-accent/20 active:scale-95 uppercase tracking-widest"
                    >
                        <Zap size={20} fill="currentColor" />
                        {t('execution.run.runWorkflow')}
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 py-4 bg-brand-surface-1 border border-brand-border-low text-brand-text-secondary text-[13px] font-bold rounded-2xl hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest">
                        {t('execution.run.useSample')}
                    </button>
                </div>
                <p className="mt-12 text-[10px] text-brand-text-muted font-bold italic uppercase tracking-[0.2em] opacity-40">
                    {t('execution.run.hint')}
                </p>
            </div>
        );
    }

    const failedStep = steps.find(s => s.status === 'failed');

    return (
        <div className="pb-12">
            {/* Header Status Card */}
            <div className="px-6 mb-10">
                {status === 'running' && (
                    <div className="p-8 bg-brand-accent/5 backdrop-blur-xl border border-brand-accent/20 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(45,212,191,0.2)]">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-extrabold text-brand-accent uppercase tracking-[0.3em]">{t('execution.run.nowRunning')}</span>
                            <span className="text-[10px] font-extrabold text-brand-accent/40 uppercase tracking-[0.2em]">{t('execution.run.stepCount', { current: 3, total: steps.length })}</span>
                        </div>
                        <div className="h-2 w-full bg-brand-bg/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
                            <div className="h-full bg-brand-accent rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(45,212,191,0.6)]" style={{ width: '60%' }} />
                        </div>
                        <div className="mt-8 flex items-center gap-5">
                            <div className="flex-1 min-w-0">
                                <p className="text-[15px] font-extrabold text-brand-text-primary tracking-tight">Data Enrichment</p>
                                <p className="text-[12px] text-brand-text-muted font-bold uppercase tracking-wider mt-1 opacity-60">Fetching contact details...</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shadow-lg">
                                <RotateCcw size={20} className="text-brand-accent animate-spin" />
                            </div>
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="p-10 bg-emerald-400/5 backdrop-blur-xl border border-emerald-400/20 rounded-[32px] text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-emerald-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="w-16 h-16 rounded-[24px] bg-emerald-400 flex items-center justify-center text-[#0F1519] mx-auto mb-8 shadow-[0_0_32px_rgba(52,211,153,0.4)] relative z-10 transition-transform group-hover:scale-110 duration-500">
                            <CheckCircle2 size={36} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-brand-text-primary mb-3 tracking-tight relative z-10">{t('execution.run.completed')}</h3>
                        <p className="text-sm text-brand-text-muted mb-10 font-bold uppercase tracking-widest opacity-60 relative z-10">{t('execution.run.summary', { duration: '1.4s', count: 5, total: 5 })}</p>
                        <div className="flex items-center gap-4 relative z-10">
                            <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-brand-accent hover:bg-brand-accent-hover text-[#0F1519] text-[11px] font-extrabold rounded-2xl transition-all uppercase tracking-[0.2em] active:scale-95 shadow-xl shadow-brand-accent/20">
                                <BarChart3 size={18} />
                                {t('execution.run.viewInsights')}
                            </button>
                            <button
                                onClick={onRun}
                                className="flex-1 flex items-center justify-center gap-3 py-4 bg-brand-surface-1 border border-brand-border-low text-brand-text-primary text-[11px] font-extrabold rounded-2xl hover:bg-white/5 transition-all uppercase tracking-[0.2em] active:scale-95 shadow-lg"
                            >
                                <RotateCcw size={18} />
                                {t('execution.run.runAgain')}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Error States */}
            {status === 'failed' && failedStep && (
                <>
                    <ErrorBanner
                        error={{
                            stepName: failedStep.name,
                            message: i18n.language.startsWith('fr') ? "Délai de connexion dépassé lors de l'appel à l'API Enrichment." : "Connection timeout while calling Enrichment API.",
                            code: "ERR_TIMEOUT",
                            details: i18n.language.startsWith('fr') ? "La ressource à 'https://api.enrichment.cloud' n'a pas répondu dans les 5000ms. Réessayer avec un délai plus long pourrait aider." : "The resource at 'https://api.enrichment.cloud' failed to respond within 5000ms. Retrying with longer timeout might help."
                        }}
                        onRetry={onRun}
                        onDebug={onDebug}
                    />
                    <SuggestedFixCard
                        suggestions={[
                            { id: '1', text: "Check required fields in 'Trigger' output" },
                            { id: '2', text: "Increase timeout to 30s" },
                            { id: '3', text: "Verify API Key in Settings" }
                        ]}
                    />
                </>
            )}

            {/* Step Timeline */}
            <div className="relative">
                <div className="px-6 mb-6 flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em]">{t('execution.run.timeline')}</h4>
                    <span className="text-[9px] font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-lg uppercase tracking-widest">{t('execution.run.steps', { count: steps.length })}</span>
                </div>
                {steps.map((step, index) => (
                    <StepTimelineItem
                        key={step.id}
                        step={step}
                        isLast={index === steps.length - 1}
                        isActive={step.status === 'running' || step.status === 'failed'}
                    />
                ))}
            </div>
        </div>
    );
};
