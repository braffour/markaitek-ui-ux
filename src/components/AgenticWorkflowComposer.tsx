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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  MessageSquare,
  Zap,
  Layout,
  ShieldCheck,
  Activity,
  Cpu,
  Settings,
  Play,
  Save,
  CheckCircle,
  AlertTriangle,
  FileText,
  Search,
  Database,
  Server,
  Users,
  Clock,
  ArrowRight,
  Wand2,
  History,
  Layers,
  X,
  GitBranch,
  Trash2
} from 'lucide-react';

import WorkflowNode from './nodes/WorkflowNode';
import { getLayoutedElements } from '../utils/layoutUtils';
import { findAutoConnectCandidates } from '../utils/connectionUtils';


// --- Mock Data & Constants ---


const WORKSPACES = ["Engineering Prod", "Finance Automation", "Customer Support Ops"];
const POLICIES = ["GDPR Strict", "Internal Only", "SOC2 Compliant", "Public Sandbox"];
const ENVIRONMENTS = ["Dev", "Staging", "Prod"];


const PAST_SUCCESS_INSIGHTS = [
  { id: 1, name: "Jira to Slack Sync", reliable: "99.9%", time: "2h ago" },
  { id: 2, name: "Q3 Report Generation", reliable: "98.5%", time: "1d ago" },
];


const COMPONENT_LIBRARY = [
  { id: 'trig-1', label: 'Webhook Listener', type: 'trigger', meta: 'Ext. Access' },
  { id: 'act-1', label: 'Transform JSON', type: 'action', meta: 'Safe' },
  { id: 'act-2', label: 'PostgreSQL Query', type: 'action', meta: 'Read-Only' },
  { id: 'conn-1', label: 'Slack Notification', type: 'connector', meta: 'PII Check' },
];


// --- Components ---


const Badge = ({ children, type = 'neutral', className = '' }) => {
  const colors = {
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[type]} ${className}`}>
      {children}
    </span>
  );
};


const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};


// --- Mode 1: Yolo Mode ---


const YoloMode = () => {
  const [transcript, setTranscript] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [input, setInput] = useState('');

  const simulateAgent = () => {
    setIsBuilding(true);
    const steps = [
      "Parsing intent...",
      "Retrieving context from vectorized docs...",
      "Matching against SOC2 Policy scope...",
      "Drafting workflow definition...",
      "Simulating dry-run...",
      "Ready for review."
    ];

    let stepIndex = 0;
    setTranscript([]);

    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsBuilding(false);
        return;
      }
      setTranscript(prev => [...prev, { text: steps[stepIndex], time: new Date().toLocaleTimeString() }]);
      stepIndex++;
    }, 800);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 p-6 overflow-hidden">
      {/* Left: Intent Panel */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-lg shrink-0">
          <h2 className="text-3xl font-bold mb-2">What are we automating today?</h2>
          <p className="text-indigo-100 mb-6">Express your goal. Markaitek handles the governance.</p>

          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Whenever a high-priority ticket arrives in Jira, summarize it with GPT-4 and slack the Engineering Ops channel..."
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[120px]"
            />
            <button
              onClick={simulateAgent}
              disabled={!input || isBuilding}
              className="absolute bottom-4 right-4 bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
            >
              {isBuilding ? <Activity className="animate-spin" size={18} /> : <Zap size={18} />}
              Execute
            </button>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-xs text-indigo-200 font-semibold uppercase tracking-wider self-center mr-2">Quick Prompts:</span>
            {['Sync Leads to CRM', 'Daily Report', 'Onboard User'].map(p => (
              <button key={p} onClick={() => setInput(p)} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-sm text-white transition">
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Mandatory Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Governance Context</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Policy Scope</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-2.5 text-emerald-500" size={16} />
                  <select className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {POLICIES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Context File (RAG)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer transition">
                  <FileText className="mx-auto text-slate-400 mb-1" size={20} />
                  <span className="text-xs text-slate-500">Drag spec or click to upload</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Execution Parameters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  {['ASAP', 'Today', 'Flexible'].map((u, i) => (
                    <button key={u} className={`flex-1 py-1.5 text-sm rounded-md font-medium transition ${i === 0 ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Environments</label>
                <div className="flex gap-4">
                  {ENVIRONMENTS.map(env => (
                    <label key={env} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={env === 'Dev'} className="rounded text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm text-slate-600">{env}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Live Transcript */}
      <div className="w-full lg:w-96 bg-slate-900 rounded-2xl p-6 flex flex-col shadow-xl shrink-0 border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="text-indigo-400" size={20} />
            <h3 className="font-mono text-indigo-100">Markaitek Agent Terminal</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto font-mono text-sm space-y-3">
          {transcript.length === 0 && !isBuilding && (
            <div className="text-slate-600 italic text-center mt-10">
              Waiting for intent...
            </div>
          )}
          {transcript.map((log, idx) => (
            <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
              <span className="text-slate-600 shrink-0 text-xs pt-1">{log.time}</span>
              <div className="text-emerald-400 border-l-2 border-emerald-900 pl-3">
                {log.text}
              </div>
            </div>
          ))}
          {isBuilding && (
            <div className="flex items-center gap-2 text-indigo-400 mt-4">
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={14} />
            <span>Audit logging active</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Mode 2: Classic Mode ---

// Node types mapping for ReactFlow
const nodeTypes = {
  workflow: WorkflowNode,
};

// Initial nodes with actual workflow data
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

// Initial edges connecting the nodes
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

const ClassicModeInner = ({ 
  nodes, setNodes, onNodesChange,
  edges, setEdges, onEdgesChange 
}) => {
  const reactFlowWrapper = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { screenToFlowPosition } = useReactFlow();

  // Handle node selection
  const onSelectionChange = useCallback(({ nodes: selectedNodes }) => {
    if (selectedNodes.length > 0) {
      setSelectedNode(selectedNodes[0]);
    } else {
      setSelectedNode(null);
    }
  }, []);

  // Handle new connections
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
    },
    [setEdges]
  );

  // Handle drag over for drop zone
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  }, []);

  // Handle drag leave
  const onDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  }, []);

  // Handle drop from component library
  const onDrop = useCallback(
    (event) => {
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

        console.log('Creating new node:', newNode);
        
        // Find auto-connect candidates from existing nodes
        const candidates = findAutoConnectCandidates(newNode, nodes);
        console.log('Auto-connect candidates:', candidates);

        // Create edges for auto-connections
        if (candidates.length > 0) {
          const newEdges = candidates.map((candidate) => ({
            id: `edge-auto-${newNode.id}-${candidate.id}`,
            source: candidate.isSource ? candidate.id : newNode.id,
            target: candidate.isSource ? newNode.id : candidate.id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
          }));

          console.log('Creating auto-connect edges:', newEdges);
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
  const onDragStart = useCallback((event, component) => {
    console.log('Drag started for component:', component);
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
    (nodeId, field, value) => {
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
    <div className="h-full flex overflow-hidden bg-slate-50">
      {/* Left Rail: Component Library */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Layers size={16} /> Library
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {['Trigger', 'Action', 'Connector'].map((cat) => (
            <div key={cat}>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 px-1">
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
                    className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm cursor-move hover:border-indigo-400 hover:shadow-md transition group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm text-slate-700">
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
        className={`flex-1 relative bg-slate-50 overflow-hidden transition-all ${
          isDraggingOver ? 'ring-4 ring-indigo-400 ring-inset bg-indigo-50/50' : ''
        }`}
        ref={reactFlowWrapper}
      >
        {/* Top Bar: Breadcrumbs & Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200 px-4 py-2 rounded-full shadow-sm pointer-events-auto">
            <span className="text-sm font-semibold text-slate-600">Workflows</span>
            <span className="text-slate-400">/</span>
            <span className="text-sm font-semibold text-slate-900">Order Processing</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2">
              v4.2 (Draft)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onLayout}
              className="bg-white/80 backdrop-blur border border-slate-200 px-3 py-2 rounded-lg shadow-sm pointer-events-auto text-xs text-slate-700 font-medium hover:bg-white hover:text-indigo-600 transition flex items-center gap-2"
            >
              <GitBranch size={14} />
              Auto Layout
            </button>
            <div className="bg-white/80 backdrop-blur border border-slate-200 px-4 py-2 rounded-full shadow-sm pointer-events-auto text-xs text-slate-500 font-mono">
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
          className="bg-slate-50"
          deleteKeyCode={['Delete', 'Backspace']}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#6366f1" />
          <Controls className="bg-white border border-slate-200 rounded-lg shadow-sm" />
        </ReactFlow>
      </div>

      {/* Right Rail: Inspector */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col z-10 shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Inspector</h3>
          <Settings size={16} className="text-slate-400" />
        </div>
        
        {selectedNode ? (
          <div className="p-4 space-y-6 overflow-y-auto flex-1">
            {/* Delete hint and button */}
            <div className="flex items-center justify-between gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-mono">Delete</kbd>
                <span>to remove</span>
              </div>
              <button
                onClick={onDeleteNode}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-medium transition"
              >
                <Trash2 size={14} />
                Delete Node
              </button>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Node Label</label>
              <input
                type="text"
                value={selectedNode.data.label || ''}
                onChange={(e) => updateNodeData(selectedNode.id, 'label', e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <input
                type="text"
                value={selectedNode.data.description || ''}
                onChange={(e) => updateNodeData(selectedNode.id, 'description', e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Node Type</label>
              <div className="bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm text-slate-700">
                {selectedNode.data.type || 'N/A'}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Data Schema Map</label>
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>source_id</span> <ArrowRight size={10} /> <span>id</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>cust_email</span> <ArrowRight size={10} /> <span>email</span>
                </div>
              </div>
              <button className="text-xs text-indigo-600 hover:underline font-medium mt-1">
                + Add Mapping
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Error Handling</label>
              <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 bg-white">
                <option>Stop Workflow</option>
                <option>Retry (3x)</option>
                <option>Ignore & Continue</option>
                <option>Route to DLQ</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Deploy Target</label>
              <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 bg-white">
                <option>Production</option>
                <option>Staging</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between gap-2 p-3 border rounded-lg border-emerald-200 bg-emerald-50 cursor-pointer">
                <span className="text-sm font-medium text-emerald-800">
                  Policy Audit Checked
                </span>
                <CheckCircle size={16} className="text-emerald-600" />
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Owner</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                  JD
                </div>
                <span className="text-sm text-slate-600">John Doe (DevOps)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-slate-400">
              <Layers size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a node to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ClassicMode = ({ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }) => {
  return (
    <ClassicModeInner 
      nodes={nodes}
      setNodes={setNodes}
      onNodesChange={onNodesChange}
      edges={edges}
      setEdges={setEdges}
      onEdgesChange={onEdgesChange}
    />
  );
};


// --- Mode 3: I'm Lucky Mode ---


const LuckyMode = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50 overflow-y-auto">
      <div className="w-full max-w-3xl space-y-8">

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-800">Let's make magic happen.</h2>
          <p className="text-slate-500">Auto-fit automation based on your historical success patterns.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Main Intent Card */}
          <div className="p-8 bg-gradient-to-r from-white to-slate-50">
            <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Describe Integration Intent</label>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="e.g. Sync SalesForce Closed-Won deals to NetSuite as invoices"
                className="w-full text-xl p-4 border-b-2 border-slate-200 focus:border-indigo-600 outline-none bg-transparent placeholder-slate-300"
              />
              <Wand2 className="absolute right-4 top-4 text-indigo-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Primary Systems</label>
                <div className="flex flex-wrap gap-2">
                  {['SalesForce', 'NetSuite', 'Slack', 'Gmail'].map(sys => (
                    <button key={sys} className="px-3 py-1 border border-slate-200 rounded-full text-sm text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition bg-white">
                      {sys}
                    </button>
                  ))}
                  <button className="px-3 py-1 border border-dashed border-slate-300 rounded-full text-sm text-slate-400 hover:text-slate-600">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Constraints</label>
                <div className="flex gap-2">
                  <select className="flex-1 p-2 bg-white border border-slate-200 rounded text-sm text-slate-700">
                    <option>Budget: Standard</option>
                    <option>Budget: Low Cost</option>
                  </select>
                  <select className="flex-1 p-2 bg-white border border-slate-200 rounded text-sm text-slate-700">
                    <option>Sec: High</option>
                    <option>Sec: Standard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 mt-1">
                <History size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">Memory Insight</h4>
                <p className="text-sm text-slate-600 mb-3">Based on your last 50 workflows, we recommend using the <span className="font-mono bg-slate-200 px-1 rounded text-xs">Finance-v2</span> connector pack.</p>

                <div className="space-y-2">
                  {PAST_SUCCESS_INSIGHTS.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded border border-slate-100 text-sm">
                      <span className="text-slate-700 font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{item.time}</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{item.reliable} Reliable</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="bg-slate-100 p-4 flex justify-between items-center border-t border-slate-200">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Approval</label>
                <select className="text-sm bg-transparent font-medium text-slate-800 outline-none">
                  <option>Auto-approve Safe</option>
                  <option>Always Ask</option>
                </select>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-4 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-slate-600">Auto-Fallback Enabled</span>
              </label>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition flex items-center gap-2">
              <Wand2 size={18} />
              Generate Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Shell ---


function AgenticWorkflowComposerInner() {
  const [mode, setMode] = useState('yolo');
  const [isQaOpen, setIsQaOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(WORKSPACES[0]);
  
  // Workflow state - shared across all modes
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-screen w-full flex flex-col bg-white text-slate-900 font-sans">

      {/* Global Header */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              M
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800 hidden md:block">Markaitek Agentic Composer</h1>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          <div className="relative group">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
              <Layout size={16} />
              {currentWorkspace}
            </button>
            {/* Dropdown (Visual Only) */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl p-1 hidden group-hover:block">
              {WORKSPACES.map(ws => (
                <div key={ws} onClick={() => setCurrentWorkspace(ws)} className="px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded cursor-pointer">
                  {ws}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher */}
        <div className="hidden md:flex bg-slate-100 p-1 rounded-lg">
          {[
            { id: 'yolo', label: 'Yolo Mode', icon: MessageSquare },
            { id: 'classic', label: 'Classic', icon: Layers },
            { id: 'lucky', label: "I'm Lucky", icon: Wand2 },
          ].map(m => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isActive ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Icon size={16} />
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* Stack Status */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-medium text-slate-600">Systems Operational</span>
            </div>
            <span className="text-[10px] text-slate-400">Latency: 24ms</span>
          </div>

          <button
            onClick={() => setIsQaOpen(true)}
            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-100 transition"
          >
            <ShieldCheck size={16} />
            Guardrails Active
          </button>

          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-200 cursor-pointer">
            JS
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {mode === 'yolo' && <YoloMode />}
        {mode === 'classic' && (
          <ClassicMode 
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            edges={edges}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
          />
        )}
        {mode === 'lucky' && <LuckyMode />}
      </main>

      {/* Global QA Modal */}
      <Modal
        isOpen={isQaOpen}
        onClose={() => setIsQaOpen(false)}
        title="Governance & QA Checklist"
      >
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-3">
            <ShieldCheck className="text-indigo-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-indigo-900 text-sm">Policy Alignment Engine</h4>
              <p className="text-indigo-700 text-xs mt-1">Your current configuration is being checked against <span className="font-mono font-bold">SOC2-Strict</span>.</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Data Residency Check (EU-West)", status: "pass" },
              { label: "PII Masking on Output", status: "pass" },
              { label: "Rate Limiting Configured", status: "warn" },
              { label: "Service Account Permissions", status: "pass" },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-700">{check.label}</span>
                {check.status === 'pass' ? (
                  <Badge type="success"><CheckCircle size={12} className="inline mr-1"/> Pass</Badge>
                ) : (
                  <Badge type="warning"><AlertTriangle size={12} className="inline mr-1"/> Review</Badge>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={() => setIsQaOpen(false)} className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-lg">Close</button>
            <button className="px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">Deploy to Staging</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Wrap the entire component with ReactFlowProvider so hooks can access it
export default function AgenticWorkflowComposer() {
  return (
    <ReactFlowProvider>
      <AgenticWorkflowComposerInner />
    </ReactFlowProvider>
  );
}

