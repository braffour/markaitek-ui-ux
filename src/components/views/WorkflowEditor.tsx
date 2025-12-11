import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import WorkflowNode from '../nodes/WorkflowNode';
import ComponentLibrary from '../workflow/ComponentLibrary';
import NodeInspector from '../workflow/NodeInspector';
import WorkflowToolbar from '../workflow/WorkflowToolbar';
import { getLayoutedElements } from '../../utils/layoutUtils';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useAutoConnect } from '../../hooks/useAutoConnect';
import { COMPONENT_LIBRARY, INITIAL_NODES, INITIAL_EDGES } from '../../constants/workflow';
import { WorkflowNode as WorkflowNodeType } from '../../types/workflow';

const nodeTypes = {
  workflow: WorkflowNode,
};

let nodeId = 4;
const getId = () => `node-${nodeId++}`;

const WorkflowEditorInner = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { createAutoConnections } = useAutoConnect({ nodes, setEdges });

  const handleNodeCreated = useCallback(
    (newNode: WorkflowNodeType) => {
      setNodes((nds) => [...nds, newNode]);
      createAutoConnections(newNode);
    },
    [setNodes, createAutoConnections]
  );

  const { onDragStart, onDragOver, onDrop } = useDragAndDrop({
    onNodeCreated: handleNodeCreated,
  });

  const onSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
    if (selectedNodes.length > 0) {
      setSelectedNode(selectedNodes[0]);
    } else {
      setSelectedNode(null);
    }
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds) as Edge[]);
    },
    [setEdges]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    onDragOver(event);
    setIsDraggingOver(true);
  }, [onDragOver]);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      setIsDraggingOver(false);
      onDrop(event, getId);
    },
    [onDrop]
  );

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [nodes, edges, setNodes, setEdges]);

  const updateNodeData = useCallback(
    (nodeId: string, field: string, value: unknown) => {
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
      setEdges((eds) =>
        eds.filter(
          (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  const selectedWorkflowNode = useMemo(() => {
    return selectedNode as WorkflowNodeType | null;
  }, [selectedNode]);

  return (
    <div className="h-full flex overflow-hidden bg-slate-50 dark:bg-slate-950">
      <ComponentLibrary components={COMPONENT_LIBRARY} onDragStart={onDragStart} />

      {/* Center: ReactFlow Canvas */}
      <div
        className={`flex-1 relative bg-slate-50 dark:bg-slate-950 overflow-hidden transition-all ${
          isDraggingOver
            ? 'ring-4 ring-indigo-400/50 ring-inset bg-indigo-50/50 dark:bg-indigo-900/20'
            : ''
        }`}
        ref={reactFlowWrapper}
      >
        <WorkflowToolbar onLayout={onLayout} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50 dark:bg-slate-950"
          deleteKeyCode={['Delete', 'Backspace']}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#6366f1"
            className="opacity-20"
          />
          <Controls className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm" />
        </ReactFlow>
      </div>

      <NodeInspector
        selectedNode={selectedWorkflowNode}
        onUpdateNode={updateNodeData}
        onDeleteNode={onDeleteNode}
      />
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
