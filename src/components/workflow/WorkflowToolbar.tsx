import React from 'react';
import { GitBranch } from 'lucide-react';

interface WorkflowToolbarProps {
  onLayout: () => void;
  workflowName?: string;
  version?: string;
  lastSaved?: string;
}

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  onLayout,
  workflowName = 'Order Processing',
  version = 'v4.2 (Draft)',
  lastSaved = '10:42 AM',
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
      <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full shadow-sm pointer-events-auto">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Workflows</span>
        <span className="text-slate-400">/</span>
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{workflowName}</span>
        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded ml-2">
          {version}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onLayout}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg shadow-sm pointer-events-auto text-xs text-slate-700 dark:text-slate-300 font-medium hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-2"
        >
          <GitBranch size={14} />
          Auto Layout
        </button>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full shadow-sm pointer-events-auto text-xs text-slate-500 dark:text-slate-400 font-mono">
          Last Saved: {lastSaved}
        </div>
      </div>
    </div>
  );
};

export default WorkflowToolbar;



