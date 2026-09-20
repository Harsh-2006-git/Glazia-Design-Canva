'use client';

import React from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Trash2,
  Square,
  Circle,
  Type,
  X
} from 'lucide-react';
import { CanvasElement } from '@/types/canvas';

interface LayersPanelProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onMoveLayer: (id: string, direction: 'up' | 'down') => void;
  onToggleVisibility: (id: string) => void;
  onDeleteElement: (id: string) => void;
  onClose: () => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onMoveLayer,
  onToggleVisibility,
  onDeleteElement,
  onClose,
}) => {
  // Display layers from top (last in array) to bottom (first in array)
  const reversedElements = [...elements].reverse();

  const getIcon = (type: string) => {
    switch (type) {
      case 'rectangle':
        return <Square className="w-4 h-4 text-blue-600" />;
      case 'circle':
        return <Circle className="w-4 h-4 text-pink-600" />;
      case 'text':
        return <Type className="w-4 h-4 text-slate-800" />;
      default:
        return <Square className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLabel = (el: CanvasElement) => {
    if (el.type === 'text') {
      return el.text ? `"${el.text.slice(0, 14)}..."` : 'Text';
    }
    return `${el.type.charAt(0).toUpperCase() + el.type.slice(1)}`;
  };

  return (
    <div className="w-64 border-l border-slate-200 bg-white flex flex-col h-full select-none shadow-xs">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-sm text-slate-900">Layers</span>
          <span className="text-xs text-slate-400">({elements.length})</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          title="Close layers"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {elements.length === 0 ? (
          <div className="py-8 text-center px-4">
            <p className="text-xs text-slate-400">No elements on canvas</p>
          </div>
        ) : (
          reversedElements.map((el, revIndex) => {
            const isSelected = el.id === selectedElementId;
            const originalIndex = elements.length - 1 - revIndex;

            return (
              <div
                key={el.id}
                onClick={() => onSelectElement(el.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate flex-1 mr-2">
                  {getIcon(el.type)}
                  <span className="truncate">{getLabel(el)}</span>
                </div>

                <div className="flex items-center gap-1 opacity-80 hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                  {/* Visibility */}
                  <button
                    onClick={() => onToggleVisibility(el.id)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-white"
                    title={el.visible === false ? 'Show' : 'Hide'}
                  >
                    {el.visible === false ? <EyeOff className="w-3.5 h-3.5 text-slate-300" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>

                  {/* Move Up */}
                  <button
                    onClick={() => onMoveLayer(el.id, 'up')}
                    disabled={originalIndex === elements.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-white disabled:opacity-20"
                    title="Bring forward"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={() => onMoveLayer(el.id, 'down')}
                    disabled={originalIndex === 0}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-white disabled:opacity-20"
                    title="Send backward"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteElement(el.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-white"
                    title="Delete layer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
