'use client';

import React, { useState } from 'react';
import {
  MousePointer2,
  Shapes,
  Type,
  Layers,
  Sliders,
  Save,
  Undo2,
  Redo2,
  Square,
  Circle as CircleIcon,
  Star as StarIcon,
  Triangle as TriangleIcon,
  Diamond as DiamondIcon,
  Hexagon as HexagonIcon,
  Minus,
  MoveRight,
  ChevronRight,
  Sparkles,
  X,
} from 'lucide-react';
import { ElementType, CanvasElement } from '@/types/canvas';

interface MobileToolbarProps {
  activeTool: string;
  onToolSelect: (tool: string) => void;
  onAddElement: (type: ElementType, isUnfilled?: boolean, customProps?: Partial<CanvasElement>) => void;
  onToggleLayers: () => void;
  onToggleProperties: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}

export const MobileToolbar: React.FC<MobileToolbarProps> = ({
  activeTool,
  onToolSelect,
  onAddElement,
  onToggleLayers,
  onToggleProperties,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
}) => {
  const [openSheet, setOpenSheet] = useState<'shapes' | 'text' | null>(null);

  const closeSheet = () => setOpenSheet(null);

  const handleAddShape = (type: ElementType, unfilled = false) => {
    onAddElement(type, unfilled);
    closeSheet();
    onToolSelect('select');
  };

  const handleAddText = (fontSize: number, text: string, type: ElementType = 'text') => {
    onAddElement(type, false, { fontSize, text });
    closeSheet();
    onToolSelect('select');
  };

  return (
    <>
      {/* Bottom Sheet Overlay */}
      {openSheet && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeSheet}
        />
      )}

      {/* Shapes Bottom Sheet */}
      {openSheet === 'shapes' && (
        <div className="fixed bottom-16 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Add Shape</h3>
            <button onClick={closeSheet} className="p-2 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* Filled Shapes */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Filled Shapes</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'rectangle' as ElementType, label: 'Rect', Icon: Square },
                  { type: 'circle' as ElementType, label: 'Circle', Icon: CircleIcon },
                  { type: 'star' as ElementType, label: 'Star', Icon: StarIcon },
                  { type: 'triangle' as ElementType, label: 'Triangle', Icon: TriangleIcon },
                  { type: 'diamond' as ElementType, label: 'Diamond', Icon: DiamondIcon },
                  { type: 'hexagon' as ElementType, label: 'Hexagon', Icon: HexagonIcon },
                ].map(({ type, label, Icon }) => (
                  <button
                    key={type}
                    onClick={() => handleAddShape(type, false)}
                    className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 active:scale-95 transition-all"
                  >
                    <Icon className="w-6 h-6 fill-current" />
                    <span className="text-xs font-medium text-slate-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outline Shapes */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Outline Shapes</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'rectangle' as ElementType, label: 'Outline Rect', Icon: Square },
                  { type: 'circle' as ElementType, label: 'Outline Circle', Icon: CircleIcon },
                  { type: 'star' as ElementType, label: 'Outline Star', Icon: StarIcon },
                ].map(({ type, label, Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleAddShape(type, true)}
                    className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 active:scale-95 transition-all"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-medium text-slate-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lines */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Lines & Connectors</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleAddShape('line')}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 active:scale-95 transition-all"
                >
                  <Minus className="w-5 h-5" />
                  <span className="text-sm font-medium text-slate-700">Line</span>
                </button>
                <button
                  onClick={() => handleAddShape('arrow')}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 active:scale-95 transition-all"
                >
                  <MoveRight className="w-5 h-5" />
                  <span className="text-sm font-medium text-slate-700">Arrow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Text Bottom Sheet */}
      {openSheet === 'text' && (
        <div className="fixed bottom-16 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl border-t border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Add Text</h3>
            <button onClick={closeSheet} className="p-2 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="p-5 space-y-3">
            <button
              onClick={() => handleAddText(36, 'Main Title Heading')}
              className="w-full p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-left active:scale-95 transition-all"
            >
              <span className="block text-2xl font-bold text-slate-900">Heading</span>
              <span className="text-xs text-slate-400">Large title (36px)</span>
            </button>
            <button
              onClick={() => handleAddText(24, 'Subheading Text')}
              className="w-full p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-left active:scale-95 transition-all"
            >
              <span className="block text-lg font-semibold text-slate-800">Subheading</span>
              <span className="text-xs text-slate-400">Medium header (24px)</span>
            </button>
            <button
              onClick={() => handleAddText(16, 'Body paragraph text here.')}
              className="w-full p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-left active:scale-95 transition-all"
            >
              <span className="block text-sm text-slate-700">Body Text</span>
              <span className="text-xs text-slate-400">Standard paragraph (16px)</span>
            </button>
            <button
              onClick={() => handleAddText(14, 'NEW BADGE', 'badge')}
              className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 text-left active:scale-95 transition-all flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <span className="block text-sm font-semibold text-blue-700">Badge / Callout</span>
                <span className="text-xs text-blue-400">Pill-shaped badge element</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg flex items-center h-16 select-none safe-area-pb">
        {/* Select */}
        <button
          onClick={() => { onToolSelect('select'); closeSheet(); }}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${
            activeTool === 'select' && !openSheet ? 'text-blue-600 bg-blue-50' : 'text-slate-500'
          }`}
        >
          <MousePointer2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Select</span>
        </button>

        {/* Shapes */}
        <button
          onClick={() => setOpenSheet(openSheet === 'shapes' ? null : 'shapes')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${
            openSheet === 'shapes' ? 'text-blue-600 bg-blue-50' : 'text-slate-500'
          }`}
        >
          <Shapes className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Shapes</span>
        </button>

        {/* Text */}
        <button
          onClick={() => setOpenSheet(openSheet === 'text' ? null : 'text')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${
            openSheet === 'text' ? 'text-blue-600 bg-blue-50' : 'text-slate-500'
          }`}
        >
          <Type className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Text</span>
        </button>

        {/* Undo / Redo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-slate-500 disabled:opacity-30 transition-colors"
        >
          <Undo2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Undo</span>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-slate-500 disabled:opacity-30 transition-colors"
        >
          <Redo2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Redo</span>
        </button>

        {/* Layers */}
        <button
          onClick={() => { closeSheet(); onToggleLayers(); }}
          className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-slate-500 transition-colors"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Layers</span>
        </button>

        {/* Properties */}
        <button
          onClick={() => { closeSheet(); onToggleProperties(); }}
          className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-slate-500 transition-colors"
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Props</span>
        </button>

        {/* Save */}
        <button
          onClick={onSave}
          className="flex-1 flex flex-col items-center justify-center gap-1 h-full text-emerald-600 transition-colors active:bg-emerald-50"
        >
          <Save className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Save</span>
        </button>
      </nav>
    </>
  );
};
