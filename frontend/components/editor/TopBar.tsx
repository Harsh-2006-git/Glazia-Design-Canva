'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Save,
  FolderOpen,
  Trash2,
  Undo2,
  Redo2,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TopBarProps {
  canvasName: string;
  onCanvasNameChange: (name: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
  onDeleteClick: () => void;
  onExportClick: () => void;
  isSaving: boolean;
  saveStatus?: 'saved' | 'saving' | 'unsaved';
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  canvasId?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  canvasName,
  onCanvasNameChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSaveClick,
  onLoadClick,
  onDeleteClick,
  onExportClick,
  isSaving,
  saveStatus = 'saved',
  zoom,
  onZoomChange,
  canvasId,
}) => {
  return (
    <header className="h-12 md:h-16 border-b border-slate-200 bg-white px-2 md:px-4 flex items-center justify-between gap-2 md:gap-4 z-20 select-none shadow-xs">
      {/* Left: Brand Logo & Navigation */}
      <div className="flex items-center gap-1.5 md:gap-3">
        <Link
          href="/canvases"
          className="flex items-center gap-1 p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Back to My Canvases"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <Link href="/" className="flex items-center gap-1.5 md:gap-2.5">
          <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-lg overflow-hidden border border-slate-200 shadow-xs flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Glazia Logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="font-bold text-base md:text-lg text-slate-900 tracking-tight hidden sm:inline">
            Glazia
          </span>
        </Link>

        <span className="text-slate-300">|</span>

        {/* Center-Left: Canvas Name input */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <input
            type="text"
            value={canvasName}
            onChange={(e) => onCanvasNameChange(e.target.value)}
            className="text-sm font-semibold text-slate-800 bg-transparent hover:bg-slate-50 focus:bg-white px-2 py-1 rounded-md border border-transparent hover:border-slate-200 focus:border-blue-400 focus:outline-none transition-all w-28 sm:w-44 md:w-64 truncate"
            placeholder="Untitled Canvas"
            title="Click to rename canvas"
          />
          {/* Status badge */}
          {saveStatus === 'saving' && (
            <span className="hidden sm:inline-flex items-center text-xs text-amber-600 font-medium gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3 animate-spin" />
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="hidden md:inline-flex items-center text-xs text-emerald-600 font-medium gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Saved
            </span>
          )}
        </div>
      </div>

      {/* Center: Zoom Controls & Undo/Redo */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-200 mx-1" />

        <button
          onClick={() => onZoomChange(Math.max(25, zoom - 10))}
          className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => onZoomChange(100)}
          className="px-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
          title="Reset Zoom (100%)"
        >
          {zoom}%
        </button>
        <button
          onClick={() => onZoomChange(Math.min(200, zoom + 10))}
          className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Actions — desktop buttons, hidden on mobile (actions are in mobile bottom bar) */}
      <div className="hidden md:flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onExportClick}
          icon={<Download className="w-4 h-4" />}
          className="hidden sm:inline-flex text-slate-700"
          title="Export Canvas as PNG"
        >
          Export PNG
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onLoadClick}
          icon={<FolderOpen className="w-4 h-4" />}
          title="Open saved canvas"
        >
          Load
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onSaveClick}
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
          title="Save canvas to MongoDB (Ctrl+S)"
        >
          Save
        </Button>

        {canvasId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteClick}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
            title="Delete this canvas"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Mobile right: just a compact save button icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={onLoadClick}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          title="Load canvas"
        >
          <FolderOpen className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
