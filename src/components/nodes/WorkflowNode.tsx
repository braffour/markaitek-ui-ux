import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Zap, Cpu, Database, Server } from 'lucide-react';
import Badge from '../ui/Badge';
import { WorkflowNodeData, NodeType } from '../../types/workflow';

interface TypeColors {
  bg: string;
  text: string;
}

const getIconForType = (type: NodeType) => {
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

const getColorForType = (type: NodeType): TypeColors => {
  switch (type) {
    case 'trigger':
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
      };
    case 'action':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
      };
    case 'connector':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-600',
      };
    default:
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
      };
  }
};

interface WorkflowNodeProps extends NodeProps {
  data: WorkflowNodeData;
  selected?: boolean;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ data, selected = false }) => {
  const Icon = getIconForType(data.type);
  const colors = getColorForType(data.type);
  const showSourceHandle = data.type === 'trigger' || data.type === 'action';
  const showTargetHandle = data.type === 'action' || data.type === 'connector';

  return (
    <div
      className={`w-48 bg-white rounded-xl shadow-lg border-2 p-4 cursor-pointer transition relative ${
        selected
          ? 'border-indigo-500 ring-4 ring-indigo-500/10'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Target Handle (left) */}
      {showTargetHandle && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-slate-300 border-2 border-white"
          style={{ left: -6 }}
        />
      )}

      {/* Node Content */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`${colors.bg} p-1.5 rounded ${colors.text}`}>
          <Icon size={16} />
        </div>
        <span className="font-bold text-sm text-slate-700 truncate">
          {data.label}
        </span>
      </div>
      
      {data.description && (
        <div className="text-xs text-slate-500 truncate">{data.description}</div>
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
          className="w-3 h-3 !bg-slate-300 border-2 border-white"
          style={{ right: -6 }}
        />
      )}
    </div>
  );
};

export default WorkflowNode;

