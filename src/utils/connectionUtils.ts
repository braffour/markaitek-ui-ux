import { XYPosition } from '@xyflow/react';
import { WorkflowNode, AutoConnectCandidate, NodeType } from '../types/workflow';

/**
 * Calculate Euclidean distance between two positions
 */
export const calculateDistance = (pos1: XYPosition, pos2: XYPosition): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Find nodes within a given radius of a position
 */
export const findNearbyNodes = (
  position: XYPosition,
  nodes: WorkflowNode[],
  radius: number = 200
): WorkflowNode[] => {
  return nodes.filter((node) => {
    const distance = calculateDistance(position, node.position);
    return distance <= radius;
  });
};

/**
 * Check if two node types are compatible for connection
 * @param sourceType - Type of the source node (trigger, action, connector)
 * @param targetType - Type of the target node
 * @returns True if nodes can be connected
 */
export const areNodesCompatible = (sourceType: NodeType, targetType: NodeType): boolean => {
  const compatibilityRules: Record<NodeType, NodeType[]> = {
    trigger: ['action'], // Triggers can connect TO actions
    action: ['action', 'connector'], // Actions can connect TO actions or connectors
    connector: [], // Connectors cannot be sources
  };

  return compatibilityRules[sourceType]?.includes(targetType) || false;
};

/**
 * Find the best auto-connect candidates for a newly dropped node
 * @param newNode - The newly created node
 * @param existingNodes - All existing nodes on the canvas
 * @param radius - Search radius in pixels (default: 200)
 * @returns Array of connection candidates with metadata
 */
export const findAutoConnectCandidates = (
  newNode: WorkflowNode,
  existingNodes: WorkflowNode[],
  radius: number = 200
): AutoConnectCandidate[] => {
  const newNodeType = newNode.data.type;
  const nearbyNodes = findNearbyNodes(newNode.position, existingNodes, radius);

  const candidates: AutoConnectCandidate[] = [];

  // Find nodes that the new node can connect TO (as source)
  if (newNodeType === 'trigger' || newNodeType === 'action') {
    const validTargets = nearbyNodes.filter((node) =>
      areNodesCompatible(newNodeType, node.data.type)
    );

    if (validTargets.length > 0) {
      // Sort by distance and take the closest
      const closest = validTargets.sort(
        (a, b) =>
          calculateDistance(newNode.position, a.position) -
          calculateDistance(newNode.position, b.position)
      )[0];

      candidates.push({
        id: closest.id,
        isSource: false, // New node is source, this is target
        distance: calculateDistance(newNode.position, closest.position),
      });
    }
  }

  // Find nodes that can connect TO the new node (as target)
  if (newNodeType === 'action' || newNodeType === 'connector') {
    const validSources = nearbyNodes.filter((node) =>
      areNodesCompatible(node.data.type, newNodeType)
    );

    if (validSources.length > 0) {
      // Sort by distance and take the closest
      const closest = validSources.sort(
        (a, b) =>
          calculateDistance(newNode.position, a.position) -
          calculateDistance(newNode.position, b.position)
      )[0];

      // Avoid duplicate connection if already added
      if (!candidates.find((c) => c.id === closest.id)) {
        candidates.push({
          id: closest.id,
          isSource: true, // This node is source, new node is target
          distance: calculateDistance(newNode.position, closest.position),
        });
      }
    }
  }

  // Limit to maximum 2 auto-connections (1 incoming, 1 outgoing)
  return candidates.slice(0, 2);
};



