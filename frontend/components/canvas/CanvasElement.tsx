'use client';

import React, { useRef } from 'react';
import { Rect, Circle, Text, Group, Star as KonvaStar, Line as KonvaLine, Arrow as KonvaArrow } from 'react-konva';
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

  const isUnfilled = element.fill === 'transparent' || !element.fill;
  const fillColor = isUnfilled ? undefined : element.fill;
  const strokeColor = element.stroke || (isUnfilled ? '#2563eb' : undefined);
  const strokeW = element.strokeWidth !== undefined && element.strokeWidth > 0 
    ? element.strokeWidth 
    : (element.type === 'line' || element.type === 'arrow' ? 3 : (isUnfilled ? 2 : 0));

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

  const shadowProps = {
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowBlur: isSelected ? 0 : 4,
    shadowOffset: { x: 0, y: 2 },
  };

  switch (element.type) {
    case 'rectangle':
      return (
        <Rect
          ref={shapeRef}
          {...commonProps}
          width={element.width}
          height={element.height}
          fill={fillColor}
          fillEnabled={!isUnfilled}
          stroke={strokeColor}
          strokeWidth={strokeW}
          cornerRadius={element.cornerRadius || 4}
          {...shadowProps}
        />
      );

    case 'badge':
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={element.width}
          height={element.height}
        >
          <Rect
            width={element.width}
            height={element.height}
            fill={fillColor || '#3b82f6'}
            stroke={strokeColor}
            strokeWidth={strokeW}
            cornerRadius={element.cornerRadius || 12}
            {...shadowProps}
          />
          <Text
            width={element.width}
            height={element.height}
            text={element.text || 'FEATURE BADGE'}
            fontSize={element.fontSize || 14}
            fontFamily={element.fontFamily || 'Inter, sans-serif'}
            fill="#ffffff"
            align="center"
            verticalAlign="middle"
            fontStyle="bold"
          />
        </Group>
      );

    case 'circle': {
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
            fill={fillColor}
            fillEnabled={!isUnfilled}
            stroke={strokeColor}
            strokeWidth={strokeW}
            {...shadowProps}
          />
        </Group>
      );
    }

    case 'star': {
      const w = element.width;
      const h = element.height;
      const outerR = Math.min(w, h) / 2;
      const innerR = outerR * 0.45;
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={w}
          height={h}
        >
          <KonvaStar
            x={w / 2}
            y={h / 2}
            numPoints={5}
            innerRadius={innerR}
            outerRadius={outerR}
            fill={fillColor}
            fillEnabled={!isUnfilled}
            stroke={strokeColor}
            strokeWidth={strokeW}
            {...shadowProps}
          />
        </Group>
      );
    }

    case 'triangle': {
      const w = element.width;
      const h = element.height;
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={w}
          height={h}
        >
          <KonvaLine
            points={[w / 2, 0, w, h, 0, h]}
            closed={true}
            fill={fillColor}
            fillEnabled={!isUnfilled}
            stroke={strokeColor}
            strokeWidth={strokeW}
            {...shadowProps}
          />
        </Group>
      );
    }

    case 'diamond': {
      const w = element.width;
      const h = element.height;
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={w}
          height={h}
        >
          <KonvaLine
            points={[w / 2, 0, w, h / 2, w / 2, h, 0, h / 2]}
            closed={true}
            fill={fillColor}
            fillEnabled={!isUnfilled}
            stroke={strokeColor}
            strokeWidth={strokeW}
            {...shadowProps}
          />
        </Group>
      );
    }

    case 'hexagon': {
      const w = element.width;
      const h = element.height;
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={w}
          height={h}
        >
          <KonvaLine
            points={[
              w * 0.25, 0,
              w * 0.75, 0,
              w, h * 0.5,
              w * 0.75, h,
              w * 0.25, h,
              0, h * 0.5,
            ]}
            closed={true}
            fill={fillColor}
            fillEnabled={!isUnfilled}
            stroke={strokeColor}
            strokeWidth={strokeW}
            {...shadowProps}
          />
        </Group>
      );
    }

    case 'line': {
      const lineY = Math.max(10, element.height / 2);
      const strokeC = element.stroke || (element.fill && element.fill !== 'transparent' ? element.fill : '#2563eb');
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={Math.max(element.width, 20)}
          height={Math.max(element.height, 20)}
        >
          {/* Transparent hit area so clicking anywhere near line selects it */}
          <Rect
            width={Math.max(element.width, 20)}
            height={Math.max(element.height, 20)}
            fill="transparent"
          />
          <KonvaLine
            points={[0, lineY, Math.max(element.width, 20), lineY]}
            stroke={strokeC}
            strokeWidth={strokeW || 4}
            hitStrokeWidth={25}
          />
        </Group>
      );
    }

    case 'arrow': {
      const arrowY = Math.max(10, element.height / 2);
      const strokeC = element.stroke || (element.fill && element.fill !== 'transparent' ? element.fill : '#2563eb');
      return (
        <Group
          ref={shapeRef}
          {...commonProps}
          width={Math.max(element.width, 20)}
          height={Math.max(element.height, 20)}
        >
          {/* Transparent hit area so clicking anywhere near arrow selects it */}
          <Rect
            width={Math.max(element.width, 20)}
            height={Math.max(element.height, 20)}
            fill="transparent"
          />
          <KonvaArrow
            points={[0, arrowY, Math.max(element.width, 20), arrowY]}
            pointerLength={14}
            pointerWidth={14}
            fill={strokeC}
            stroke={strokeC}
            strokeWidth={strokeW || 4}
            hitStrokeWidth={25}
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
          text={element.text || 'Sample Text'}
          fontSize={element.fontSize || 28}
          fontFamily={element.fontFamily || 'Inter, sans-serif'}
          fill={fillColor || '#111827'}
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
