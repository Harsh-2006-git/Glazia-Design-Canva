'use client';

import React from 'react';
import {
  MousePointer2,
  Square,
  Circle as CircleIcon,
  Type,
  Layers,
  Undo2,
  Redo2,
} from 'lucide-react';
import { ElementType } from '@/types/canvas';

interface ToolbarProps {
  activeTool: string;
  onToolSelect: (tool: string) => void;
  onAddElement: (type: ElementType) => void;
  isLayersOpen: boolean;
  onToggleLayers: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onToolSelect,
  onAddElement,
  isLayersOpen,
  onToggleLayers,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  return (
    <aside className="w-16 border-r border-slate-200 bg-white flex flex-col items-center py-4 gap-2 z-10 select-none shadow-xs">
      {/* Select Pointer Tool */}
      <button
        onClick={() => onToolSelect('select')}
        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
          activeTool === 'select'
            ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-xs'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title="Select & Move Tool (V)"
        aria-label="Select tool"
      >
        <MousePointer2 className="w-5 h-5" />
        <span className="text-[9px] font-semibold mt-0.5">Select</span>
      </button>

      <div className="w-8 h-px bg-slate-200 my-1" />

      {/* Shape Elements */}
      <button
        onClick={() => onAddElement('rectangle')}
        className="w-11 h-11 rounded-xl flex flex-col items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent transition-all group"
        title="Add Rectangle (R)"
        aria-label="Add rectangle"
      >
        <Square className="w-5 h-5 group-hover:scale-105 transition-transform" />
        <span className="text-[9px] font-semibold mt-0.5">Rect</span>
      </button>

      <button
        onClick={() => onAddElement('circle')}
        className="w-11 h-11 rounded-xl flex flex-col items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent transition-all group"
        title="Add Circle (C)"
        aria-label="Add circle"
      >
        <CircleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
        <span className="text-[9px] font-semibold mt-0.5">Circle</span>
      </button>

      <button
        onClick={() => onAddElement('text')}
        className="w-11 h-11 rounded-xl flex flex-col items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent transition-all group"
        title="Add Text (T)"
        aria-label="Add text"
      >
        <Type className="w-5 h-5 group-hover:scale-105 transition-transform" />
        <span className="text-[9px] font-semibold mt-0.5">Text</span>
      </button>

      <div className="w-8 h-px bg-slate-200 my-1" />

      {/* Layers Panel Toggle */}
      <button
        onClick={onToggleLayers}
        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
          isLayersOpen
            ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-xs'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title="Toggle Layers Panel"
        aria-label="Layers panel"
      >
        <Layers className="w-5 h-5" />
        <span className="text-[9px] font-semibold mt-0.5">Layers</span>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick Undo / Redo in sidebar for convenience */}
      <div className="flex flex-col gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Redo (Ctrl+Shift+Z)"
          aria-label="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
