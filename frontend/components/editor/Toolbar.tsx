'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MousePointer2,
  Square,
  Circle as CircleIcon,
  Star as StarIcon,
  Triangle as TriangleIcon,
  Diamond as DiamondIcon,
  Hexagon as HexagonIcon,
  MoveRight,
  Minus,
  Type,
  Layers,
  Undo2,
  Redo2,
  Shapes,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { ElementType, CanvasElement } from '@/types/canvas';

interface ToolbarProps {
  activeTool: string;
  onToolSelect: (tool: string) => void;
  onAddElement: (type: ElementType, isUnfilled?: boolean, customProps?: Partial<CanvasElement>) => void;
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
  const [activeMenu, setActiveMenu] = useState<'shapes' | 'text' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectShape = (type: ElementType, isUnfilled: boolean = false) => {
    onAddElement(type, isUnfilled);
    setActiveMenu(null);
  };

  const handleSelectTextPreset = (fontSize: number, text: string, type: ElementType = 'text') => {
    onAddElement(type, false, { fontSize, text });
    setActiveMenu(null);
  };

  return (
    <aside className="w-16 border-r border-slate-200 bg-white flex flex-col items-center py-4 gap-2 z-30 select-none shadow-xs relative" ref={menuRef}>
      {/* Select Pointer Tool */}
      <button
        onClick={() => {
          onToolSelect('select');
          setActiveMenu(null);
        }}
        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
          activeTool === 'select' && !activeMenu
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

      {/* Shapes Flyout Menu Button */}
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === 'shapes' ? null : 'shapes')}
          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeMenu === 'shapes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent'
          }`}
          title="Add Shapes & Lines"
          aria-label="Shapes menu"
        >
          <Shapes className="w-5 h-5" />
          <span className="text-[9px] font-semibold mt-0.5">Shapes</span>
        </button>

        {/* Shapes Menu Dropdown */}
        {activeMenu === 'shapes' && (
          <div className="absolute left-16 top-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-4 z-50 animate-in fade-in slide-in-from-left-2">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Filled Shapes</span>
                <span className="text-[10px] text-slate-400 font-normal">Solid fill</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSelectShape('rectangle', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Filled Rectangle"
                >
                  <Square className="w-5 h-5 fill-current" />
                  <span className="text-[10px]">Rect</span>
                </button>
                <button
                  onClick={() => handleSelectShape('circle', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Filled Circle"
                >
                  <CircleIcon className="w-5 h-5 fill-current" />
                  <span className="text-[10px]">Circle</span>
                </button>
                <button
                  onClick={() => handleSelectShape('star', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Filled Star"
                >
                  <StarIcon className="w-5 h-5 fill-current" />
                  <span className="text-[10px]">Star</span>
                </button>
                <button
                  onClick={() => handleSelectShape('triangle', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Filled Triangle"
                >
                  <TriangleIcon className="w-5 h-5 fill-current" />
                  <span className="text-[10px]">Triangle</span>
                </button>
                <button
                  onClick={() => handleSelectShape('diamond', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Filled Diamond"
                >
                  <DiamondIcon className="w-5 h-5 fill-current" />
                  <span className="text-[10px]">Diamond</span>
                </button>
                <button
                  onClick={() => handleSelectShape('hexagon', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Filled Hexagon"
                >
                  <HexagonIcon className="w-5 h-5 fill-current" />
                  <span className="text-[10px]">Hexagon</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Unfilled Shapes</span>
                <span className="text-[10px] text-slate-400 font-normal">Outline stroke</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSelectShape('rectangle', true)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Unfilled Rectangle"
                >
                  <Square className="w-5 h-5" />
                  <span className="text-[10px]">Outline Rect</span>
                </button>
                <button
                  onClick={() => handleSelectShape('circle', true)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Unfilled Circle"
                >
                  <CircleIcon className="w-5 h-5" />
                  <span className="text-[10px]">Outline Circle</span>
                </button>
                <button
                  onClick={() => handleSelectShape('star', true)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Unfilled Star"
                >
                  <StarIcon className="w-5 h-5" />
                  <span className="text-[10px]">Outline Star</span>
                </button>
                <button
                  onClick={() => handleSelectShape('triangle', true)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Unfilled Triangle"
                >
                  <TriangleIcon className="w-5 h-5" />
                  <span className="text-[10px]">Outline Tri</span>
                </button>
                <button
                  onClick={() => handleSelectShape('diamond', true)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Unfilled Diamond"
                >
                  <DiamondIcon className="w-5 h-5" />
                  <span className="text-[10px]">Outline Dia</span>
                </button>
                <button
                  onClick={() => handleSelectShape('hexagon', true)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex flex-col items-center gap-1 transition-all text-xs font-medium text-slate-700"
                  title="Unfilled Hexagon"
                >
                  <HexagonIcon className="w-5 h-5" />
                  <span className="text-[10px]">Outline Hex</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Lines & Connectors</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectShape('line', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-all text-xs font-medium text-slate-700"
                >
                  <Minus className="w-4 h-4" />
                  <span>Line</span>
                </button>
                <button
                  onClick={() => handleSelectShape('arrow', false)}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-all text-xs font-medium text-slate-700"
                >
                  <MoveRight className="w-4 h-4" />
                  <span>Arrow</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text & Content Flyout Menu Button */}
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === 'text' ? null : 'text')}
          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeMenu === 'text'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent'
          }`}
          title="Add Text & Badges"
          aria-label="Text menu"
        >
          <Type className="w-5 h-5" />
          <span className="text-[9px] font-semibold mt-0.5">Text</span>
        </button>

        {/* Text Menu Dropdown */}
        {activeMenu === 'text' && (
          <div className="absolute left-16 top-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-left-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Text & Presets</h4>
            
            <button
              onClick={() => handleSelectTextPreset(36, 'Main Title Heading')}
              className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex items-center justify-between text-left transition-all group"
            >
              <div>
                <span className="block text-sm font-bold text-slate-900 group-hover:text-blue-600">Heading</span>
                <span className="text-[10px] text-slate-400">Large title text (36px)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </button>

            <button
              onClick={() => handleSelectTextPreset(24, 'Subheading Text')}
              className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex items-center justify-between text-left transition-all group"
            >
              <div>
                <span className="block text-xs font-semibold text-slate-800 group-hover:text-blue-600">Subheading</span>
                <span className="text-[10px] text-slate-400">Medium header (24px)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </button>

            <button
              onClick={() => handleSelectTextPreset(16, 'Body paragraph text content goes here.')}
              className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 flex items-center justify-between text-left transition-all group"
            >
              <div>
                <span className="block text-xs font-normal text-slate-700 group-hover:text-blue-600">Body Text</span>
                <span className="text-[10px] text-slate-400 font-normal">Standard text (16px)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </button>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleSelectTextPreset(14, 'NEW BADGE', 'badge')}
                className="w-full p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl border border-blue-200 flex items-center gap-2 text-xs font-semibold transition-all"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Add Badge / Callout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-8 h-px bg-slate-200 my-1" />

      {/* Layers Panel Toggle */}
      <button
        onClick={() => {
          onToggleLayers();
          setActiveMenu(null);
        }}
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

      {/* Quick Undo / Redo */}
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
