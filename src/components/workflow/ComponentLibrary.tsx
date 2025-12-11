import React from 'react';
import { Layers } from 'lucide-react';
import Badge from '../ui/Badge';
import { ComponentDefinition } from '../../types/workflow';

interface ComponentLibraryProps {
  components: ComponentDefinition[];
  onDragStart: (event: React.DragEvent, component: ComponentDefinition) => void;
}

const COMPONENT_CATEGORIES = ['Trigger', 'Action', 'Connector'] as const;

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ components, onDragStart }) => {
  return (
    <div className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-sm">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm uppercase tracking-wide">
          <Layers size={16} /> Library
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {COMPONENT_CATEGORIES.map((category) => (
          <div key={category}>
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 px-1">
              {category}s
            </h4>
            <div className="space-y-2">
              {components
                .filter((c) => c.type === category.toLowerCase())
                .map((comp) => (
                  <div
                    key={comp.id}
                    draggable
                    onDragStart={(event) => onDragStart(event, comp)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-sm cursor-move hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm text-slate-700 dark:text-slate-200">
                        {comp.label}
                      </span>
                      <Badge type={comp.meta === 'Safe' ? 'success' : 'neutral'}>
                        {comp.meta}
                      </Badge>
                    </div>
                    <div className="text-[10px] text-slate-400">v2.1.0 • Certified</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;



