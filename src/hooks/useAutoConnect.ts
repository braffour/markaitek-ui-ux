import { useCallback } from 'react';
import { Edge, addEdge } from '@xyflow/react';
import { WorkflowNode, AutoConnectCandidate } from '../types/workflow';
import { findAutoConnectCandidates } from '../utils/connectionUtils';

interface UseAutoConnectProps {
  nodes: WorkflowNode[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const useAutoConnect = ({ nodes, setEdges }: UseAutoConnectProps) => {
  const createAutoConnections = useCallback(
    (newNode: WorkflowNode) => {
      const candidates: AutoConnectCandidate[] = findAutoConnectCandidates(newNode, nodes);

      if (candidates.length > 0) {
        const newEdges: Edge[] = candidates.map((candidate) => ({
          id: `edge-auto-${newNode.id}-${candidate.id}`,
          source: candidate.isSource ? candidate.id : newNode.id,
          target: candidate.isSource ? newNode.id : candidate.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#6366f1', strokeWidth: 2 },
        }));

        setEdges((eds) => [...eds, ...newEdges]);
      }
    },
    [nodes, setEdges]
  );

  return { createAutoConnections };
};



