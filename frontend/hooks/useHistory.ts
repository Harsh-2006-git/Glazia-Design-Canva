import { useState, useCallback } from 'react';
import { CanvasElement } from '@/types/canvas';

const MAX_HISTORY = 50;

export function useHistory(initialElements: CanvasElement[] = []) {
  const [past, setPast] = useState<CanvasElement[][]>([]);
  const [future, setFuture] = useState<CanvasElement[][]>([]);

  // Record a new state into history
  const record = useCallback((newElements: CanvasElement[], currentElements: CanvasElement[]) => {
    // Only record if elements changed
    if (JSON.stringify(newElements) === JSON.stringify(currentElements)) {
      return;
    }
    setPast((prev) => {
      const updated = [...prev, JSON.parse(JSON.stringify(currentElements))];
      if (updated.length > MAX_HISTORY) {
        return updated.slice(updated.length - MAX_HISTORY);
      }
      return updated;
    });
    // Any new change clears future redo stack
    setFuture([]);
  }, []);

  const undo = useCallback((currentElements: CanvasElement[]): CanvasElement[] | null => {
    if (past.length === 0) return null;

    const previousState = past[past.length - 1];
    setPast((prev) => prev.slice(0, prev.length - 1));
    setFuture((prev) => [JSON.parse(JSON.stringify(currentElements)), ...prev]);

    return JSON.parse(JSON.stringify(previousState));
  }, [past]);

  const redo = useCallback((currentElements: CanvasElement[]): CanvasElement[] | null => {
    if (future.length === 0) return null;

    const nextState = future[0];
    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, JSON.parse(JSON.stringify(currentElements))]);

    return JSON.parse(JSON.stringify(nextState));
  }, [future]);

  const clearHistory = useCallback(() => {
    setPast([]);
    setFuture([]);
  }, []);

  return {
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    record,
    undo,
    redo,
    clearHistory
  };
}
