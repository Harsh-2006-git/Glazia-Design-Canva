'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FolderOpen, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CanvasData } from '@/types/canvas';
import { getCanvases } from '@/lib/api';

interface LoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCanvas: (canvas: CanvasData) => void;
}

export const LoadModal: React.FC<LoadModalProps> = ({
  isOpen,
  onClose,
  onSelectCanvas,
}) => {
  const router = useRouter();
  const [canvases, setCanvases] = useState<CanvasData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadList();
    }
  }, [isOpen]);

  const loadList = async () => {
    setIsLoading(true);
    setError('');
    const res = await getCanvases();
    if (res.success && res.data) {
      setCanvases(res.data);
    } else {
      setError(res.message || 'Failed to load saved canvases');
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Open Saved Canvas" maxWidth="lg">
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-sm">Loading your designs...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
            <div className="mt-2">
              <Button size="sm" variant="outline" onClick={loadList}>
                Try Again
              </Button>
            </div>
          </div>
        ) : canvases.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <FolderOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <div>
              <p className="text-sm font-semibold text-slate-700">No saved designs found</p>
              <p className="text-xs text-slate-500">Create elements and save your first canvas!</p>
            </div>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 pr-1">
            {canvases.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  onSelectCanvas(c);
                  onClose();
                }}
                className="py-3 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {c.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : 'Recent'}
                    </span>
                    <span>•</span>
                    <span>{c.elements?.length || 0} elements</span>
                    <span>•</span>
                    <span>{c.width} × {c.height}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onClose();
              router.push('/canvases');
            }}
          >
            Go to Full Dashboard
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
