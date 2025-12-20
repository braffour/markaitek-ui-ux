import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useTranslation } from 'react-i18next';
import { COMPONENT_LIBRARY } from '../../constants';

interface LibrarySidebarProps {
    onDragStart: (event: React.DragEvent, component: any) => void;
}

export const LibrarySidebar: React.FC<LibrarySidebarProps> = ({ onDragStart }) => {
    const { t } = useTranslation();
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
        <div className="w-72 bg-brand-bg/95 backdrop-blur-2xl border-r border-brand-border-low flex flex-col z-10 shadow-[20px_0_40px_-15px_rgba(0,0,0,0.5)] h-full">
            {/* Header */}
            <div className="p-6 border-b border-brand-border-low bg-brand-surface-1/40">
                <div className="flex items-center gap-2.5 mb-5 px-1">
                    <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(45,212,191,0.6)]"></div>
                    <h2 className="text-[11px] font-bold text-brand-text-primary uppercase tracking-[0.25em]">
                        {t('editor.library')}
                    </h2>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted group-focus-within:text-brand-accent transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder={t('editor.searchWorkspace')}
                        className="w-full pl-10 pr-4 py-2.5 bg-brand-surface-2/40 border border-brand-border-low rounded-xl text-[12px] focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 outline-none transition-all placeholder-brand-text-muted/60 font-medium text-brand-text-primary shadow-inner"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {categories.map((cat) => {
                    const sectionTitle = `${cat}s`;
                    const isExpanded = expandedSections[sectionTitle];
                    const items = COMPONENT_LIBRARY.filter(c => c.type === cat.toLowerCase());

                    return (
                        <div key={cat} className="mb-4">
                            <button
                                onClick={() => toggleSection(sectionTitle)}
                                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.2em] hover:text-brand-accent transition-colors group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                                        <ChevronRight size={14} />
                                    </div>
                                    {t(`editor.${cat.toLowerCase()}s`)}
                                </div>
                                <span className="bg-brand-surface-2 text-[9px] px-2 py-0.5 rounded-full border border-brand-border-low group-hover:border-brand-accent/30 transition-colors">{items.length}</span>
                            </button>

                            {isExpanded && (
                                <div className="space-y-2 mt-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                    {items.map((comp) => (
                                        <div
                                            key={comp.id}
                                            draggable
                                            onDragStart={(event) => onDragStart(event, comp)}
                                            className="group relative flex items-center gap-4 p-3.5 rounded-2xl border border-brand-border-low bg-brand-surface-1/30 hover:bg-brand-surface-2 hover:border-brand-accent/40 hover:shadow-2xl hover:shadow-black/40 cursor-grab active:cursor-grabbing transition-all border-dashed hover:border-solid shadow-sm"
                                        >
                                            <div className="w-8 h-8 rounded-xl bg-brand-bg flex items-center justify-center text-brand-text-muted group-hover:text-brand-accent border border-brand-border-low group-hover:border-brand-accent/20 transition-all shadow-inner">
                                                <GripVertical size={14} className="opacity-40 group-hover:opacity-100" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-[12px] text-brand-text-primary truncate pr-2 tracking-tight group-hover:text-brand-accent transition-colors">
                                                        {comp.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-brand-text-muted opacity-60 font-medium">Standard Component</span>
                                                </div>
                                            </div>
                                            {comp.meta === 'Safe' && (
                                                <div className="absolute right-3 top-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" title={t('editor.safe')}></div>
                                                </div>
                                            )}
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
