import { useCallback } from 'react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { ComponentDefinition } from '../types/workflow';

interface UseDragAndDropProps {
  onNodeCreated: (node: { id: string; type: string; position: XYPosition; data: ComponentDefinition }) => void;
}

export const useDragAndDrop = ({ onNodeCreated }: UseDragAndDropProps) => {
  const { screenToFlowPosition } = useReactFlow();

  const onDragStart = useCallback((event: React.DragEvent, component: ComponentDefinition) => {
    try {
      event.dataTransfer.setData('application/reactflow', JSON.stringify(component));
      event.dataTransfer.effectAllowed = 'move';
    } catch (error) {
      console.error('Error setting drag data:', error);
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent, nodeIdGenerator: () => string) => {
      event.preventDefault();

      const componentData = event.dataTransfer.getData('application/reactflow');
      if (!componentData) {
        return;
      }

      try {
        const component: ComponentDefinition = JSON.parse(componentData);
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode = {
          id: nodeIdGenerator(),
          type: 'workflow',
          position,
          data: {
            label: component.label,
            type: component.type,
            meta: component.meta,
            description: '',
          },
        };

        onNodeCreated(newNode);
      } catch (error) {
        console.error('Error creating node from drop:', error);
      }
    },
    [screenToFlowPosition, onNodeCreated]
  );

  return {
    onDragStart,
    onDragOver,
    onDrop,
  };
};



