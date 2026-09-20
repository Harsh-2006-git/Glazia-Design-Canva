'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
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
  Trash2,
  Image as ImageIcon,
  Edit2
} from 'lucide-react';

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="lg:h-screen lg:max-h-screen min-h-screen bg-[#fafcff] text-slate-900 relative flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900 lg:overflow-hidden">
      {/* Soft Ambient SaaS Glows matching reference image */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-[-5%] w-[650px] h-[650px] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-[15%] w-[450px] h-[450px] bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. HEADER (Compact, crisp ~72px height) */}
      <header className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between z-20 flex-shrink-0">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <path d="M16 2L3 8.5L16 15L29 8.5L16 2Z" fill="#2563EB" />
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
          <span className="font-extrabold text-xl tracking-tight text-[#09152b]">
            DesignCanvas
          </span>
        </Link>

        {/* Center: Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-9">
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

        {/* Right side: Sun toggle, Login, Get Started */}
        <div className="flex items-center gap-3">
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
            className="px-4 py-1.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
          >
            Login
          </Link>

          <Link
            href="/editor/new"
            className="px-4 sm:px-5 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION (Takes all middle vertical space) */}
      <main className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 flex-1 flex items-center min-h-0 py-2 sm:py-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* Left Column (Headline, Badge, Copy, Buttons) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-4 xl:space-y-5 z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              <span>Design Made Simple</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-[62px] font-black tracking-tight text-[#09152b] leading-[1.05]">
              Create. <br />
              Design. <br />
              Save.{' '}
              <span className="text-blue-600 font-black">
                Repeat.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md">
              A simple and powerful design canvas for creating and saving beautiful layouts. Build your ideas with ease using our intuitive drag-and-drop editor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/editor/new"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              >
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
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all active:scale-95"
              >
                <FolderOpen className="w-4 h-4 text-blue-600" />
                <span>View My Canvases</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dominant DesignCanvas Editor Mockup */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-4 pb-4">
            
            {/* Soft Ambient blobs */}
            <div className="absolute -top-10 -right-8 w-64 h-64 bg-gradient-to-tr from-purple-200/50 to-indigo-100/40 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-8 w-64 h-64 bg-blue-100/60 rounded-full blur-2xl -z-10" />

            {/* Sparkle Doodles Top Right */}
            <div className="absolute -top-3 right-8 flex gap-1 text-blue-400 select-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>

            {/* Floating Image Icon Card (Top-Left, positioned cleanly OUTSIDE the editor header) */}
            <div className="absolute -top-5 -left-4 xl:-left-8 z-20 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100/80 hidden sm:flex items-center justify-center transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>

            {/* Dotted Arrow Swoosh from Image Icon to Canvas */}
            <div className="absolute top-7 left-8 xl:left-4 z-10 hidden sm:block pointer-events-none text-blue-400 opacity-60">
              <svg width="40" height="35" viewBox="0 0 50 45" fill="none">
                <path d="M5 8 C 15 25, 25 30, 42 32" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <path d="M36 28 L 44 32 L 38 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Floating Color Palette Card (Bottom-Center, below editor edge) */}
            <div className="absolute -bottom-4 left-1/3 -translate-x-1/2 z-20 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-2 transition-transform hover:-translate-y-0.5">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-xs" />
            </div>

            {/* Floating Typography Card (Bottom-Right) */}
            <div className="absolute -bottom-2 -right-3 z-20 bg-white w-12 h-14 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center justify-center rotate-6 transition-transform hover:rotate-0">
              <span className="text-2xl font-serif font-black text-slate-800">T</span>
            </div>

            {/* THE MOCKUP EDITOR CONTAINER */}
            <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-300/30 overflow-hidden">
              
              {/* Editor Top Bar */}
              <div className="h-11 bg-white border-b border-slate-100 px-4 flex items-center justify-between text-xs select-none">
                {/* Logo & Document Title */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center text-blue-600">
                    <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
                      <path d="M16 2L3 8.5L16 15L29 8.5L16 2Z" fill="#2563EB" />
                      <path d="M3 13.5L16 20L29 13.5M3 18.5L16 25L29 18.5" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-900 text-xs">DesignCanvas</span>
                  <div className="flex items-center gap-1 text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded cursor-pointer transition-colors ml-1 text-[11px]">
                    <span className="font-medium">Untitled Canvas</span>
                    <Edit2 className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Right Mock Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-semibold flex items-center gap-1 shadow-xs">
                    <Save className="w-2.5 h-2.5" /> Save
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded-md text-[10px] font-medium flex items-center gap-1">
                    <FolderOpen className="w-2.5 h-2.5" /> Load
                  </span>
                  <span className="px-1.5 py-0.5 text-red-500 rounded-md text-[10px] font-medium flex items-center gap-1 hover:bg-red-50">
                    <Trash2 className="w-2.5 h-2.5" /> Delete
                  </span>
                </div>
              </div>

              {/* Editor 3-Column Workspace */}
              <div className="h-[290px] xl:h-[330px] flex overflow-hidden bg-slate-50/50">
                
                {/* Mini Left Toolbar */}
                <div className="w-20 bg-white border-r border-slate-100 flex flex-col p-1.5 space-y-1 select-none flex-shrink-0">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-semibold">
                    <MousePointer className="w-3 h-3" />
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-600 text-[10px] font-medium hover:bg-slate-50">
                    <Square className="w-3 h-3" />
                    <span>Rectangle</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-600 text-[10px] font-medium hover:bg-slate-50">
                    <Circle className="w-3 h-3" />
                    <span>Circle</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-600 text-[10px] font-medium hover:bg-slate-50">
                    <Type className="w-3 h-3" />
                    <span>Text</span>
                  </div>
                </div>

                {/* Center Canvas Area with subtle grid */}
                <div className="flex-1 bg-white relative overflow-hidden select-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', backgroundSize: '16px 16px' }}>
                  
                  {/* Rectangle shape with selection handles */}
                  <div className="absolute top-6 left-10 w-24 h-16 bg-blue-600 rounded-md shadow-md border-2 border-dashed border-blue-400">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-2 border-blue-600 rounded-full" />
                  </div>

                  {/* Pink Circle */}
                  <div className="absolute top-6 right-10 w-14 h-14 bg-[#ef476f] rounded-full shadow-md" />

                  {/* Text element "Design Your Ideas" with Transformer handles & cursor */}
                  <div className="absolute bottom-10 left-10 p-1.5 border-2 border-blue-500 border-dashed rounded bg-white/70 backdrop-blur-xs shadow-xs">
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight block">
                      Design <br />
                      Your Ideas
                    </span>
                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-blue-600 rounded-xs" />
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-blue-600 rounded-xs" />

                    {/* Blue mouse cursor pointer */}
                    <div className="absolute -bottom-3 -right-3 text-blue-600 drop-shadow-md">
                      <MousePointer className="w-4 h-4 fill-blue-600 text-white" />
                    </div>
                  </div>

                  {/* Amber tilted diamond */}
                  <div className="absolute bottom-6 right-8 w-10 h-10 bg-amber-400 rounded-xl transform rotate-12 shadow-sm" />
                </div>

                {/* Right Properties Panel */}
                <div className="w-44 xl:w-48 bg-white border-l border-slate-100 p-2.5 flex flex-col justify-between text-[10px] select-none flex-shrink-0">
                  <div className="space-y-2">
                    <span className="font-bold text-slate-800 block text-[11px]">Properties</span>
                    
                    {/* X & Y */}
                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <span className="text-[9px] text-slate-400">X</span>
                        <div className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">100</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400">Y</span>
                        <div className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">80</div>
                      </div>
                    </div>

                    {/* Width & Height */}
                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <span className="text-[9px] text-slate-400">Width</span>
                        <div className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">180</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400">Height</span>
                        <div className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono">200</div>
                      </div>
                    </div>

                    {/* Rotation */}
                    <div>
                      <span className="text-[9px] text-slate-400">Rotation</span>
                      <div className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 flex justify-between font-mono">
                        <span>0°</span>
                        <span>↕</span>
                      </div>
                    </div>

                    {/* Fill */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-400">Fill</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                        <span className="font-mono text-[9px]">#2563EB</span>
                      </div>
                    </div>

                    {/* Stroke */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-400">Stroke</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-2.5 h-2.5 rounded-xs bg-slate-800" />
                        <span className="font-mono text-[9px]">#1F2937</span>
                      </div>
                    </div>

                    {/* Text property */}
                    <div>
                      <span className="text-[9px] text-slate-400">Text</span>
                      <div className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-800 truncate font-medium">Design Your Ideas</div>
                    </div>
                  </div>

                  {/* Delete Element Button */}
                  <div className="pt-1">
                    <button className="w-full py-1 px-1.5 text-red-600 border border-red-200 hover:bg-red-50 rounded-md flex items-center justify-center gap-1 font-medium transition-colors text-[9px]">
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Delete Element</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 3. BOTTOM 5 FEATURE BADGES (Neatly docked at bottom of the 100vh viewport) */}
      <footer id="features" className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 pb-4 pt-2 border-t border-slate-100 flex-shrink-0 z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 xl:gap-6 select-none">
          
          {/* Feature 1 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Easy to Use</h4>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Intuitive drag-and-drop interface for quick design.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Multiple Elements</h4>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Add rectangles, circles, text to bring ideas to life.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Save & Access</h4>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Store your canvases securely and access anytime.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Full Control</h4>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Select, resize, rotate and edit with precision.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Built for Developers</h4>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Modern stack with Next.js, React, and MongoDB.
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
