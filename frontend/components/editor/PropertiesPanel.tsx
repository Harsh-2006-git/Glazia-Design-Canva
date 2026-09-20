'use client';

import React from 'react';
import {
  Trash2,
  Sliders,
  Move,
  Maximize2,
  RotateCw,
  Palette,
  Type as TypeIcon,
  Layout
} from 'lucide-react';
import { CanvasData, CanvasElement } from '@/types/canvas';
import { Button } from '@/components/ui/Button';

interface PropertiesPanelProps {
  selectedElement: CanvasElement | null;
  canvas: CanvasData;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  onDeleteSelected: () => void;
  onUpdateCanvasMeta: (updates: Partial<CanvasData>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedElement,
  canvas,
  onUpdateElement,
  onDeleteSelected,
  onUpdateCanvasMeta,
}) => {
  // If no element is selected, show Canvas settings
  if (!selectedElement) {
    return (
      <aside className="w-72 border-l border-slate-200 bg-white flex flex-col h-full overflow-y-auto select-none p-5 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm mb-1">
            <Layout className="w-4 h-4 text-blue-600" />
            <span>Canvas Settings</span>
          </div>
          <p className="text-xs text-slate-500">
            No element selected. Configure your canvas dimensions and background.
          </p>
        </div>

        {/* Canvas Dimensions */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Canvas Dimensions
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Width (px)</span>
              <input
                type="number"
                min="200"
                max="3000"
                value={canvas.width}
                onChange={(e) => onUpdateCanvasMeta({ width: Math.max(200, Number(e.target.value) || 200) })}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Height (px)</span>
              <input
                type="number"
                min="200"
                max="3000"
                value={canvas.height}
                onChange={(e) => onUpdateCanvasMeta({ height: Math.max(200, Number(e.target.value) || 200) })}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Canvas Background Color */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Background Color
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              value={canvas.backgroundColor || '#ffffff'}
              onChange={(e) => onUpdateCanvasMeta({ backgroundColor: e.target.value })}
              className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={canvas.backgroundColor || '#ffffff'}
              onChange={(e) => onUpdateCanvasMeta({ backgroundColor: e.target.value })}
              className="flex-1 px-2.5 py-1.5 text-xs uppercase font-mono bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1.5">
          <p className="text-xs font-semibold text-blue-900">Editor Shortcuts</p>
          <ul className="text-[11px] text-blue-700 space-y-1">
            <li>• <kbd className="bg-white px-1 py-0.5 rounded border border-blue-200">Delete</kbd> removes selected element</li>
            <li>• <kbd className="bg-white px-1 py-0.5 rounded border border-blue-200">Ctrl + Z</kbd> undoes last action</li>
            <li>• <kbd className="bg-white px-1 py-0.5 rounded border border-blue-200">Ctrl + S</kbd> saves canvas</li>
            <li>• Drag handles to resize or rotate</li>
          </ul>
        </div>
      </aside>
    );
  }

  const handleChange = (key: keyof CanvasElement, value: any) => {
    onUpdateElement(selectedElement.id, { [key]: value });
  };

  return (
    <aside className="w-72 border-l border-slate-200 bg-white flex flex-col h-full overflow-y-auto select-none p-5 space-y-5">
      {/* Header with Type Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-sm text-slate-900">Properties</span>
        </div>
        <span className="text-[11px] font-semibold uppercase px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
          {selectedElement.type}
        </span>
      </div>

      {/* Position X, Y */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
          <Move className="w-3.5 h-3.5 text-slate-400" />
          <span>Position</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1">X</span>
            <input
              type="number"
              value={Math.round(selectedElement.x)}
              onChange={(e) => handleChange('x', Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1">Y</span>
            <input
              type="number"
              value={Math.round(selectedElement.y)}
              onChange={(e) => handleChange('y', Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Size: Width, Height */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Dimensions</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1">
              {selectedElement.type === 'circle' ? 'Diameter' : 'Width'}
            </span>
            <input
              type="number"
              min="20"
              value={Math.round(selectedElement.width)}
              onChange={(e) => {
                const val = Math.max(20, Number(e.target.value) || 20);
                if (selectedElement.type === 'circle') {
                  onUpdateElement(selectedElement.id, { width: val, height: val });
                } else {
                  handleChange('width', val);
                }
              }}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1">
              {selectedElement.type === 'circle' ? 'Height' : 'Height'}
            </span>
            <input
              type="number"
              min="20"
              value={Math.round(selectedElement.height)}
              onChange={(e) => {
                const val = Math.max(20, Number(e.target.value) || 20);
                if (selectedElement.type === 'circle') {
                  onUpdateElement(selectedElement.id, { width: val, height: val });
                } else {
                  handleChange('height', val);
                }
              }}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Rotation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <RotateCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Rotation</span>
          </div>
          <span className="text-xs font-mono text-slate-600">{Math.round(selectedElement.rotation || 0)}°</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="360"
            value={Math.round(selectedElement.rotation || 0)}
            onChange={(e) => handleChange('rotation', Number(e.target.value))}
            className="flex-1 accent-blue-600 cursor-pointer"
          />
          <input
            type="number"
            min="0"
            max="360"
            value={Math.round(selectedElement.rotation || 0)}
            onChange={(e) => handleChange('rotation', (Number(e.target.value) || 0) % 360)}
            className="w-16 px-2 py-1 text-xs text-center font-mono bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Typography settings for Text elements */}
      {selectedElement.type === 'text' && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <TypeIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Text Content</span>
          </div>
          <textarea
            rows={2}
            value={selectedElement.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Enter text..."
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Font Size</span>
              <input
                type="number"
                min="8"
                max="200"
                value={selectedElement.fontSize || 28}
                onChange={(e) => handleChange('fontSize', Math.max(8, Number(e.target.value) || 8))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 block mb-1">Font Family</span>
              <select
                value={selectedElement.fontFamily || 'Inter'}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier</option>
                <option value="Impact">Impact</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Colors & Appearance */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5 text-slate-400" />
          <span>Appearance</span>
        </div>

        {/* Fill Color */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 block">Fill Color</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedElement.fill || '#2563eb'}
              onChange={(e) => handleChange('fill', e.target.value)}
              className="w-8 h-8 rounded-md border border-slate-200 cursor-pointer p-0.5 flex-shrink-0"
            />
            <input
              type="text"
              value={selectedElement.fill || '#2563eb'}
              onChange={(e) => handleChange('fill', e.target.value)}
              className="flex-1 px-2.5 py-1.5 text-xs uppercase font-mono bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stroke / Outline */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 block">Border / Stroke</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={selectedElement.stroke || '#111827'}
                onChange={(e) => handleChange('stroke', e.target.value)}
                className="w-7 h-7 rounded-md border border-slate-200 cursor-pointer p-0.5 flex-shrink-0"
              />
              <input
                type="text"
                value={selectedElement.stroke || ''}
                placeholder="none"
                onChange={(e) => handleChange('stroke', e.target.value)}
                className="w-full px-2 py-1 text-xs font-mono uppercase bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="20"
                value={selectedElement.strokeWidth || 0}
                placeholder="Width"
                onChange={(e) => handleChange('strokeWidth', Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Element Button */}
      <div className="pt-4 border-t border-slate-100">
        <Button
          variant="danger"
          size="sm"
          onClick={onDeleteSelected}
          icon={<Trash2 className="w-4 h-4" />}
          className="w-full"
        >
          Delete Element
        </Button>
      </div>
    </aside>
  );
};
