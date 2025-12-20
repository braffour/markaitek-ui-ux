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
        bg: 'bg-brand-accent/10',
        text: 'text-brand-accent',
        border: 'border-brand-accent/20',
        shadow: 'shadow-brand-accent/10'
      };
    case 'action':
      return {
        bg: 'bg-red-400/10',
        text: 'text-red-400',
        border: 'border-red-400/20',
        shadow: 'shadow-red-400/10'
      };
    case 'connector':
      return {
        bg: 'bg-purple-400/10',
        text: 'text-purple-400',
        border: 'border-purple-400/20',
        shadow: 'shadow-purple-400/10'
      };
    default:
      return {
        bg: 'bg-brand-surface-2',
        text: 'text-brand-text-muted',
        border: 'border-brand-border-low',
        shadow: 'shadow-black/20'
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
      className={`w-64 bg-brand-surface-1/80 backdrop-blur-3xl rounded-[28px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] border transition-all duration-500 relative group overflow-hidden ${selected
        ? 'border-brand-accent shadow-brand-accent/20 ring-8 ring-brand-accent/5 scale-[1.02]'
        : 'border-brand-border-low hover:border-brand-border-base hover:shadow-black/60 hover:scale-[1.01]'
        }`}
    >
      {/* Background Glow */}
      <div className={`absolute -inset-0.5 rounded-[30px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${selected ? 'opacity-40 bg-brand-accent/20' : 'bg-white/[0.03]'}`} />

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 p-5">
        {/* Target Handle (left) */}
        {showTargetHandle && (
          <Handle
            type="target"
            position={Position.Left}
            className="w-3 h-3 !bg-brand-accent !border-2 !border-brand-bg shadow-xl"
            style={{ left: -7 }}
          />
        )}

        {/* Node Content */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`${colors.bg} ${colors.border} border p-3 rounded-2xl ${colors.text} shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6`}>
            <Icon size={20} className="filter drop-shadow-[0_0_8px_currentColor]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-brand-text-primary truncate tracking-wide">
              {data.label}
            </h3>
            <span className="text-[9px] font-bold text-brand-text-muted uppercase tracking-[0.2em] opacity-60">
              {data.type}
            </span>
          </div>
        </div>

        {data.description && (
          <p className="text-[11px] text-brand-text-secondary leading-relaxed line-clamp-2 min-h-[2.4em] px-0.5">
            {data.description}
          </p>
        )}

        {data.meta && (
          <div className="mt-4 pt-4 border-t border-brand-border-low flex items-center justify-between">
            <Badge type={data.meta === 'Safe' ? 'success' : 'neutral'}>
              {data.meta}
            </Badge>
            <span className="text-[9px] font-mono text-brand-text-muted opacity-40">v1.2.0</span>
          </div>
        )}

        {/* Source Handle (right) */}
        {showSourceHandle && (
          <Handle
            type="source"
            position={Position.Right}
            className="w-3 h-3 !bg-brand-accent !border-2 !border-brand-bg shadow-xl"
            style={{ right: -7 }}
          />
        )}
      </div>
    </div>
  );
};

export default WorkflowNode;

