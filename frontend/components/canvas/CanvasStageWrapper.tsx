'use client';

import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { CanvasStageRef } from './CanvasStage';
import type { CanvasData, CanvasElement } from '@/types/canvas';

interface CanvasStageWrapperProps {
  canvas: CanvasData;
  selectedElementId: string | null;
  zoom: number;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
}

/**
 * Wrapper that lazy-loads CanvasStage (Konva) on the client only,
 * while correctly forwarding refs — which next/dynamic does NOT support.
 */
export const CanvasStageWrapper = forwardRef<CanvasStageRef, CanvasStageWrapperProps>(
  (props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
    const innerRef = useRef<CanvasStageRef>(null);

    // Forward all ref methods through to the inner Konva stage
    useImperativeHandle(ref, () => ({
      getStage: () => innerRef.current?.getStage() ?? null,
      exportToDataURL: (pixelRatio?: number) =>
        innerRef.current?.exportToDataURL(pixelRatio) ?? null,
    }));

    // Client-side only: import Konva Stage after mount
    useEffect(() => {
      import('./CanvasStage').then((mod) => {
        setComponent(() => mod.CanvasStage);
      });
    }, []);

    if (!Component) {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-100">
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium">Initialising Canvas Engine...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} ref={innerRef} />;
  }
);

CanvasStageWrapper.displayName = 'CanvasStageWrapper';
