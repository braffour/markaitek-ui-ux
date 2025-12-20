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
                    className="pointer-events-auto flex flex-col items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-r-0 rounded-l-2xl py-6 px-2 shadow-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                >
                    <div className="relative">
                        <PanelRightOpen size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        {status !== 'idle' && (
                            <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${status === 'running' ? 'bg-indigo-500' :
                                status === 'failed' ? 'bg-rose-500' :
                                    status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`} />
                        )}
                    </div>
                    <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
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
                    bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800
                    shadow-[-20px_0_50px_-12px_rgba(0,0,0,0.05)]
                    flex flex-col transition-transform duration-300 ease-in-out
                    w-full md:w-auto h-[90vh] md:h-full mt-auto md:mt-0
                    rounded-t-3xl md:rounded-none
                    ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}
                `}
                style={{ width: window.innerWidth > 768 ? `${width}px` : '100%' }}
            >
                {/* Resize Handle */}
                <div
                    className="hidden md:block absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-500/30 transition-colors z-50"
                    onMouseDown={() => setIsResizing(true)}
                />

                {/* Panel Header */}
                <div className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">{t('execution.title')}</h2>
                        <StatusPill status={status} />
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={onClear}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-all"
                            title={t('execution.tooltips.clear')}
                        >
                            <Trash2 size={16} />
                        </button>
                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className={`p-1.5 rounded-md transition-all ${isPinned ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            title={isPinned ? t('execution.tooltips.unpin') : t('execution.tooltips.pin')}
                        >
                            <Pin size={16} className={isPinned ? 'fill-current' : ''} />
                        </button>
                        <button
                            onClick={togglePanel}
                            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-all"
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
                <div className="h-12 shrink-0 flex items-center justify-between px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-sm text-[10px] text-slate-400 font-medium">
                    <div className="flex items-center gap-4">
                        <span>{t('execution.lastRun', { time: '2m ago' })}</span>
                        <span>{t('execution.duration', { value: '1.4s' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[9px]">DRAFT</span>
                    </div>
                </div>
            </aside>
        </>
    );
};
