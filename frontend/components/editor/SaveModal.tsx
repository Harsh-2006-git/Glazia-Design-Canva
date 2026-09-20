'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => Promise<void>;
  initialName: string;
  initialDescription?: string;
  isSaving: boolean;
}

export const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName,
  initialDescription = '',
  isSaving,
}) => {
  const [name, setName] = useState(initialName || 'Untitled Canvas');
  const [description, setDescription] = useState(initialDescription || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialName || 'Untitled Canvas');
      setDescription(initialDescription || '');
      setError('');
    }
  }, [isOpen, initialName, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Canvas name is required');
      return;
    }
    setError('');
    await onSave(name.trim(), description.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save Canvas">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Canvas Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Glazia Demo Canvas"
          error={error}
          autoFocus
        />

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Description (Optional)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add an optional note about this design..."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSaving}>
            Save Canvas
          </Button>
        </div>
      </form>
    </Modal>
  );
};
