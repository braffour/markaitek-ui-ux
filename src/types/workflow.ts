import { Node, Edge, Connection } from '@xyflow/react';

export type NodeType = 'trigger' | 'action' | 'connector';

export interface WorkflowNodeData {
  label: string;
  description?: string;
  type: NodeType;
  meta?: string;
}

export type WorkflowNode = Node<WorkflowNodeData>;

export interface ComponentDefinition {
  id: string;
  label: string;
  type: NodeType;
  meta: string;
}

export interface AutoConnectCandidate {
  id: string;
  isSource: boolean;
  distance: number;
}

export interface WorkflowEditorProps {
  // Add props if needed when extracting to separate component
}



