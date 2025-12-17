import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { COMPONENT_LIBRARY } from '../../constants';

interface LibrarySidebarProps {
    onDragStart: (event: React.DragEvent, component: any) => void;
}

export const LibrarySidebar: React.FC<LibrarySidebarProps> = ({ onDragStart }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        'Triggers': true,
        'Actions': true,
        'Connectors': false
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const categories = ['Trigger', 'Action', 'Connector'];

    return (
        <div className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800 flex flex-col z-10 shadow-sm h-full">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Library
                </h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search workspace..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-slate-400 font-medium text-slate-600 dark:text-slate-300"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                {categories.map((cat) => {
                    const sectionTitle = `${cat}s`;
                    const isExpanded = expandedSections[sectionTitle];
                    const items = COMPONENT_LIBRARY.filter(c => c.type === cat.toLowerCase());

                    return (
                        <div key={cat} className="mb-2">
                            <button
                                onClick={() => toggleSection(sectionTitle)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                {sectionTitle}
                            </button>

                            {isExpanded && (
                                <div className="space-y-1 mt-1 pl-2">
                                    {items.map((comp) => (
                                        <div
                                            key={comp.id}
                                            draggable
                                            onDragStart={(event) => onDragStart(event, comp)}
                                            className="group relative flex items-center gap-3 p-2.5 rounded-lg border border-transparent hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all"
                                        >
                                            <div className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-400">
                                                <GripVertical size={14} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <span className="font-semibold text-xs text-slate-700 dark:text-slate-200 truncate pr-2">
                                                        {comp.label}
                                                    </span>
                                                    {comp.meta === 'Safe' && (
                                                        <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100">Safe</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-slate-400 truncate">v2.1.0 • Certified</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
