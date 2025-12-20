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

interface RunHistoryItem {
    id: string;
    name: string;
    timestamp: string;
    duration: string;
    status: 'success' | 'failed' | 'running';
    steps: number;
}

export const HistoryTab: React.FC = () => {
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
            <div className="px-6 mb-4 space-y-3">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={12} />
                    <input
                        type="text"
                        placeholder="Search runs..."
                        className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-[11px] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-slate-400"
                    />
                </div>

                <div className="flex gap-2">
                    {(['all', 'success', 'failed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${filter === f ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-400'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Run List */}
            <div className="space-y-1 px-4">
                {filteredRuns.map((run) => (
                    <button
                        key={run.id}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm ${run.status === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/20' : 'bg-rose-50 dark:bg-rose-950/20'}`}>
                            {statusIcons[run.status]}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[12px] font-bold text-slate-900 dark:text-slate-100 truncate">{run.name}</span>
                                <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">#{run.id}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-0.5 text-[10px] text-slate-400">
                                <span className="flex items-center gap-1 font-medium"><Calendar size={10} /> {run.timestamp}</span>
                                <span className="flex items-center gap-1 font-medium"><Clock size={10} /> {run.duration}</span>
                            </div>
                        </div>

                        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </button>
                ))}

                {filteredRuns.length === 0 && (
                    <div className="py-12 text-center text-slate-400">
                        <HistoryIcon size={24} className="mx-auto mb-3 opacity-20" />
                        <p className="text-[11px] font-medium">No {filter !== 'all' ? filter : ''} runs found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
