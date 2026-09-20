'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Layers,
  RotateCw,
  Palette,
  Database,
  History,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="h-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Glazia Logo"
              width={40}
              height={40}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            Glazia
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/canvases"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            My Canvases
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline"
          >
            Login
          </Link>
          <Link href="/editor/new">
            <Button size="sm" variant="primary" icon={<Sparkles className="w-4 h-4" />}>
              Create Canvas
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 sm:px-12 max-w-6xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Stack Mini Design Canvas</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl">
          Create. Design. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Save. Repeat.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
          A simple and powerful design canvas to bring your ideas to life. Build, edit, and save your canvases with precision and ease.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/editor/new">
            <Button size="lg" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
              Get Started
            </Button>
          </Link>
          <Link href="/canvases">
            <Button size="lg" variant="outline">
              View Saved Canvases
            </Button>
          </Link>
        </div>

        {/* Hero Interactive-style Canvas Preview Card */}
        <div className="mt-14 w-full max-w-4xl bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden text-left p-4 sm:p-6 transition-all hover:shadow-canvas">
          {/* Top Mock Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-slate-500 ml-2">Glazia Demo Canvas — 1000 × 650</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 font-medium rounded-md border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Auto-saved
              </span>
            </div>
          </div>

          {/* Canvas Illustration */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
            {/* Rectangle mockup */}
            <div className="absolute top-12 left-16 sm:left-28 w-36 sm:w-44 h-24 sm:h-28 bg-blue-600 rounded-lg shadow-md transform -rotate-3 hover:scale-105 transition-transform flex items-center justify-center text-white text-xs font-medium">
              Rectangle
            </div>

            {/* Circle mockup */}
            <div className="absolute top-24 right-16 sm:right-32 w-28 sm:w-36 h-28 sm:h-36 bg-pink-500 rounded-full shadow-md hover:scale-105 transition-transform flex items-center justify-center text-white text-xs font-medium">
              Circle
            </div>

            {/* Text mockup with selection bounding box */}
            <div className="relative p-4 border-2 border-blue-500 border-dashed rounded bg-white/90 shadow-lg flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Hello Glazia
              </span>
              <div className="absolute -top-2 -left-2 w-3.5 h-3.5 bg-blue-600 rounded-xs" />
              <div className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-blue-600 rounded-xs" />
              <div className="absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-blue-600 rounded-xs" />
              <div className="absolute -bottom-2 -right-2 w-3.5 h-3.5 bg-blue-600 rounded-xs" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-600 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 sm:px-12 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Built with Modern Full-Stack Architecture
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Engineered with React Konva, TypeScript, Node.js, Express, and MongoDB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <RotateCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Interactive Transformations</h3>
              <p className="text-sm text-slate-600">
                Drag, scale, and rotate shapes and text with normalized bounding-box dimensions via Konva Transformer.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">MongoDB Persistence</h3>
              <p className="text-sm text-slate-600">
                Robust REST API with request validation, centralized error handling, and complete canvas rehydration.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Undo / Redo & Autosave</h3>
              <p className="text-sm text-slate-600">
                50-step snapshot history with keyboard shortcuts and debounced auto-saving to prevent data loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-12 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Glazia" width={20} height={20} className="rounded-sm" />
            <span className="font-semibold text-slate-700">Glazia Mini Design Canvas</span>
            <span>— Full Stack Intern Assignment</span>
          </div>
          <p>© 2026 Glazia. Built with Next.js, React Konva, Express, and MongoDB.</p>
        </div>
      </footer>
    </div>
  );
}
