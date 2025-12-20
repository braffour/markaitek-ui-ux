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
        <div className="h-full flex overflow-hidden bg-brand-bg relative">
            {/* Left Rail: Component Library - Hidden on mobile */}
            <div className="hidden md:block h-full">
                <LibrarySidebar onDragStart={onDragStart} />
            </div>

            {/* Center: ReactFlow Canvas */}
            <div
                className={`flex-1 relative bg-brand-bg overflow-hidden transition-all duration-500 ${isDraggingOver ? 'ring-8 ring-brand-accent/10 ring-inset bg-brand-accent/[0.02]' : ''
                    }`}
                ref={reactFlowWrapper}
            >
                {/* Top Floating Bar (Canvas Tools) */}
                <div className="absolute top-8 right-8 flex items-center gap-4 z-10 pointer-events-none">
                    <div className="flex items-center gap-3 bg-brand-surface-1/60 backdrop-blur-3xl border border-brand-border-low px-5 py-3 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] pointer-events-auto group">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] animate-pulse"></div>
                        <span className="text-[10px] font-extrabold text-brand-text-muted uppercase tracking-[0.2em] group-hover:text-brand-text-primary transition-colors">
                            {t('editor.lastSaved', { time: '10:42 AM' })}
                        </span>
                    </div>

                    <button
                        onClick={onLayout}
                        className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-8 py-3 rounded-2xl shadow-[0_20px_50px_-12px_rgba(45,212,191,0.3)] pointer-events-auto text-[11px] font-extrabold transition-all flex items-center gap-3 hover:scale-105 active:scale-95 uppercase tracking-[0.2em]"
                    >
                        <GitBranch size={18} />
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
                    className="bg-brand-bg"
                    deleteKeyCode={['Delete', 'Backspace']}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="rgba(45, 212, 191, 0.1)" />
                    <Controls className="!bg-brand-surface-1/80 !backdrop-blur-3xl !border-brand-border-low !shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] !rounded-[24px] !p-2 !m-4 [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!text-brand-text-muted hover:[&>button]:!text-brand-accent [&>button]:!transition-all group" />
                </ReactFlow>
            </div>

            {/* Right Rail: Inspector - Hidden on mobile */}
            <div className="hidden lg:flex w-80 bg-brand-surface-1/40 backdrop-blur-2xl border-l border-brand-border-low flex-col z-10 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.5)]">
                <div className="p-6 border-b border-brand-border-low bg-brand-surface-1/20 flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                            <Settings size={16} className="text-brand-accent" />
                        </div>
                        <h3 className="font-bold text-sm text-brand-text-primary tracking-tight">{t('editor.inspector')}</h3>
                    </div>
                </div>

                {selectedNode ? (
                    <div className="p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
                        <div className="space-y-5">
                            <div>
                                <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.2em] mb-2.5 block px-1">Node Title</label>
                                <input
                                    type="text"
                                    value={(selectedNode.data.label as string) || ''}
                                    onChange={(e) => updateNodeData(selectedNode.id, 'label', e.target.value)}
                                    className="w-full bg-brand-surface-2/40 border border-brand-border-low rounded-xl px-4 py-3 text-[13px] font-bold text-brand-text-primary focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.2em] mb-2.5 block px-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={(selectedNode.data.description as string) || ''}
                                    onChange={(e) => updateNodeData(selectedNode.id, 'description', e.target.value)}
                                    className="w-full bg-brand-surface-2/40 border border-brand-border-low rounded-xl px-4 py-3 text-[13px] text-brand-text-secondary focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 outline-none transition-all resize-none shadow-inner leading-relaxed"
                                    placeholder="Briefly describe what this step does..."
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-brand-border-low">
                            <h4 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em] mb-4 px-1">Configuration</h4>

                            <div className="bg-brand-surface-2/30 rounded-2xl p-4 border border-brand-border-low space-y-4 shadow-inner">
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="text-brand-text-secondary font-medium">Retry Policy</span>
                                    <select className="bg-brand-surface-1 border border-brand-border-low rounded-lg text-[11px] font-bold py-1.5 px-3 outline-none text-brand-text-primary focus:border-brand-accent/40 transition-colors">
                                        <option>3 Retries</option>
                                        <option>Linear Backoff</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="text-brand-text-secondary font-medium">Timeout</span>
                                    <span className="text-[11px] font-mono bg-brand-surface-1 border border-brand-border-low px-2.5 py-1 rounded-lg text-brand-accent font-bold">30s</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-brand-border-low">
                            <h4 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.25em] mb-4 px-1">Governance</h4>
                            <label className="flex items-center justify-between gap-3 p-4 border-2 rounded-2xl border-emerald-400/20 bg-emerald-400/5 cursor-pointer hover:bg-emerald-400/10 hover:border-emerald-400/40 transition-all shadow-inner group">
                                <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-widest">
                                    Policy Audit Checked
                                </span>
                                <CheckCircle size={20} className="text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)] transition-transform group-hover:scale-110" />
                            </label>
                        </div>

                        <div className="pt-8 mt-auto px-1">
                            <button
                                onClick={onDeleteNode}
                                className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-red-400/5 hover:bg-red-400/10 text-red-400 border border-red-400/20 rounded-2xl text-[11px] font-bold transition-all shadow-xl hover:shadow-red-400/5 active:scale-95 uppercase tracking-widest group"
                            >
                                <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
                                Delete Component
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-brand-surface-1/5">
                        <div className="w-24 h-24 bg-brand-surface-1/40 backdrop-blur-3xl rounded-[40px] flex items-center justify-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] mb-8 border border-brand-border-low group hover:scale-110 transition-transform duration-700">
                            <Layers size={42} className="text-brand-accent opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="font-extrabold text-brand-text-primary text-base mb-3 tracking-tight">{t('editor.noSelection')}</h4>
                        <p className="text-[12px] text-brand-text-muted max-w-[220px] leading-relaxed font-medium uppercase tracking-[0.2em] opacity-40">{t('editor.noSelectionDesc')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassicView;
