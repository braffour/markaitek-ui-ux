import { ComponentDefinition, WorkflowNode } from '../types/workflow';
import { Edge } from '@xyflow/react';

export const COMPONENT_LIBRARY: ComponentDefinition[] = [
  { id: 'trig-1', label: 'Webhook Listener', type: 'trigger', meta: 'Ext. Access' },
  { id: 'act-1', label: 'Transform JSON', type: 'action', meta: 'Safe' },
  { id: 'act-2', label: 'PostgreSQL Query', type: 'action', meta: 'Read-Only' },
  { id: 'conn-1', label: 'Slack Notification', type: 'connector', meta: 'PII Check' },
];

export const INITIAL_NODES: WorkflowNode[] = [
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

export const INITIAL_EDGES: Edge[] = [
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



