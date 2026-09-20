import { useState, useCallback, useMemo } from 'react';
import { CanvasData, CanvasElement, ElementType } from '@/types/canvas';
import { useHistory } from './useHistory';

const DEFAULT_CANVAS: CanvasData = {
  name: 'Untitled Canvas',
  description: '',
  width: 1000,
  height: 650,
  backgroundColor: '#ffffff',
  elements: [],
};

export function useCanvas(initialData?: Partial<CanvasData>) {
  const [canvas, setCanvas] = useState<CanvasData>({
    ...DEFAULT_CANVAS,
    ...initialData,
  });

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string>('select');
  const [zoom, setZoom] = useState<number>(100);

  const { canUndo, canRedo, record, undo: historyUndo, redo: historyRedo, clearHistory } = useHistory(canvas.elements);

  const selectedElement = useMemo(() => {
    return canvas.elements.find((el) => el.id === selectedElementId) || null;
  }, [canvas.elements, selectedElementId]);

  // Add Element with strictly specified defaults
  const addElement = useCallback((type: ElementType) => {
    const id = `el_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let newElement: CanvasElement;

    // Slight staggering so newly created elements don't stack directly on top
    const offset = (canvas.elements.length % 5) * 20;

    switch (type) {
      case 'rectangle':
        newElement = {
          id,
          type: 'rectangle',
          x: 100 + offset,
          y: 100 + offset,
          width: 150,
          height: 100,
          rotation: 0,
          fill: '#2563eb',
          stroke: '#111827',
          strokeWidth: 0,
          visible: true,
        };
        break;

      case 'circle':
        newElement = {
          id,
          type: 'circle',
          x: 200 + offset,
          y: 150 + offset,
          width: 120, // diameter 120 (radius 60)
          height: 120,
          rotation: 0,
          fill: '#ef476f',
          stroke: '#111827',
          strokeWidth: 0,
          visible: true,
        };
        break;

      case 'text':
        newElement = {
          id,
          type: 'text',
          x: 150 + offset,
          y: 150 + offset,
          width: 200,
          height: 50,
          rotation: 0,
          fill: '#111827',
          text: 'Hello World',
          fontSize: 28,
          fontFamily: 'Inter',
          visible: true,
        };
        break;
    }

    const nextElements = [...canvas.elements, newElement];
    record(nextElements, canvas.elements);
    setCanvas((prev) => ({
      ...prev,
      elements: nextElements,
    }));
    setSelectedElementId(id);
    setActiveTool('select');
  }, [canvas.elements, record]);

  // Update an element's properties
  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>, shouldRecordHistory = true) => {
    setCanvas((prev) => {
      const nextElements = prev.elements.map((el) => {
        if (el.id === id) {
          return { ...el, ...updates };
        }
        return el;
      });

      if (shouldRecordHistory) {
        record(nextElements, prev.elements);
      }

      return {
        ...prev,
        elements: nextElements,
      };
    });
  }, [record]);

  // Delete an element
  const deleteElement = useCallback((id: string) => {
    setCanvas((prev) => {
      const nextElements = prev.elements.filter((el) => el.id !== id);
      record(nextElements, prev.elements);
      return {
        ...prev,
        elements: nextElements,
      };
    });
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  }, [record, selectedElementId]);

  // Delete currently selected element
  const deleteSelectedElement = useCallback(() => {
    if (selectedElementId) {
      deleteElement(selectedElementId);
    }
  }, [deleteElement, selectedElementId]);

  // Select / deselect
  const selectElement = useCallback((id: string | null) => {
    setSelectedElementId(id);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedElementId(null);
  }, []);

  // Canvas-level property updates (name, backgroundColor, width, height, etc.)
  const updateCanvasMeta = useCallback((updates: Partial<CanvasData>) => {
    setCanvas((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Layer reordering (Bonus feature 1)
  const moveLayer = useCallback((id: string, direction: 'up' | 'down' | 'top' | 'bottom') => {
    setCanvas((prev) => {
      const index = prev.elements.findIndex((el) => el.id === id);
      if (index === -1) return prev;

      const elements = [...prev.elements];
      const [item] = elements.splice(index, 1);

      if (direction === 'up' && index < elements.length) {
        elements.splice(index + 1, 0, item);
      } else if (direction === 'down' && index > 0) {
        elements.splice(index - 1, 0, item);
      } else if (direction === 'top') {
        elements.push(item);
      } else if (direction === 'bottom') {
        elements.unshift(item);
      } else {
        elements.splice(index, 0, item);
      }

      record(elements, prev.elements);
      return {
        ...prev,
        elements,
      };
    });
  }, [record]);

  // Toggle element visibility
  const toggleVisibility = useCallback((id: string) => {
    setCanvas((prev) => {
      const nextElements = prev.elements.map((el) => {
        if (el.id === id) {
          return { ...el, visible: el.visible !== false ? false : true };
        }
        return el;
      });
      return {
        ...prev,
        elements: nextElements,
      };
    });
  }, []);

  // Undo / Redo
  const undo = useCallback(() => {
    const previousElements = historyUndo(canvas.elements);
    if (previousElements) {
      setCanvas((prev) => ({
        ...prev,
        elements: previousElements,
      }));
    }
  }, [historyUndo, canvas.elements]);

  const redo = useCallback(() => {
    const nextElements = historyRedo(canvas.elements);
    if (nextElements) {
      setCanvas((prev) => ({
        ...prev,
        elements: nextElements,
      }));
    }
  }, [historyRedo, canvas.elements]);

  // Load a canvas document from DB
  const loadCanvas = useCallback((data: CanvasData) => {
    setCanvas({
      _id: data._id,
      name: data.name || 'Untitled Canvas',
      description: data.description || '',
      width: data.width || 1000,
      height: data.height || 650,
      backgroundColor: data.backgroundColor || '#ffffff',
      elements: data.elements || [],
      thumbnail: data.thumbnail || '',
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    setSelectedElementId(null);
    clearHistory();
  }, [clearHistory]);

  // Reset to blank canvas
  const resetCanvas = useCallback(() => {
    setCanvas(DEFAULT_CANVAS);
    setSelectedElementId(null);
    clearHistory();
  }, [clearHistory]);

  return {
    canvas,
    selectedElementId,
    selectedElement,
    activeTool,
    setActiveTool,
    zoom,
    setZoom,
    canUndo,
    canRedo,
    addElement,
    updateElement,
    deleteElement,
    deleteSelectedElement,
    selectElement,
    clearSelection,
    updateCanvasMeta,
    moveLayer,
    toggleVisibility,
    undo,
    redo,
    loadCanvas,
    resetCanvas,
    setCanvas,
  };
}
