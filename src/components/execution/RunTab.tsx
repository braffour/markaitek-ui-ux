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
                <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-6 ring-1 ring-slate-100 dark:ring-slate-800">
                    <PlayCircle size={32} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 mb-2">{t('execution.run.noRuns')}</h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                    {t('execution.run.noRunsDesc')}
                </p>
                <div className="flex flex-col w-full gap-3">
                    <button
                        onClick={onRun}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/10"
                    >
                        <Zap size={18} fill="currentColor" />
                        {t('execution.run.runWorkflow')}
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-all">
                        {t('execution.run.useSample')}
                    </button>
                </div>
                <p className="mt-8 text-[11px] text-slate-400 font-medium italic">
                    {t('execution.run.hint')}
                </p>
            </div>
        );
    }

    const failedStep = steps.find(s => s.status === 'failed');

    return (
        <div className="pb-12">
            {/* Header Status Card */}
            <div className="px-6 mb-8">
                {status === 'running' && (
                    <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-widest">{t('execution.run.nowRunning')}</span>
                            <span className="text-[11px] font-bold text-indigo-500">{t('execution.run.stepCount', { current: 3, total: steps.length })}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: '60%' }} />
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate">Data Enrichment</p>
                                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Fetching additional contact details...</p>
                            </div>
                            <RotateCcw size={16} className="text-slate-400 animate-spin" />
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 mb-1">{t('execution.run.completed')}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">{t('execution.run.summary', { duration: '1.4s', count: 5, total: 5 })}</p>
                        <div className="flex items-center gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-all">
                                <BarChart3 size={14} />
                                {t('execution.run.viewInsights')}
                            </button>
                            <button
                                onClick={onRun}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
                            >
                                <RotateCcw size={14} />
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
                <div className="px-6 mb-4 flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('execution.run.timeline')}</h4>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">{t('execution.run.steps', { count: steps.length })}</span>
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
