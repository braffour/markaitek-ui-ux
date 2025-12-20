import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    PanelRightClose,
    PanelRightOpen,
    Pin,
    X,
    Maximize2,
    Minimize2,
    Trash2
} from 'lucide-react';
import { StatusPill, ExecutionStatus } from './StatusPill';
import { useTranslation } from 'react-i18next';

interface ExecutionPanelShellProps {
    children: React.ReactNode;
    status: ExecutionStatus;
    onClear?: () => void;
}

export const ExecutionPanelShell: React.FC<ExecutionPanelShellProps> = ({
    children,
    status,
    onClear
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(true);
    const [width, setWidth] = useState(380);
    const [isResizing, setIsResizing] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

    // Handle resizing
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const newWidth = window.innerWidth - e.clientX;
            if (newWidth > 320 && newWidth < 800) {
                setWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const togglePanel = () => setIsOpen(!isOpen);

    if (!isOpen) {
        return (
            <div className="fixed right-0 top-24 bottom-24 flex items-center z-40 pointer-events-none">
                <button
                    onClick={togglePanel}
                    className="pointer-events-auto flex flex-col items-center gap-6 bg-brand-surface-1/60 backdrop-blur-xl border border-brand-border-low border-r-0 rounded-l-2xl py-8 px-2.5 shadow-2xl hover:bg-brand-surface-1 transition-all group relative overflow-hidden"
                >
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10">
                        <PanelRightOpen size={22} className="text-brand-text-muted group-hover:text-brand-accent transition-colors" />
                        {status !== 'idle' && (
                            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0F1519] ${status === 'running' ? 'bg-brand-accent animate-pulse-soft' :
                                status === 'failed' ? 'bg-red-500' :
                                    status === 'success' ? 'bg-emerald-500' : 'bg-brand-warning'
                                }`} />
                        )}
                    </div>
                    <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text-muted group-hover:text-brand-text-primary transition-colors z-10">
                        {t('execution.title')}
                    </span>
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Overlay for mobile bottom sheet (logic handled by CSS classes) */}
            <div
                className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={togglePanel}
            />

            <aside
                className={`
                    fixed md:relative right-0 bottom-0 top-0 z-50
                    bg-brand-surface-1/80 backdrop-blur-xl border-l border-brand-border-low
                    shadow-[-32px_0_64px_-12px_rgba(0,0,0,0.5)]
                    flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                    w-full md:w-auto h-[90vh] md:h-full mt-auto md:mt-0
                    rounded-t-[32px] md:rounded-none
                    ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}
                `}
                style={{ width: window.innerWidth > 768 ? `${width}px` : '100%' }}
            >
                {/* Resize Handle */}
                <div
                    className="hidden md:block absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-brand-accent/30 transition-colors z-50"
                    onMouseDown={() => setIsResizing(true)}
                />

                {/* Panel Header */}
                <div className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-brand-border-low bg-brand-surface-1/40 backdrop-blur-md sticky top-0 z-10 transition-colors">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-bold text-brand-text-primary tracking-wide">{t('execution.title')}</h2>
                        <StatusPill status={status} />
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={onClear}
                            className="p-2 text-brand-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                            title={t('execution.tooltips.clear')}
                        >
                            <Trash2 size={16} />
                        </button>
                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className={`p-2 rounded-xl transition-all ${isPinned ? 'text-brand-accent bg-brand-accent/10 border border-brand-accent/20' : 'text-brand-text-muted hover:bg-white/5'}`}
                            title={isPinned ? t('execution.tooltips.unpin') : t('execution.tooltips.pin')}
                        >
                            <Pin size={16} className={isPinned ? 'fill-current' : ''} />
                        </button>
                        <button
                            onClick={togglePanel}
                            className="p-2 text-brand-text-muted hover:text-brand-text-primary hover:bg-white/5 rounded-xl transition-all"
                        >
                            <PanelRightClose size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Footer (Metadata) */}
                <div className="h-12 shrink-0 flex items-center justify-between px-6 border-t border-brand-border-low bg-brand-surface-3/50 backdrop-blur-md text-[10px] text-brand-text-muted font-bold tracking-wider">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <span className="opacity-50 uppercase">{t('execution.lastRunLabel') || 'Last Run'}:</span>
                            <span className="text-brand-text-secondary">{t('execution.lastRun', { time: '2m ago' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="opacity-50 uppercase">{t('execution.durationLabel') || 'Duration'}:</span>
                            <span className="text-brand-text-secondary">{t('execution.duration', { value: '1.4s' })}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg border border-brand-border-low bg-brand-surface-1 text-[9px] font-bold text-brand-accent/80 tracking-[0.1em]">DRAFT</span>
                    </div>
                </div>
            </aside>
        </>
    );
};
