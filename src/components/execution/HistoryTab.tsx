import React, { useState } from 'react';
import {
    Clock,
    CheckCircle2,
    XCircle,
    Play,
    Search,
    Filter,
    ArrowRight,
    Calendar,
    ChevronRight,
    RotateCcw,
    History as HistoryIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RunHistoryItem {
    id: string;
    name: string;
    timestamp: string;
    duration: string;
    status: 'success' | 'failed' | 'running';
    steps: number;
}

export const HistoryTab: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');

    const runs: RunHistoryItem[] = [
        { id: '12', name: 'Order Processing', timestamp: '22 Dec, 14:30', duration: '1.4s', status: 'failed', steps: 12 },
        { id: '11', name: 'User Onboarding', timestamp: '21 Dec, 10:15', duration: '5.2s', status: 'success', steps: 8 },
        { id: '10', name: 'Inventory Sync', timestamp: '20 Dec, 09:45', duration: '2.8s', status: 'success', steps: 5 },
        { id: '09', name: 'Lead Extraction', timestamp: '19 Dec, 16:20', duration: '12s', status: 'success', steps: 15 },
        { id: '08', name: 'Daily Cleanup', timestamp: '18 Dec, 00:05', duration: '45s', status: 'failed', steps: 3 },
    ];

    const filteredRuns = runs.filter(run => {
        if (filter === 'all') return true;
        return run.status === filter;
    });

    const statusIcons = {
        success: <CheckCircle2 size={14} className="text-emerald-500" />,
        failed: <XCircle size={14} className="text-rose-500" />,
        running: <RotateCcw size={14} className="text-indigo-500 animate-spin" />,
    };

    return (
        <div className="animate-in h-auto">
            {/* Search & Filter */}
            <div className="px-6 mb-8 space-y-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted group-focus-within:text-brand-accent transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder={t('execution.history.search')}
                        className="w-full pl-11 pr-4 py-3 bg-brand-surface-2/60 backdrop-blur-md border border-brand-border-low rounded-2xl text-sm focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 outline-none transition-all placeholder-brand-text-muted/60 text-brand-text-primary"
                    />
                </div>

                <div className="flex gap-2.5 overflow-x-auto custom-scrollbar pb-1">
                    {(['all', 'success', 'failed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all border shrink-0 ${filter === f ? 'bg-brand-accent border-brand-accent text-[#0F1519] shadow-xl shadow-brand-accent/20' : 'bg-brand-surface-1 border-brand-border-low text-brand-text-muted hover:border-brand-border-base hover:text-brand-text-primary'}`}
                        >
                            {t(`execution.history.filter${f.charAt(0).toUpperCase() + f.slice(1)}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Run List */}
            <div className="space-y-3 px-4 mb-10">
                {filteredRuns.map((run) => (
                    <button
                        key={run.id}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-brand-surface-1/30 border border-brand-border-low hover:bg-brand-surface-1 hover:border-brand-border-base transition-all text-left group shadow-sm hover:shadow-2xl hover:shadow-black/40"
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#0F1519] shadow-xl ${run.status === 'success' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                            {statusIcons[run.status]}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-bold text-brand-text-primary truncate tracking-wide">{run.name}</span>
                                <span className="text-[10px] font-bold text-brand-text-muted group-hover:text-brand-accent transition-colors font-mono tracking-tighter">#{run.id}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-[10px] text-brand-text-muted font-bold tracking-widest uppercase">
                                <span className="flex items-center gap-2"><Calendar size={12} className="text-brand-accent/60" /> {run.timestamp}</span>
                                <span className="flex items-center gap-2"><Clock size={12} className="text-brand-accent/60" /> {run.duration}</span>
                            </div>
                        </div>

                        <ChevronRight size={18} className="text-brand-text-muted group-hover:text-brand-accent transition-all group-hover:translate-x-1" />
                    </button>
                ))}

                {filteredRuns.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-brand-surface-1 rounded-[24px] flex items-center justify-center mx-auto mb-6 border border-brand-border-low">
                            <HistoryIcon size={32} className="text-brand-text-muted opacity-20" />
                        </div>
                        <p className="text-sm font-bold text-brand-text-muted tracking-tight">{t('execution.history.empty', { filter: filter !== 'all' ? t(`execution.history.filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`).toLowerCase() : '' })}</p>
                        <p className="text-xs text-brand-text-muted/60 mt-1 uppercase tracking-widest font-medium">Try changing your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};
