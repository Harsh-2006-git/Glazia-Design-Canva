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

  // Add Element with support for filled/unfilled and extended shapes
  const addElement = useCallback((type: ElementType, isUnfilled: boolean = false, customProps?: Partial<CanvasElement>) => {
    const id = `el_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let newElement: CanvasElement;

    // Slight staggering so newly created elements don't stack directly on top
    const offset = (canvas.elements.length % 5) * 20;
    const defaultFill = isUnfilled ? 'transparent' : '#2563eb';
    const defaultStroke = isUnfilled ? '#2563eb' : undefined;
    const defaultStrokeWidth = isUnfilled ? 2 : 0;

    // Helper: place element centered on the canvas
    const cx = (w: number) => Math.round(canvas.width / 2 - w / 2) + offset;
    const cy = (h: number) => Math.round(canvas.height / 2 - h / 2) + offset;

    switch (type) {
      case 'rectangle': {
        const w = 150, h = 100;
        newElement = {
          id, type: 'rectangle',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: defaultFill, stroke: defaultStroke, strokeWidth: defaultStrokeWidth,
          cornerRadius: 4, visible: true,
          ...customProps,
        };
        break;
      }

      case 'circle': {
        const w = 120, h = 120;
        newElement = {
          id, type: 'circle',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: isUnfilled ? 'transparent' : '#ef4444',
          stroke: isUnfilled ? '#ef4444' : undefined,
          strokeWidth: defaultStrokeWidth, visible: true,
          ...customProps,
        };
        break;
      }

      case 'star': {
        const w = 120, h = 120;
        newElement = {
          id, type: 'star',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: isUnfilled ? 'transparent' : '#f59e0b',
          stroke: isUnfilled ? '#f59e0b' : undefined,
          strokeWidth: defaultStrokeWidth, visible: true,
          ...customProps,
        };
        break;
      }

      case 'triangle': {
        const w = 130, h = 120;
        newElement = {
          id, type: 'triangle',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: isUnfilled ? 'transparent' : '#10b981',
          stroke: isUnfilled ? '#10b981' : undefined,
          strokeWidth: defaultStrokeWidth, visible: true,
          ...customProps,
        };
        break;
      }

      case 'diamond': {
        const w = 120, h = 120;
        newElement = {
          id, type: 'diamond',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: isUnfilled ? 'transparent' : '#8b5cf6',
          stroke: isUnfilled ? '#8b5cf6' : undefined,
          strokeWidth: defaultStrokeWidth, visible: true,
          ...customProps,
        };
        break;
      }

      case 'hexagon': {
        const w = 130, h = 120;
        newElement = {
          id, type: 'hexagon',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: isUnfilled ? 'transparent' : '#ec4899',
          stroke: isUnfilled ? '#ec4899' : undefined,
          strokeWidth: defaultStrokeWidth, visible: true,
          ...customProps,
        };
        break;
      }

      case 'line': {
        const w = 200, h = 20;
        newElement = {
          id, type: 'line',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: 'transparent', stroke: '#2563eb', strokeWidth: 3, visible: true,
          ...customProps,
        };
        break;
      }

      case 'arrow': {
        const w = 200, h = 20;
        newElement = {
          id, type: 'arrow',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: 'transparent', stroke: '#2563eb', strokeWidth: 3, visible: true,
          ...customProps,
        };
        break;
      }

      case 'badge': {
        const w = 160, h = 44;
        newElement = {
          id, type: 'badge',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: '#3b82f6', stroke: undefined, strokeWidth: 0,
          text: 'NEW FEATURE', fontSize: 13, cornerRadius: 12, visible: true,
          ...customProps,
        };
        break;
      }

      case 'text':
      default: {
        const w = 240, h = 50;
        newElement = {
          id, type: 'text',
          x: cx(w), y: cy(h), width: w, height: h,
          rotation: 0,
          fill: '#111827', text: customProps?.text || 'Heading Text',
          fontSize: 28, fontFamily: 'Inter', visible: true,
          ...customProps,
        };
        break;
      }
    }

    const nextElements = [...canvas.elements, newElement];
    record(nextElements, canvas.elements);
    setCanvas((prev) => ({
      ...prev,
      elements: nextElements,
    }));
    setSelectedElementId(id);
    setActiveTool('select');
  }, [canvas.elements, canvas.width, canvas.height, record]);

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

  // Layer reordering
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
