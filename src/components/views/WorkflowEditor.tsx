import React, { useState, useRef, useCallback } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    BackgroundVariant,
    Connection,
    Edge,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
    Layers,
    GitBranch,
    Settings,
    Trash2,
    ArrowRight,
    CheckCircle,
} from 'lucide-react';

import WorkflowNode from '../nodes/WorkflowNode';
import Badge from '../ui/Badge';
import { getLayoutedElements } from '../../utils/layoutUtils';
import { findAutoConnectCandidates } from '../../utils/connectionUtils';

const COMPONENT_LIBRARY = [
    { id: 'trig-1', label: 'Webhook Listener', type: 'trigger', meta: 'Ext. Access' },
    { id: 'act-1', label: 'Transform JSON', type: 'action', meta: 'Safe' },
    { id: 'act-2', label: 'PostgreSQL Query', type: 'action', meta: 'Read-Only' },
    { id: 'conn-1', label: 'Slack Notification', type: 'connector', meta: 'PII Check' },
];

const nodeTypes = {
    workflow: WorkflowNode,
};

const initialNodes = [
    {
        id: 'node-1',
        type: 'workflow',
        position: { x: 100, y: 200 },
        data: {
            label: 'Webhook',
            description: 'Listening on /hooks/v1/orders',
            type: 'trigger',
            meta: 'Ext. Access',
        },
    },
    {
        id: 'node-2',
        type: 'workflow',
        position: { x: 400, y: 200 },
        data: {
            label: 'Process Data',
            description: 'Transform: JSON → SQL',
            type: 'action',
            meta: 'Safe',
        },
    },
    {
        id: 'node-3',
        type: 'workflow',
        position: { x: 700, y: 200 },
        data: {
            label: 'Postgres',
            description: 'Insert into public.orders',
            type: 'connector',
            meta: 'Read-Only',
        },
    },
];

const initialEdges = [
    {
        id: 'edge-1-2',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
        animated: false,
    },
    {
        id: 'edge-2-3',
        source: 'node-2',
        target: 'node-3',
        type: 'smoothstep',
        animated: false,
    },
];

let nodeId = 4;
const getId = () => `node-${nodeId++}`;

const WorkflowEditorInner = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const { screenToFlowPosition } = useReactFlow();

    const onSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
        if (selectedNodes.length > 0) {
            setSelectedNode(selectedNodes[0]);
        } else {
            setSelectedNode(null);
        }
    }, []);

    const onConnect = useCallback(
        (params: Connection | Edge) => {
            setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds) as any);
        },
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setIsDraggingOver(true);
    }, []);

    const onDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDraggingOver(false);
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            setIsDraggingOver(false);

            const componentData = event.dataTransfer.getData('application/reactflow');
            if (!componentData) {
                return;
            }

            try {
                const component = JSON.parse(componentData);
                const position = screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });

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

                const candidates = findAutoConnectCandidates(newNode, nodes);

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

                setNodes((nds) => nds.concat(newNode));
            } catch (error) {
                console.error('Error creating node from drop:', error);
            }
        },
        [screenToFlowPosition, setNodes, setEdges, nodes]
    );

    const onDragStart = useCallback((event: React.DragEvent, component: any) => {
        try {
            event.dataTransfer.setData('application/reactflow', JSON.stringify(component));
            event.dataTransfer.effectAllowed = 'move';
        } catch (error) {
            console.error('Error setting drag data:', error);
        }
    }, []);

    const onLayout = useCallback(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [nodes, edges, setNodes, setEdges]);

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
        <div className="h-full flex overflow-hidden bg-brand-dark">
            {/* Left Rail: Component Library */}
            <div className="w-64 bg-brand-surface/80 backdrop-blur-md border-r border-brand-border flex flex-col z-10 shadow-sm">
                <div className="p-4 border-b border-brand-border bg-brand-dark/50">
                    <h3 className="font-bold text-slate-200 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <Layers size={16} /> Library
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-4">
                    {['Trigger', 'Action', 'Connector'].map((cat) => (
                        <div key={cat}>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 px-1">
                                {cat}s
                            </h4>
                            <div className="space-y-2">
                                {COMPONENT_LIBRARY.filter(
                                    (c) => c.type === cat.toLowerCase()
                                ).map((comp) => (
                                    <div
                                        key={comp.id}
                                        draggable
                                        onDragStart={(event) => onDragStart(event, comp)}
                                        className="bg-brand-surface border border-brand-border p-3 rounded-lg shadow-sm cursor-move hover:border-brand-blue hover:shadow-glow-blue transition group"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-sm text-slate-200">
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

            {/* Center: ReactFlow Canvas */}
            <div
                className={`flex-1 relative bg-brand-dark overflow-hidden transition-all ${isDraggingOver ? 'ring-4 ring-brand-blue/50 ring-inset bg-brand-blue/5' : ''
                    }`}
                ref={reactFlowWrapper}
            >
                {/* Top Bar: Breadcrumbs & Controls */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                    <div className="flex items-center gap-2 bg-brand-surface/80 backdrop-blur border border-brand-border px-4 py-2 rounded-full shadow-sm pointer-events-auto">
                        <span className="text-sm font-semibold text-slate-400">Workflows</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-sm font-semibold text-white">Order Processing</span>
                        <span className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded ml-2 border border-brand-blue/30">
                            v4.2 (Draft)
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onLayout}
                            className="bg-brand-surface/80 backdrop-blur border border-brand-border px-3 py-2 rounded-full shadow-sm pointer-events-auto text-xs text-slate-300 font-medium hover:bg-brand-surface hover:text-brand-blue hover:border-brand-blue transition flex items-center gap-2"
                        >
                            <GitBranch size={14} />
                            Auto Layout
                        </button>
                        <div className="bg-brand-surface/80 backdrop-blur border border-brand-border px-4 py-2 rounded-full shadow-sm pointer-events-auto text-xs text-slate-400 font-mono">
                            Last Saved: 10:42 AM
                        </div>
                    </div>
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
                    className="bg-brand-dark"
                    deleteKeyCode={['Delete', 'Backspace']}
                >
                    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#333" className="opacity-20" />
                    <Controls className="bg-brand-surface border border-brand-border rounded-lg shadow-sm fill-white text-white" />
                </ReactFlow>
            </div>

            {/* Right Rail: Inspector */}
            <div className="w-80 bg-brand-surface/80 backdrop-blur-md border-l border-brand-border flex flex-col z-10 shadow-sm">
                <div className="p-4 border-b border-brand-border bg-brand-dark/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">Inspector</h3>
                    <Settings size={16} className="text-slate-400" />
                </div>

                {selectedNode ? (
                    <div className="p-4 space-y-6 overflow-y-auto flex-1">
                        {/* Delete hint and button */}
                        <div className="flex items-center justify-between gap-2 text-xs bg-brand-dark p-2 rounded border border-brand-border">
                            <div className="flex items-center gap-2 text-slate-400">
                                <kbd className="px-2 py-1 bg-brand-surface border border-brand-border rounded text-[10px] font-mono">Delete</kbd>
                                <span>to remove</span>
                            </div>
                            <button
                                onClick={onDeleteNode}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-900/20 text-red-400 hover:bg-red-900/30 border border-red-900/50 rounded-lg text-xs font-medium transition"
                            >
                                <Trash2 size={14} />
                                Delete Node
                            </button>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Node Label</label>
                            <input
                                type="text"
                                value={selectedNode.data.label as string || ''}
                                onChange={(e) => updateNodeData(selectedNode.id, 'label', e.target.value)}
                                className="w-full border border-brand-border rounded px-3 py-2 text-sm font-medium text-slate-200 bg-brand-dark focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                            <input
                                type="text"
                                value={selectedNode.data.description as string || ''}
                                onChange={(e) => updateNodeData(selectedNode.id, 'description', e.target.value)}
                                className="w-full border border-brand-border rounded px-3 py-2 text-sm text-slate-300 bg-brand-dark focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Node Type</label>
                            <div className="bg-brand-dark border border-brand-border rounded px-3 py-2 text-sm text-slate-300">
                                {selectedNode.data.type as string || 'N/A'}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Data Schema Map</label>
                            <div className="bg-brand-dark border border-brand-border rounded p-3 text-xs font-mono text-slate-400">
                                <div className="flex justify-between">
                                    <span>source_id</span> <ArrowRight size={10} /> <span>id</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span>cust_email</span> <ArrowRight size={10} /> <span>email</span>
                                </div>
                            </div>
                            <button className="text-xs text-brand-blue hover:underline font-medium mt-1">
                                + Add Mapping
                            </button>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Error Handling</label>
                            <select className="w-full border border-brand-border rounded px-3 py-2 text-sm text-slate-300 bg-brand-dark">
                                <option>Stop Workflow</option>
                                <option>Retry (3x)</option>
                                <option>Ignore & Continue</option>
                                <option>Route to DLQ</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Deploy Target</label>
                            <select className="w-full border border-brand-border rounded px-3 py-2 text-sm text-slate-300 bg-brand-dark">
                                <option>Production</option>
                                <option>Staging</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-brand-border">
                            <label className="flex items-center justify-between gap-2 p-3 border rounded-lg border-emerald-900/50 bg-emerald-900/20 cursor-pointer">
                                <span className="text-sm font-medium text-emerald-400">
                                    Policy Audit Checked
                                </span>
                                <CheckCircle size={16} className="text-emerald-400" />
                            </label>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Owner</label>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-[10px] font-bold text-brand-blue">
                                    JD
                                </div>
                                <span className="text-sm text-slate-300">John Doe (DevOps)</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <div className="text-center text-slate-600">
                            <Layers size={48} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm">Select a node to view details</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const WorkflowEditor = () => {
    return (
        <ReactFlowProvider>
            <WorkflowEditorInner />
        </ReactFlowProvider>
    );
};

export default WorkflowEditor;
