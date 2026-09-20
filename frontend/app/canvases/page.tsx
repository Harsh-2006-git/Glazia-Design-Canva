'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  FolderOpen,
  Trash2,
  Calendar,
  Layers,
  Layout,
  User as UserIcon,
  LogOut,
  AlertTriangle,
  ExternalLink,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CanvasData } from '@/types/canvas';
import { getCanvases, deleteCanvas, createCanvas } from '@/lib/api';

export default function CanvasesDashboard() {
  const router = useRouter();
  const [canvases, setCanvases] = useState<CanvasData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<CanvasData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load canvases
  const fetchCanvases = async () => {
    setIsLoading(true);
    setError('');
    const res = await getCanvases();
    if (res.success && res.data) {
      setCanvases(res.data);
    } else {
      setError(res.message || 'Unable to connect to the backend server. Make sure the backend is running on port 5000.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCanvases();
  }, []);

  // Filtered canvases based on search query
  const filteredCanvases = useMemo(() => {
    if (!searchQuery.trim()) return canvases;
    return canvases.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [canvases, searchQuery]);

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget || !deleteTarget._id) return;
    setIsDeleting(true);
    const res = await deleteCanvas(deleteTarget._id);
    if (res.success) {
      setCanvases((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      setDeleteTarget(null);
    } else {
      alert(res.message || 'Failed to delete canvas');
    }
    setIsDeleting(false);
  };

  // Create new canvas shortcut
  const handleCreateNew = () => {
    router.push('/editor/new');
  };

  // Render miniature visual preview
  const renderPreview = (c: CanvasData) => {
    const scale = 0.2; // fit inside thumbnail
    return (
      <div
        className="w-full h-40 bg-white relative overflow-hidden border-b border-slate-100 flex items-center justify-center"
        style={{ backgroundColor: c.backgroundColor || '#ffffff' }}
      >
        {c.elements && c.elements.length > 0 ? (
          <div
            className="absolute origin-top-left"
            style={{
              width: `${c.width}px`,
              height: `${c.height}px`,
              transform: `scale(${160 / Math.max(c.height, 400)})`,
              transformOrigin: 'center center',
            }}
          >
            {c.elements.slice(0, 15).map((el) => {
              if (el.visible === false) return null;
              if (el.type === 'rectangle') {
                return (
                  <div
                    key={el.id}
                    className="absolute"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: `${el.width}px`,
                      height: `${el.height}px`,
                      backgroundColor: el.fill,
                      transform: `rotate(${el.rotation || 0}deg)`,
                      borderRadius: '4px',
                    }}
                  />
                );
              }
              if (el.type === 'circle') {
                return (
                  <div
                    key={el.id}
                    className="absolute rounded-full"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: `${el.width}px`,
                      height: `${el.height}px`,
                      backgroundColor: el.fill,
                      transform: `rotate(${el.rotation || 0}deg)`,
                    }}
                  />
                );
              }
              if (el.type === 'text') {
                return (
                  <div
                    key={el.id}
                    className="absolute font-semibold truncate select-none"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      fontSize: `${el.fontSize || 24}px`,
                      color: el.fill,
                      transform: `rotate(${el.rotation || 0}deg)`,
                    }}
                  >
                    {el.text || 'Text'}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="text-slate-300 flex flex-col items-center gap-1">
            <Layout className="w-8 h-8" />
            <span className="text-[11px]">Empty Canvas</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Sidebar matching Screen 4 in Reference Board */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex select-none flex-shrink-0">
        <div>
          {/* Brand Header */}
          <div className="h-16 border-b border-slate-800 px-6 flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0">
              <Image src="/logo.jpg" alt="Glazia Logo" width={32} height={32} className="object-cover w-full h-full" priority />
            </div>
            <span className="font-bold text-lg tracking-tight">Glazia</span>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1.5">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Layout className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/canvases"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white shadow-sm transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              <span>My Canvases</span>
            </Link>

            <button
              onClick={handleCreateNew}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-left"
            >
              <Plus className="w-4 h-4" />
              <span>New Canvas</span>
            </button>

            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Bottom logout / status */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign In / Switch</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar for mobile & actions */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 md:hidden">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-slate-200">
              <Image src="/logo.jpg" alt="Glazia" width={28} height={28} className="object-cover" />
            </div>
            <span className="font-bold text-base text-slate-900">Glazia</span>
          </div>

          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Canvases</h1>
            <p className="text-xs text-slate-500">Manage your saved designs and layouts</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCanvases}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
              title="Refresh canvases list"
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateNew}
              icon={<Plus className="w-4 h-4" />}
            >
              + New Canvas
            </Button>
          </div>
        </header>

        {/* Body Container */}
        <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search canvases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs"
            />
          </div>

          {/* Canvas Cards Grid / Loading / Error / Empty States */}
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-slate-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm font-medium">Loading canvases from database...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-800 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Unable to load canvases</span>
              </div>
              <p className="text-sm text-red-600">{error}</p>
              <Button size="sm" variant="outline" onClick={fetchCanvases}>
                Try Again
              </Button>
            </div>
          ) : filteredCanvases.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-4 max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
                <FolderOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {searchQuery ? 'No matching canvases found' : 'No canvases yet'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {searchQuery
                    ? `No designs match "${searchQuery}". Try another search term.`
                    : 'Create your first design to get started.'}
                </p>
              </div>
              <div>
                <Button variant="primary" onClick={handleCreateNew} icon={<Plus className="w-4 h-4" />}>
                  Create Canvas
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCanvases.map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                >
                  {/* Visual Preview */}
                  {renderPreview(c)}

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {c.name}
                      </h3>
                      {c.description ? (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{c.description}</p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : 'Recent'}
                      </span>
                      <span>{c.elements?.length || 0} elements</span>
                      <span>{c.width} × {c.height}</span>
                    </div>

                    {/* Open & Delete actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <Link href={`/editor/${c._id}`} className="flex-1">
                        <Button variant="primary" size="sm" className="w-full">
                          Open
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(c)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2"
                        title="Delete canvas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Canvas?"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-800 text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;?</p>
              <p className="text-xs text-red-700 mt-1">This action cannot be undone and will permanently remove this canvas from MongoDB.</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDeleteTarget(null)}
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
