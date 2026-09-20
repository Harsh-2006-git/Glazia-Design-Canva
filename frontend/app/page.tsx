'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  ArrowRight,
  FolderOpen,
  Sparkles,
  Zap,
  Layers,
  Cloud,
  Sliders,
  ShieldCheck,
  MousePointer,
  Square,
  Circle,
  Type,
  Save,
  Download,
  Trash2,
  Image as ImageIcon,
  Edit2
} from 'lucide-react';

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafcff] text-slate-900 relative overflow-hidden flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Soft Ambient Glows / Gradients */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-[-10%] w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Header (Centered max-width 1280px) */}
      <header className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 h-24 flex items-center justify-between z-20">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Abstract Isometric Layers Icon matching screenshot */}
          <div className="w-9 h-9 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <path
                d="M16 2L3 8.5L16 15L29 8.5L16 2Z"
                fill="#2563EB"
              />
              <path
                d="M3 13.5L16 20L29 13.5M3 18.5L16 25L29 18.5"
                stroke="#3B82F6"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 11.5L16 16L25 11.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.8"
              />
            </svg>
          </div>
          <span className="font-extrabold text-xl sm:text-[22px] tracking-tight text-[#0f172a]">
            DesignCanvas
          </span>
        </Link>

        {/* Center: Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full"
          >
            Home
          </Link>
          <Link
            href="/canvases"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
          >
            My Canvases
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
          >
            About
          </a>
        </nav>

        {/* Right side: Mode toggle, Login, Get Started */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 rounded-lg transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4" />
          </button>

          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
          >
            Login
          </Link>

          <Link
            href="/editor/new"
            className="px-4 sm:px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. Hero Section (Two Columns: ~45% Left, ~55% Right) */}
      <main className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 pt-6 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (45% -> 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6 z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100 text-blue-600 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600" />
              <span>Design Made Simple</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-5xl sm:text-6xl xl:text-[68px] font-black tracking-tight text-[#09152b] leading-[1.08]">
              Create. Design. <br />
              Save.{' '}
              <span className="text-blue-600 font-black">
                Repeat.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-lg">
              A simple and powerful design canvas for creating and saving beautiful layouts. Build your ideas with ease using our intuitive drag-and-drop editor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/editor/new"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-95"
              >
                {/* Canvas layered icon inside button */}
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                href="/canvases"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all active:scale-95"
              >
                <FolderOpen className="w-4 h-4 text-blue-600" />
                <span>View My Canvases</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dominant DesignCanvas Editor Preview (55% -> 7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Background Blob Elements */}
            <div className="absolute -top-12 -right-10 w-72 h-72 bg-gradient-to-tr from-purple-200/60 to-indigo-100/50 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -left-10 w-72 h-72 bg-blue-100/70 rounded-full blur-2xl -z-10" />

            {/* Sparkle Doodles Top Right */}
            <div className="absolute -top-4 right-10 flex gap-1 text-blue-500/70 select-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse">
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>

            {/* Floating Image Icon Card (Top-Left) */}
            <div className="absolute -top-6 left-6 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center justify-center transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>

            {/* Curved Arrow Doodle */}
            <div className="absolute top-10 left-16 z-10 hidden sm:block pointer-events-none text-blue-500 opacity-60">
              <svg width="45" height="40" viewBox="0 0 50 45" fill="none">
                <path d="M10 5 C 15 25, 20 30, 35 32" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <path d="M30 28 L 36 32 L 31 37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Floating Color Palette Card (Bottom-Left) */}
            <div className="absolute -bottom-5 left-10 z-20 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-2.5 transition-transform hover:-translate-y-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 shadow-xs" />
              <span className="w-4 h-4 rounded-full bg-purple-500 shadow-xs" />
              <span className="w-4 h-4 rounded-full bg-orange-400 shadow-xs" />
              <span className="w-4 h-4 rounded-full bg-emerald-400 shadow-xs" />
            </div>

            {/* Floating Typography Card (Right) */}
            <div className="absolute -bottom-2 -right-4 z-20 bg-white w-14 h-16 rounded-2xl shadow-2xl border border-slate-100 hidden sm:flex items-center justify-center rotate-6 transition-transform hover:rotate-0">
              <span className="text-2xl font-serif font-black text-slate-800">T</span>
            </div>

            {/* THE MAIN MOCKUP EDITOR CONTAINER */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-300/40 overflow-hidden transform transition-all duration-300 hover:shadow-canvas">
              
              {/* Editor Top Bar */}
              <div className="h-12 bg-white border-b border-slate-100 px-4 flex items-center justify-between text-xs select-none">
                {/* Logo & Document Title */}
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center text-blue-600">
                    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                      <path d="M16 2L3 8.5L16 15L29 8.5L16 2Z" fill="#2563EB" />
                      <path d="M3 13.5L16 20L29 13.5M3 18.5L16 25L29 18.5" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-900 text-[13px]">DesignCanvas</span>
                  <div className="flex items-center gap-1 text-slate-500 hover:text-slate-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors ml-2">
                    <span className="font-medium">Untitled Canvas</span>
                    <Edit2 className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Right Mock Buttons */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-600 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                    <Save className="w-3 h-3" /> Save
                  </span>
                  <span className="px-2 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-[11px] font-medium flex items-center gap-1">
                    <FolderOpen className="w-3 h-3" /> Load
                  </span>
                  <span className="px-1.5 py-1 text-red-500 rounded-md text-[11px] font-medium flex items-center gap-1 hover:bg-red-50">
                    <Trash2 className="w-3 h-3" /> Delete
                  </span>
                </div>
              </div>

              {/* Editor 3-Column Workspace */}
              <div className="h-[340px] sm:h-[400px] flex overflow-hidden bg-slate-50/50">
                
                {/* Mini Left Toolbar */}
                <div className="w-24 bg-white border-r border-slate-100 flex flex-col p-2 space-y-1 select-none flex-shrink-0">
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-semibold">
                    <MousePointer className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-600 text-[11px] font-medium hover:bg-slate-50">
                    <Square className="w-3.5 h-3.5" />
                    <span>Rectangle</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-600 text-[11px] font-medium hover:bg-slate-50">
                    <Circle className="w-3.5 h-3.5" />
                    <span>Circle</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-600 text-[11px] font-medium hover:bg-slate-50">
                    <Type className="w-3.5 h-3.5" />
                    <span>Text</span>
                  </div>
                </div>

                {/* Center Canvas Area with subtle grid */}
                <div className="flex-1 bg-white relative overflow-hidden select-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', backgroundSize: '18px 18px' }}>
                  
                  {/* Rectangle shape with selection handles */}
                  <div className="absolute top-10 left-12 w-28 h-20 bg-blue-600 rounded-md shadow-md border-2 border-dashed border-blue-400">
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    {/* Top rotate handle */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full" />
                  </div>

                  {/* Pink Circle */}
                  <div className="absolute top-10 right-14 w-16 h-16 bg-[#ef476f] rounded-full shadow-md" />

                  {/* Text element "Design Your Ideas" with Transformer handles & cursor */}
                  <div className="absolute bottom-16 left-14 p-2 border-2 border-blue-500 border-dashed rounded bg-white/70 backdrop-blur-xs shadow-sm">
                    <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight block">
                      Design <br />
                      Your Ideas
                    </span>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600 rounded-xs" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-600 rounded-xs" />

                    {/* Blue mouse cursor */}
                    <div className="absolute -bottom-3 -right-3 text-blue-600 drop-shadow-md">
                      <MousePointer className="w-5 h-5 fill-blue-600 text-white" />
                    </div>
                  </div>

                  {/* Amber tilted diamond */}
                  <div className="absolute bottom-8 right-12 w-12 h-12 bg-amber-400 rounded-xl transform rotate-12 shadow-sm" />
                </div>

                {/* Right Properties Panel */}
                <div className="w-48 sm:w-56 bg-white border-l border-slate-100 p-3 flex flex-col justify-between text-[11px] select-none flex-shrink-0">
                  <div className="space-y-3">
                    <span className="font-bold text-slate-800 block text-xs">Properties</span>
                    
                    {/* X & Y */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400">X</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">100</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Y</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">80</div>
                      </div>
                    </div>

                    {/* Width & Height */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400">Width</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">180</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Height</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">200</div>
                      </div>
                    </div>

                    {/* Rotation */}
                    <div>
                      <span className="text-[10px] text-slate-400">Rotation</span>
                      <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 flex justify-between font-mono">
                        <span>0°</span>
                        <span>↕</span>
                      </div>
                    </div>

                    {/* Fill */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Fill</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-3 h-3 rounded-sm bg-blue-600" />
                        <span className="font-mono text-[10px]">#2563EB</span>
                      </div>
                    </div>

                    {/* Stroke */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Stroke</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-3 h-3 rounded-sm bg-slate-800" />
                        <span className="font-mono text-[10px]">#1F2937</span>
                      </div>
                    </div>

                    {/* Stroke Width */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Stroke Width</span>
                      <div className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">2</div>
                    </div>

                    {/* Text property */}
                    <div>
                      <span className="text-[10px] text-slate-400">Text</span>
                      <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 truncate font-medium">Design Your Ideas</div>
                    </div>
                  </div>

                  {/* Delete Element Button */}
                  <div className="pt-2">
                    <button className="w-full py-1.5 px-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-1 font-medium transition-colors">
                      <Trash2 className="w-3 h-3" />
                      <span>Delete Element</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* 3. Bottom 5 Feature Highlights row matching screenshot */}
        <div id="features" className="mt-20 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 select-none">
          
          {/* Feature 1 */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Easy to Use</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intuitive drag-and-drop interface for quick and seamless design.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Multiple Elements</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add rectangles, circles, text and more to bring your ideas to life.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Cloud className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Save & Access</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Store your canvases securely and access them anytime.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Full Control</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select, resize, rotate and edit elements with precision.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Built for Developers</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Modern tech stack with Next.js, React, Node.js and MongoDB.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
