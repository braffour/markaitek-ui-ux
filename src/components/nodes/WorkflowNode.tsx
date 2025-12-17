import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap, Cpu, Database, Server } from 'lucide-react';

import { Badge } from '../ui/Badge';

const getIconForType = (type: string) => {
  switch (type) {
    case 'trigger':
      return Zap;
    case 'action':
      return Cpu;
    case 'connector':
      return Database;
    default:
      return Server;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case 'trigger':
      return {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-300',
      };
    case 'action':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-300',
      };
    case 'connector':
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-300',
      };
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-600 dark:text-slate-300',
      };
  }
};

interface WorkflowNodeProps {
  data: {
    label: string;
    type: string;
    description?: string;
    meta?: string;
  };
  selected: boolean;
}

const WorkflowNode = ({ data, selected }: WorkflowNodeProps) => {
  const Icon = getIconForType(data.type);
  const colors = getColorForType(data.type);
  const showSourceHandle = data.type === 'trigger' || data.type === 'action';
  const showTargetHandle = data.type === 'action' || data.type === 'connector';

  return (
    <div
      className={`w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border p-4 cursor-pointer transition relative ${selected
        ? 'border-indigo-500 ring-2 ring-indigo-500/20'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
    >
      {/* Target Handle (left) */}
      {showTargetHandle && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-slate-300 dark:!bg-slate-600 border-2 border-white dark:border-slate-900"
          style={{ left: -6 }}
        />
      )}

      {/* Node Content */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`${colors.bg} p-1.5 rounded ${colors.text}`}>
          <Icon size={16} />
        </div>
        <span className="font-bold text-sm text-slate-700 dark:text-slate-200 truncate">
          {data.label}
        </span>
      </div>

      {data.description && (
        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{data.description}</div>
      )}

      {data.meta && (
        <div className="mt-2">
          <Badge type={data.meta === 'Safe' ? 'success' : 'neutral'}>
            {data.meta}
          </Badge>
        </div>
      )}

      {/* Source Handle (right) */}
      {showSourceHandle && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-slate-300 dark:!bg-slate-600 border-2 border-white dark:border-slate-900"
          style={{ right: -6 }}
        />
      )}
    </div>
  );
};

export default WorkflowNode;

