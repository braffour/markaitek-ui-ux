import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Suggestion {
    id: string;
    text: string;
}

interface SuggestedFixCardProps {
    suggestions: Suggestion[];
    onApply?: (id: string) => void;
}

export const SuggestedFixCard: React.FC<SuggestedFixCardProps> = ({ suggestions, onApply }) => {
    const { t } = useTranslation();
    return (
        <div className="mx-6 mb-10 p-8 bg-brand-surface-2/40 backdrop-blur-xl border border-brand-border-low rounded-[32px] shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/5 flex items-center justify-center border border-brand-accent/10">
                    <Lightbulb className="text-brand-accent" size={20} />
                </div>
                <h3 className="text-xs font-extrabold text-brand-text-primary uppercase tracking-[0.3em] opacity-80">{t('execution.run.suggestedFixes')}</h3>
            </div>
            <div className="space-y-3">
                {suggestions.map((fix) => (
                    <button
                        key={fix.id}
                        onClick={() => onApply?.(fix.id)}
                        className="w-full flex items-center justify-between p-4 bg-brand-surface-3/30 hover:bg-brand-surface-3/60 border border-brand-border-low rounded-2xl text-left transition-all group/item hover:border-brand-accent/30 hover:shadow-lg active:scale-[0.98]"
                    >
                        <span className="text-[13px] text-brand-text-secondary font-bold group-hover/item:text-brand-text-primary transition-colors tracking-tight">{fix.text}</span>
                        <ArrowRight size={16} className="text-brand-text-muted group-hover/item:text-brand-accent transform group-hover/item:translate-x-1 transition-all" />
                    </button>
                ))}
            </div>
        </div>
    );
};
