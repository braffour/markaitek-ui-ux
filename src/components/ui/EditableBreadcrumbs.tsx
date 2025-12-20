import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-surface-1/40 backdrop-blur-md rounded-2xl border border-brand-border-low hover:border-brand-border-base transition-all group">
            <span className="text-sm font-bold text-brand-text-muted">{t('shell.workflows')}</span>
            <span className="text-brand-border-high">/</span>

            {isEditing === 'workflow' ? (
                <input
                    ref={inputRef}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="bg-brand-surface-2 px-2.5 py-1 rounded-lg border border-brand-accent outline-none text-sm font-bold text-brand-text-primary min-w-[160px]"
                />
            ) : (
                <div
                    onClick={() => handleStartEdit('workflow', workflow)}
                    className="relative flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2.5 py-1 rounded-xl transition-all"
                >
                    <span className="text-sm font-bold text-brand-text-primary">{workflow}</span>
                    <Pencil size={12} className="opacity-0 group-hover:opacity-40 text-brand-text-muted" />
                </div>
            )}

            <div className="flex items-center gap-2.5 ml-2">
                <span className="text-[11px] font-mono font-bold text-brand-text-muted uppercase tracking-tight">{version}</span>
                {isDraft && (
                    <span className="text-[10px] bg-brand-accent/10 text-brand-accent px-2.5 py-0.5 rounded-lg font-bold tracking-wider border border-brand-accent/20">
                        {t('shell.draft')}
                    </span>
                )}
            </div>
        </div>
    );
};
