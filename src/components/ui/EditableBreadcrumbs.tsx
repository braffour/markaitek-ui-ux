import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface EditableBreadcrumbsProps {
    workspace: string;
    workflow: string;
    version: string;
    isDraft?: boolean;
    onWorkspaceChange?: (val: string) => void;
    onWorkflowChange?: (val: string) => void;
}

export const EditableBreadcrumbs: React.FC<EditableBreadcrumbsProps> = ({
    workspace,
    workflow,
    version,
    isDraft = true,
    onWorkspaceChange,
    onWorkflowChange
}) => {
    const [isEditing, setIsEditing] = useState<'workspace' | 'workflow' | null>(null);
    const [tempValue, setTempValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleStartEdit = (field: 'workspace' | 'workflow', value: string) => {
        setIsEditing(field);
        setTempValue(value);
    };

    const handleSave = () => {
        if (isEditing === 'workspace' && onWorkspaceChange) onWorkspaceChange(tempValue);
        if (isEditing === 'workflow' && onWorkflowChange) onWorkflowChange(tempValue);
        setIsEditing(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') setIsEditing(null);
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Workflows</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>

            {/* Workspace (Optional in breadcrumbs, but adhering to request) */}
            {/* For now keeping standard format: Workflows / [Name] */}

            {isEditing === 'workflow' ? (
                <input
                    ref={inputRef}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-indigo-500 outline-none text-sm font-bold text-slate-800 dark:text-slate-200 min-w-[150px]"
                />
            ) : (
                <div
                    onClick={() => handleStartEdit('workflow', workflow)}
                    className="relative flex items-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-0.5 rounded transition-colors"
                >
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{workflow}</span>
                    <Pencil size={12} className="opacity-0 group-hover:opacity-50 text-slate-400" />
                </div>
            )}

            <div className="flex items-center gap-2 ml-2">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{version}</span>
                {isDraft && (
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold tracking-wide border border-indigo-200 dark:border-indigo-800">
                        Draft
                    </span>
                )}
            </div>
        </div>
    );
};
