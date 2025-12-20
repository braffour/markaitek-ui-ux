import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface Suggestion {
    id: string;
    text: string;
}

interface SuggestedFixCardProps {
    suggestions: Suggestion[];
    onApply?: (id: string) => void;
}

export const SuggestedFixCard: React.FC<SuggestedFixCardProps> = ({ suggestions, onApply }) => {
    return (
        <div className="mx-6 mb-6 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-widest">
                    Suggested Fixes
                </h4>
            </div>

            <div className="space-y-2">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        onClick={() => onApply?.(suggestion.id)}
                        className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-slate-900/50 border border-indigo-100/50 dark:border-indigo-900/50 rounded-lg text-left group hover:border-indigo-500 transition-all"
                    >
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {suggestion.text}
                        </span>
                        <ArrowRight size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
};
