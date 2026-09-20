'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
import { CanvasData, CanvasElement as ICanvasElement } from '@/types/canvas';
import { CanvasElement } from './CanvasElement';
import { SelectionTransformer } from './SelectionTransformer';

export interface CanvasStageRef {
  getStage: () => Konva.Stage | null;
  exportToDataURL: (pixelRatio?: number) => string | null;
}

interface CanvasStageProps {
  canvas: CanvasData;
  selectedElementId: string | null;
  zoom: number; // percentage, e.g. 100
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<ICanvasElement>) => void;
}

export const CanvasStage = forwardRef<CanvasStageRef, CanvasStageProps>(({
  canvas,
  selectedElementId,
  zoom,
  onSelectElement,
  onUpdateElement,
}, ref) => {
  const stageRef = useRef<Konva.Stage>(null);
  const scale = zoom / 100;

  const selectedElement = React.useMemo(() => {
    return canvas.elements.find((el) => el.id === selectedElementId) || null;
  }, [canvas.elements, selectedElementId]);

  // Expose export and stage ref methods
  useImperativeHandle(ref, () => ({
    getStage: () => stageRef.current,
    exportToDataURL: (pixelRatio = 2) => {
      const stage = stageRef.current;
      if (!stage) return null;

      // Hide the transformer during export
      const tr = stage.findOne('Transformer') as Konva.Transformer | undefined;
      const prevNodes = tr ? tr.nodes() : [];
      if (tr) {
        tr.nodes([]);
        tr.getLayer()?.batchDraw();
      }

      // The stage is rendered at canvas.width * scale pixels wide.
      // toDataURL works in the stage's pixel space, so we need to
      // pass the full scaled dimensions and adjust pixelRatio so the
      // exported image always comes out at full canvas resolution.
      const currentScale = stage.scaleX();   // == zoom/100
      const adjustedPixelRatio = pixelRatio / currentScale;

      const dataUrl = stage.toDataURL({
        x: 0,
        y: 0,
        width: canvas.width * currentScale,
        height: canvas.height * currentScale,
        pixelRatio: adjustedPixelRatio,
        mimeType: 'image/png',
      });

      // Restore transformer
      if (tr && prevNodes.length > 0) {
        tr.nodes(prevNodes);
        tr.getLayer()?.batchDraw();
      }

      return dataUrl;
    },
  }));

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // If clicked on stage background or canvas background rect, deselect
    if (e.target === e.target.getStage() || e.target.name() === 'canvas-background') {
      onSelectElement(null);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-100 flex items-center justify-center p-8 relative select-none">
      {/* Visual Canvas Paper / Board */}
      <div
        className="relative bg-white shadow-2xl transition-transform duration-75 ease-out rounded-sm"
        style={{
          width: `${canvas.width * scale}px`,
          height: `${canvas.height * scale}px`,
        }}
      >
        <Stage
          ref={stageRef}
          width={canvas.width * scale}
          height={canvas.height * scale}
          scaleX={scale}
          scaleY={scale}
          onMouseDown={handleStageClick}
          onTouchStart={handleStageClick}
        >
          <Layer>
            {/* Background Rect representing the Canvas Area */}
            <Rect
              name="canvas-background"
              x={0}
              y={0}
              width={canvas.width}
              height={canvas.height}
              fill={canvas.backgroundColor || '#ffffff'}
              listening={true}
            />

            {/* Elements in z-index order */}
            {canvas.elements.map((el) => (
              <CanvasElement
                key={el.id}
                element={el}
                isSelected={el.id === selectedElementId}
                onSelect={onSelectElement}
                onChange={onUpdateElement}
              />
            ))}

            {/* Selection Transformer */}
            <SelectionTransformer
              selectedElement={selectedElement}
              stageRef={stageRef}
              onTransformEnd={onUpdateElement}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
});

CanvasStage.displayName = 'CanvasStage';
