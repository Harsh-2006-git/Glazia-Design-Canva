'use client';

import React, { useRef } from 'react';
import { Rect, Circle, Text, Group } from 'react-konva';
import Konva from 'konva';
import { CanvasElement as ICanvasElement } from '@/types/canvas';

interface CanvasElementProps {
  element: ICanvasElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChange: (id: string, updates: Partial<ICanvasElement>) => void;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  element,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>(null);

  if (element.visible === false) {
    return null;
  }

  const commonProps = {
    id: element.id,
    x: element.x,
    y: element.y,
    rotation: element.rotation || 0,
    draggable: true,
    onClick: (e: any) => {
      e.cancelBubble = true;
      onSelect(element.id);
    },
    onTap: (e: any) => {
      e.cancelBubble = true;
      onSelect(element.id);
    },
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
      onChange(element.id, {
        x: Math.round(e.target.x()),
        y: Math.round(e.target.y()),
      });
    },
    onMouseEnter: (e: any) => {
      const container = e.target.getStage()?.container();
      if (container) {
        container.style.cursor = 'move';
      }
    },
    onMouseLeave: (e: any) => {
      const container = e.target.getStage()?.container();
      if (container) {
        container.style.cursor = 'default';
      }
    },
  };

  switch (element.type) {
    case 'rectangle':
      return (
        <Rect
          ref={shapeRef}
          {...commonProps}
          width={element.width}
          height={element.height}
          fill={element.fill}
          stroke={element.stroke || undefined}
          strokeWidth={element.strokeWidth || 0}
          cornerRadius={4}
          shadowColor="rgba(0,0,0,0.05)"
          shadowBlur={isSelected ? 0 : 4}
          shadowOffset={{ x: 0, y: 2 }}
        />
      );

    case 'circle': {
      // Use Group with top-left positioning so bounding box, x, y, width, height work uniformly with Transformer
      const radiusX = Math.max(10, element.width / 2);
      const radiusY = Math.max(10, element.height / 2);
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={element.width}
          height={element.height}
        >
          <Circle
            x={radiusX}
            y={radiusY}
            radius={Math.min(radiusX, radiusY)}
            scaleX={radiusX / Math.min(radiusX, radiusY)}
            scaleY={radiusY / Math.min(radiusX, radiusY)}
            fill={element.fill}
            stroke={element.stroke || undefined}
            strokeWidth={element.strokeWidth || 0}
            shadowColor="rgba(0,0,0,0.05)"
            shadowBlur={isSelected ? 0 : 4}
            shadowOffset={{ x: 0, y: 2 }}
          />
        </Group>
      );
    }

    case 'text':
      return (
        <Text
          ref={shapeRef}
          {...commonProps}
          width={element.width}
          text={element.text || 'Hello World'}
          fontSize={element.fontSize || 28}
          fontFamily={element.fontFamily || 'Inter, sans-serif'}
          fill={element.fill}
          stroke={element.stroke || undefined}
          strokeWidth={element.strokeWidth || 0}
          align="left"
          verticalAlign="middle"
          wrap="word"
        />
      );

    default:
      return null;
  }
};
