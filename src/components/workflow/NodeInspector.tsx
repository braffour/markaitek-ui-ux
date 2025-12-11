import React from 'react';
import { Settings, Layers, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { WorkflowNode } from '../../types/workflow';

interface NodeInspectorProps {
  selectedNode: WorkflowNode | null;
  onUpdateNode: (nodeId: string, field: string, value: unknown) => void;
  onDeleteNode: () => void;
}

const NodeInspector: React.FC<NodeInspectorProps> = ({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
}) => {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide">
            Inspector
          </h3>
          <Settings size={16} className="text-slate-400" />
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-slate-400 dark:text-slate-600">
            <Layers size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a node to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-sm">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide">
          Inspector
        </h3>
        <Settings size={16} className="text-slate-400" />
      </div>

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* Delete hint and button */}
        <div className="flex items-center justify-between gap-2 text-xs bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <kbd className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-[10px] font-mono">
              Delete
            </kbd>
            <span>to remove</span>
          </div>
          <button
            onClick={onDeleteNode}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-900/50 rounded-lg text-xs font-medium transition"
          >
            <Trash2 size={14} />
            Delete Node
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Node Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label || ''}
            onChange={(e) => onUpdateNode(selectedNode.id, 'label', e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Description
          </label>
          <input
            type="text"
            value={selectedNode.data.description || ''}
            onChange={(e) => onUpdateNode(selectedNode.id, 'description', e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Node Type
          </label>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
            {selectedNode.data.type || 'N/A'}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Data Schema Map
          </label>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-3 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>source_id</span> <ArrowRight size={10} /> <span>id</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>cust_email</span> <ArrowRight size={10} /> <span>email</span>
            </div>
          </div>
          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium mt-1">
            + Add Mapping
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Error Handling
          </label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900">
            <option>Stop Workflow</option>
            <option>Retry (3x)</option>
            <option>Ignore & Continue</option>
            <option>Route to DLQ</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Deploy Target
          </label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900">
            <option>Production</option>
            <option>Staging</option>
          </select>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="flex items-center justify-between gap-2 p-3 border rounded-lg border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
              Policy Audit Checked
            </span>
            <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase">
            Owner
          </label>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
              JD
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300">John Doe (DevOps)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeInspector;



