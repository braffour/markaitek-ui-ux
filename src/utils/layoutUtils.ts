import dagre from 'dagre';
import { Node, Edge } from '@xyflow/react';
import { WorkflowNode } from '../types/workflow';

const nodeWidth = 192; // 48 * 4 (w-48 in Tailwind)
const nodeHeight = 100;

type Direction = 'LR' | 'TB' | 'BT' | 'RL';

export interface LayoutedElements {
  nodes: Node[];
  edges: Edge[];
}

export const getLayoutedElements = (
  nodes: WorkflowNode[],
  edges: Edge[],
  direction: Direction = 'LR'
): LayoutedElements => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure the graph
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 80,
    ranksep: 150,
    marginx: 50,
    marginy: 50,
  });

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Apply the calculated positions to the nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};



