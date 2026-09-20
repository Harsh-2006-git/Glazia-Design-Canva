'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { TopBar } from '@/components/editor/TopBar';
import { Toolbar } from '@/components/editor/Toolbar';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { LayersPanel } from '@/components/editor/LayersPanel';
import { SaveModal } from '@/components/editor/SaveModal';
import { LoadModal } from '@/components/editor/LoadModal';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCanvas } from '@/hooks/useCanvas';
import { getCanvas, createCanvas, updateCanvas, deleteCanvas } from '@/lib/api';
import { CanvasData } from '@/types/canvas';
import { CanvasStageRef } from '@/components/canvas/CanvasStage';
import { Loader2, AlertTriangle } from 'lucide-react';

// Dynamic import with ssr: false for Konva Stage to prevent SSR/window errors
const CanvasStage = dynamic(
  () => import('@/components/canvas/CanvasStage').then((mod) => mod.CanvasStage),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Initializing Glazia Canvas Engine...</p>
        </div>
      </div>
    ),
  }
);

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const canvasId = params?.id as string;

  const stageComponentRef = useRef<CanvasStageRef>(null);

  // Canvas State & Operations
  const {
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
  } = useCanvas();

  // Editor UI state
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoadingCanvas, setIsLoadingCanvas] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Debounced Autosave ref
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show transient toast
  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  // Load existing canvas on mount if ID is not "new"
  useEffect(() => {
    if (canvasId && canvasId !== 'new') {
      setIsLoadingCanvas(true);
      getCanvas(canvasId)
        .then((res) => {
          if (res.success && res.data) {
            loadCanvas(res.data);
            setSaveStatus('saved');
          } else {
            showToast('error', res.message || 'Failed to load canvas');
          }
        })
        .catch(() => {
          showToast('error', 'Network error connecting to backend API');
        })
        .finally(() => {
          setIsLoadingCanvas(false);
        });
    } else {
      resetCanvas();
      setSaveStatus('saved');
    }
  }, [canvasId, loadCanvas, resetCanvas]);

  // Debounced Autosave (Bonus feature 3)
  useEffect(() => {
    // Only autosave for canvases that have already been created in MongoDB
    if (!canvas._id) return;

    setSaveStatus('unsaved');

    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }

    autosaveTimeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      const res = await updateCanvas(canvas._id!, {
        name: canvas.name,
        description: canvas.description,
        width: canvas.width,
        height: canvas.height,
        backgroundColor: canvas.backgroundColor,
        elements: canvas.elements,
      });

      if (res.success) {
        setSaveStatus('saved');
      } else {
        setSaveStatus('unsaved');
      }
    }, 1500);

    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [canvas.name, canvas.description, canvas.width, canvas.height, canvas.backgroundColor, canvas.elements, canvas._id]);

  // Keyboard Shortcuts (Section 60)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept shortcuts when typing in inputs/textareas
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      // Delete / Backspace -> delete selected element
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId) {
          e.preventDefault();
          deleteSelectedElement();
        }
      }

      // Escape -> clear selection
      if (e.key === 'Escape') {
        clearSelection();
      }

      // Ctrl + Z -> Undo
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        if (canUndo) undo();
      }

      // Ctrl + Shift + Z or Ctrl + Y -> Redo
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z')) ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y'))
      ) {
        e.preventDefault();
        if (canRedo) redo();
      }

      // Ctrl + S -> Save
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleSaveTrigger();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, deleteSelectedElement, clearSelection, canUndo, canRedo, undo, redo]);

  // Save Trigger
  const handleSaveTrigger = () => {
    if (!canvas._id) {
      // Prompt modal for canvas title & description on first save
      setIsSaveModalOpen(true);
    } else {
      // Quick update existing
      handleDirectSave();
    }
  };

  const handleDirectSave = async () => {
    if (!canvas._id) {
      setIsSaveModalOpen(true);
      return;
    }
    setIsSaving(true);
    setSaveStatus('saving');
    const res = await updateCanvas(canvas._id, {
      name: canvas.name,
      description: canvas.description,
      width: canvas.width,
      height: canvas.height,
      backgroundColor: canvas.backgroundColor,
      elements: canvas.elements,
    });
    setIsSaving(false);

    if (res.success && res.data) {
      setSaveStatus('saved');
      showToast('success', 'Canvas updated successfully!');
    } else {
      setSaveStatus('unsaved');
      showToast('error', res.message || 'Failed to save canvas');
    }
  };

  const handleModalSave = async (name: string, description: string) => {
    setIsSaving(true);
    setSaveStatus('saving');

    if (canvas._id) {
      // Update existing
      const res = await updateCanvas(canvas._id, {
        name,
        description,
        width: canvas.width,
        height: canvas.height,
        backgroundColor: canvas.backgroundColor,
        elements: canvas.elements,
      });
      setIsSaving(false);
      setIsSaveModalOpen(false);

      if (res.success && res.data) {
        updateCanvasMeta({ name, description });
        setSaveStatus('saved');
        showToast('success', 'Canvas updated successfully!');
      } else {
        setSaveStatus('unsaved');
        showToast('error', res.message || 'Failed to update canvas');
      }
    } else {
      // Create new document in MongoDB
      const res = await createCanvas({
        name,
        description,
        width: canvas.width,
        height: canvas.height,
        backgroundColor: canvas.backgroundColor,
        elements: canvas.elements,
      });
      setIsSaving(false);
      setIsSaveModalOpen(false);

      if (res.success && res.data) {
        setCanvas((prev) => ({
          ...prev,
          _id: res.data!._id,
          name: res.data!.name,
          description: res.data!.description,
        }));
        setSaveStatus('saved');
        showToast('success', 'Canvas saved successfully!');
        // Update URL to newly created ID
        router.replace(`/editor/${res.data._id}`);
      } else {
        setSaveStatus('unsaved');
        showToast('error', res.message || 'Failed to save canvas');
      }
    }
  };

  // Delete Canvas action
  const handleConfirmDelete = async () => {
    if (!canvas._id) {
      resetCanvas();
      setIsDeleteModalOpen(false);
      router.push('/canvases');
      return;
    }

    setIsDeleting(true);
    const res = await deleteCanvas(canvas._id);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);

    if (res.success) {
      router.push('/canvases');
    } else {
      showToast('error', res.message || 'Failed to delete canvas');
    }
  };

  // PNG Export (Bonus feature 4)
  const handleExportPNG = () => {
    if (!stageComponentRef.current) return;
    const dataUrl = stageComponentRef.current.exportToDataURL(2);
    if (!dataUrl) {
      showToast('error', 'Unable to export canvas');
      return;
    }

    const link = document.createElement('a');
    link.download = `${canvas.name.toLowerCase().replace(/\s+/g, '_') || 'canvas'}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'PNG exported successfully!');
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden font-sans">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-3 ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-red-600 text-white border-red-500'
          }`}
        >
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Editor Top Bar */}
      <TopBar
        canvasName={canvas.name}
        onCanvasNameChange={(name) => updateCanvasMeta({ name })}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onSaveClick={handleSaveTrigger}
        onLoadClick={() => setIsLoadModalOpen(true)}
        onDeleteClick={() => setIsDeleteModalOpen(true)}
        onExportClick={handleExportPNG}
        isSaving={isSaving}
        saveStatus={saveStatus}
        zoom={zoom}
        onZoomChange={setZoom}
        canvasId={canvas._id}
      />

      {/* Main Workspace Layout: Toolbar | Canvas Stage | Properties / Layers */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Toolbar */}
        <Toolbar
          activeTool={activeTool}
          onToolSelect={setActiveTool}
          onAddElement={addElement}
          isLayersOpen={isLayersOpen}
          onToggleLayers={() => setIsLayersOpen(!isLayersOpen)}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
        />

        {/* Center Canvas Stage */}
        {isLoadingCanvas ? (
          <div className="flex-1 flex items-center justify-center bg-slate-100">
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm font-medium">Loading canvas from MongoDB...</p>
            </div>
          </div>
        ) : (
          <CanvasStage
            ref={stageComponentRef}
            canvas={canvas}
            selectedElementId={selectedElementId}
            zoom={zoom}
            onSelectElement={selectElement}
            onUpdateElement={updateElement}
          />
        )}

        {/* Optional Layers Drawer */}
        {isLayersOpen && (
          <LayersPanel
            elements={canvas.elements}
            selectedElementId={selectedElementId}
            onSelectElement={selectElement}
            onMoveLayer={moveLayer}
            onToggleVisibility={toggleVisibility}
            onDeleteElement={deleteElement}
            onClose={() => setIsLayersOpen(false)}
          />
        )}

        {/* Right Properties Panel */}
        <PropertiesPanel
          selectedElement={selectedElement}
          canvas={canvas}
          onUpdateElement={updateElement}
          onDeleteSelected={deleteSelectedElement}
          onUpdateCanvasMeta={updateCanvasMeta}
        />
      </div>

      {/* Save Modal */}
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleModalSave}
        initialName={canvas.name}
        initialDescription={canvas.description}
        isSaving={isSaving}
      />

      {/* Load Modal */}
      <LoadModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        onSelectCanvas={(selected) => {
          loadCanvas(selected);
          router.replace(`/editor/${selected._id}`);
          showToast('success', `Loaded "${selected.name}"`);
        }}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Canvas?"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-800 text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Are you sure you want to delete &ldquo;{canvas.name}&rdquo;?</p>
              <p className="text-xs text-red-700 mt-1">This action cannot be undone and will permanently remove this canvas.</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleConfirmDelete}
              isLoading={isDeleting}
            >
              Delete Canvas
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
