'use client';

import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import Konva from 'konva';
import { CanvasElement } from '@/types/canvas';

interface SelectionTransformerProps {
  selectedElement: CanvasElement | null;
  stageRef: React.RefObject<Konva.Stage>;
  onTransformEnd: (id: string, updates: Partial<CanvasElement>) => void;
}

export const SelectionTransformer: React.FC<SelectionTransformerProps> = ({
  selectedElement,
  stageRef,
  onTransformEnd,
}) => {
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!trRef.current || !stageRef.current) return;

    if (!selectedElement) {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
      return;
    }

    const stage = stageRef.current;
    const selectedNode = stage.findOne(`#${selectedElement.id}`);

    if (selectedNode) {
      trRef.current.nodes([selectedNode]);
      trRef.current.getLayer()?.batchDraw();
    } else {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedElement, stageRef]);

  if (!selectedElement) return null;

  return (
    <Transformer
      ref={trRef}
      boundBoxFunc={(oldBox, newBox) => {
        // Enforce minimum dimension of 20px
        if (Math.abs(newBox.width) < 20 || Math.abs(newBox.height) < 20) {
          return oldBox;
        }
        return newBox;
      }}
      anchorCornerRadius={3}
      anchorSize={8}
      anchorStroke="#2563eb"
      anchorFill="#ffffff"
      anchorStrokeWidth={1.5}
      borderStroke="#2563eb"
      borderStrokeWidth={1.5}
      borderDash={[4, 4]}
      rotateAnchorOffset={25}
      enabledAnchors={
        selectedElement.type === 'circle'
          ? ['top-left', 'top-right', 'bottom-left', 'bottom-right']
          : ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']
      }
      onTransformEnd={() => {
        const nodes = trRef.current?.nodes();
        const node = nodes && nodes.length > 0 ? nodes[0] : null;
        if (!node || !selectedElement) return;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // Calculate normalized dimensions
        const rawWidth = node.width() * scaleX;
        const rawHeight = node.height() * scaleY;

        const newWidth = Math.max(20, Math.round(rawWidth));
        const newHeight = Math.max(20, Math.round(rawHeight));

        // Reset scale back to 1 on the Konva node so subsequent renders don't double scale
        node.scaleX(1);
        node.scaleY(1);

        const newX = Math.round(node.x());
        const newY = Math.round(node.y());
        const newRotation = Math.round(node.rotation() % 360);

        onTransformEnd(selectedElement.id, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          rotation: newRotation < 0 ? newRotation + 360 : newRotation,
        });
      }}
    />
  );
};
