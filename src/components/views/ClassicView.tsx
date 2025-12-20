import React, { useState, useRef, useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    addEdge,
    useReactFlow,
    BackgroundVariant,
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange,
    Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
    Settings,
    CheckCircle,
    ArrowRight,
    GitBranch,
    Trash2,
    Layers,
    Search,
    Plus
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import WorkflowNode from '../nodes/WorkflowNode';
import { LibrarySidebar } from '../layout/LibrarySidebar';
import { getLayoutedElements } from '../../utils/layoutUtils';
import { findAutoConnectCandidates } from '../../utils/connectionUtils';

// Node types mapping for ReactFlow
const nodeTypes = {
    workflow: WorkflowNode,
};

let nodeId = 4;
const getId = () => `node-${nodeId++}`;

interface ClassicViewProps {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    onNodesChange: OnNodesChange;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onEdgesChange: OnEdgesChange;
}

const ClassicView: React.FC<ClassicViewProps> = ({
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange
}) => {
    const { t, i18n } = useTranslation();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const { screenToFlowPosition } = useReactFlow();

    // Handle node selection
    const onSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
        if (selectedNodes.length > 0) {
            setSelectedNode(selectedNodes[0]);
        } else {
            setSelectedNode(null);
        }
    }, []);

    // Handle new connections
    const onConnect = useCallback(
        (params: Connection) => {
            setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
        },
        [setEdges]
    );

    // Handle drag over for drop zone
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setIsDraggingOver(true);
    }, []);

    // Handle drag leave
    const onDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDraggingOver(false);
    }, []);

    // Handle drop from component library
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            setIsDraggingOver(false);

            const componentData = event.dataTransfer.getData('application/reactflow');
            if (!componentData) {
                console.warn('No component data found in drop event');
                return;
            }

            try {
                const component = JSON.parse(componentData);
                const position = screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });

                console.log('Dropping component:', component, 'at position:', position);

                const newNode = {
                    id: getId(),
                    type: 'workflow',
                    position,
                    data: {
                        label: component.label,
                        type: component.type,
                        meta: component.meta,
                        description: '',
                    },
                };

                // Find auto-connect candidates from existing nodes
                const candidates = findAutoConnectCandidates(newNode, nodes);

                // Create edges for auto-connections
                if (candidates.length > 0) {
                    const newEdges = candidates.map((candidate: any) => ({
                        id: `edge-auto-${newNode.id}-${candidate.id}`,
                        source: candidate.isSource ? candidate.id : newNode.id,
                        target: candidate.isSource ? newNode.id : candidate.id,
                        type: 'smoothstep',
                        animated: true,
                        style: { stroke: '#6366f1', strokeWidth: 2 },
                    }));

                    setEdges((eds) => eds.concat(newEdges));
                }

                // Add the new node
                setNodes((nds) => nds.concat(newNode));
            } catch (error) {
                console.error('Error creating node from drop:', error);
            }
        },
        [screenToFlowPosition, setNodes, setEdges, nodes]
    );

    // Handle drag start from component library
    const onDragStart = useCallback((event: React.DragEvent, component: any) => {
        try {
            event.dataTransfer.setData('application/reactflow', JSON.stringify(component));
            event.dataTransfer.effectAllowed = 'move';
        } catch (error) {
            console.error('Error setting drag data:', error);
        }
    }, []);

    // Auto-layout function
    const onLayout = useCallback(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [nodes, edges, setNodes, setEdges]);

    // Handle node data updates from inspector
    const updateNodeData = useCallback(
        (nodeId: string, field: string, value: any) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                [field]: value,
                            },
                        };
                    }
                    return node;
                })
            );
        },
        [setNodes]
    );

    // Handle node deletion
    const onDeleteNode = useCallback(() => {
        if (selectedNode) {
            setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
            setEdges((eds) => eds.filter(
                (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
            ));
            setSelectedNode(null);
        }
    }, [selectedNode, setNodes, setEdges]);

    return (
        <div className="h-full flex overflow-hidden bg-slate-50 dark:bg-slate-950 relative">
            {/* Left Rail: Component Library - Hidden on mobile */}
            <div className="hidden md:block h-full">
                <LibrarySidebar onDragStart={onDragStart} />
            </div>

            {/* Center: ReactFlow Canvas */}
            <div
                className={`flex-1 relative bg-slate-50 dark:bg-slate-950 overflow-hidden transition-all duration-500 ${isDraggingOver ? 'ring-4 ring-indigo-400/30 ring-inset bg-indigo-50/30 dark:bg-indigo-900/30' : ''
                    }`}
                ref={reactFlowWrapper}
            >
                {/* Top Floating Bar (Canvas Tools) */}
                <div className="absolute top-6 right-6 flex items-center gap-3 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-900/50 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 backdrop-blur-sm hidden sm:inline-block">
                        {t('editor.lastSaved', { time: '10:42 AM' })}
                    </span>
                    <button
                        onClick={onLayout}
                        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 px-4 py-2 rounded-full shadow-sm pointer-events-auto text-xs text-slate-700 dark:text-slate-300 font-bold hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-2 ring-1 ring-black/5 dark:ring-white/10 hover:ring-indigo-200"
                    >
                        <GitBranch size={14} />
                        <span className="hidden sm:inline">{t('editor.autoLayout')}</span>
                    </button>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onSelectionChange={onSelectionChange}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-slate-50 dark:bg-slate-950"
                    deleteKeyCode={['Delete', 'Backspace']}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#cbd5e1" className="dark:opacity-20" />
                    <Controls className="!bg-white/90 dark:!bg-slate-800/90 !backdrop-blur-xl !border-white/20 dark:!border-white/10 !shadow-lg !rounded-xl overflow-hidden [&>button]:!border-slate-100 dark:[&>button]:!border-slate-700 [&>button]:!text-slate-600 dark:[&>button]:!text-slate-300 hover:[&>button]:!bg-slate-50 dark:hover:[&>button]:!bg-slate-700" />
                </ReactFlow>
            </div>

            {/* Right Rail: Inspector - Hidden on mobile */}
            <div className="hidden lg:flex w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800 flex-col z-10 shadow-sm">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">{t('editor.inspector')}</h3>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                        <Settings size={18} className="text-slate-400" />
                    </button>
                </div>

                {selectedNode ? (
                    <div className="p-5 space-y-8 overflow-y-auto flex-1">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 block">Node Label</label>
                                <input
                                    type="text"
                                    value={(selectedNode.data.label as string) || ''}
                                    onChange={(e) => updateNodeData(selectedNode.id, 'label', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 block">Description</label>
                                <textarea
                                    rows={2}
                                    value={(selectedNode.data.description as string) || ''}
                                    onChange={(e) => updateNodeData(selectedNode.id, 'description', e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 border-l-2 border-indigo-500 pl-2">Configuration</h4>

                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Retry Policy</span>
                                    <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium py-1 px-2 outline-none dark:text-slate-300">
                                        <option>3 Retries</option>
                                        <option>Linear Backoff</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Timeout</span>
                                    <span className="text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded dark:text-slate-300">30s</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 border-l-2 border-emerald-500 pl-2">Governance</h4>
                            <label className="flex items-center justify-between gap-3 p-3 border rounded-xl border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-800/50 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
                                    Policy Audit Checked
                                </span>
                                <CheckCircle size={18} className="text-emerald-500" />
                            </label>
                        </div>

                        <div className="pt-8 mt-auto">
                            <button
                                onClick={onDeleteNode}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 border border-red-100 dark:border-red-900/30 rounded-xl text-sm font-bold transition-all shadow-sm"
                            >
                                <Trash2 size={16} />
                                Delete Component
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30 dark:bg-slate-900/30">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100 dark:border-slate-700">
                            <Layers size={32} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">{t('editor.noSelection')}</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[160px] leading-relaxed">{t('editor.noSelectionDesc')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassicView;
