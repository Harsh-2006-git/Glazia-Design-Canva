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
  Edit2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen w-full bg-[#fcfdff] text-slate-900 relative flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900 lg:overflow-hidden">
      
      {/* Soft Ambient Background Glows */}
      <div 
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(219,234,254,0.7) 0%, rgba(239,246,255,0.25) 70%, transparent 100%)'
        }}
      />
      <div 
        className="absolute top-1/4 -right-12 w-[600px] h-[550px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(233,213,255,0.5) 0%, rgba(224,231,255,0.3) 70%, transparent 100%)',
          filter: 'blur(30px)'
        }}
      />

      {/* ========================================================================= */}
      {/* 1. HEADER (Bigger, border-b, less margin from corners)                     */}
      {/* ========================================================================= */}
      <header className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 h-20 sm:h-[84px] border-b border-slate-200/90 bg-white/70 backdrop-blur-md flex items-center justify-between z-30 flex-shrink-0">
        {/* Left: DesignCanvas Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
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
          <span className="font-extrabold text-[23px] tracking-tight text-[#0a192f]">
            DesignCanvas
          </span>
        </Link>

        {/* Center: Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-[15px] font-semibold text-blue-600 relative py-1 after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2.5px] after:bg-blue-600 after:rounded-full"
          >
            Home
          </Link>
          <Link
            href="/canvases"
            className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
          >
            My Canvases
          </Link>
          <a
            href="#features"
            className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
          >
            About
          </a>
        </nav>

        {/* Right side: Sun toggle, Login, Get Started */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 rounded-xl transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5" strokeWidth={1.8} />
          </button>

          <Link
            href="/login"
            className="px-5 py-2.5 text-[15px] font-semibold text-[#0a192f] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs"
          >
            Login
          </Link>

          <Link
            href="/editor/new"
            className="px-5 sm:px-6 py-2.5 text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT (Straight untilted editor, refined font, no arrow)        */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 flex-1 flex items-center min-h-0 py-3 sm:py-5">
        <div className="w-full grid grid-cols-12 gap-8 xl:gap-14 items-center">
          
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-start text-left space-y-4 xl:space-y-5 z-10">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-600 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              <span>Design Made Simple</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-[63px] font-extrabold tracking-[-0.035em] text-[#0a192f] leading-[1.05]">
              Create. Design. <br />
              Save.{' '}
              <span className="text-blue-600 font-extrabold">
                Repeat.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] text-[#475569] font-normal leading-[1.6] max-w-[460px]">
              A simple and powerful design canvas for creating and saving beautiful layouts. Build your ideas with ease using our intuitive drag-and-drop editor.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/editor/new"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-[15px] rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-95"
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
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0a192f] font-semibold text-sm sm:text-[15px] rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-95"
              >
                <FolderOpen className="w-4 h-4 text-blue-600" />
                <span>View My Canvases</span>
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: DOMINANT UNTILTED EDITOR MOCKUP */}
          <div className="col-span-12 lg:col-span-7 relative flex items-center justify-center pt-2 pb-2">
            
            {/* Top-Right Starburst Doodle */}
            <div className="absolute -top-3 right-6 flex gap-1 text-blue-400 select-none pointer-events-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </div>

            {/* Floating Image Icon Card (Top-Left, positioned cleanly WITHOUT covering the header/logo, and NO arrow) */}
            <div className="absolute -top-5 left-1 z-30 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>

            {/* Floating Color Palette Card (Bottom-Center, below editor) */}
            <div className="absolute -bottom-4 left-[34%] -translate-x-1/2 z-30 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#f97316] shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shadow-xs" />
            </div>

            {/* Floating Typography Card (Bottom-Right, tilted ~6deg) */}
            <div className="absolute -bottom-3 -right-2 z-30 bg-white w-12 h-14 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center rotate-6 transition-transform hover:rotate-0">
              <span className="text-2xl font-serif font-black text-slate-800">T</span>
            </div>

            {/* THE MAIN WHITE EDITOR FRAME — COMPLETELY STRAIGHT / UNTILTED (No rotation) */}
            <div 
              className="w-full bg-white rounded-2xl sm:rounded-[22px] border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden transform-none"
              style={{
                boxShadow: '0 20px 45px -15px rgba(15, 27, 51, 0.08), 0 0 1px 1px rgba(226, 232, 240, 0.8)'
              }}
            >
              
              {/* Mockup Editor Top Bar */}
              <div className="h-11 bg-white border-b border-slate-100 px-4 flex items-center justify-between text-xs select-none">
                {/* Logo & Document Title */}
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 flex items-center justify-center text-blue-600">
                    <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
                      <path d="M16 2L3 8.5L16 15L29 8.5L16 2Z" fill="#2563EB" />
                      <path d="M3 13.5L16 20L29 13.5M3 18.5L16 25L29 18.5" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-bold text-[#0a192f] text-[13px] tracking-tight">DesignCanvas</span>
                  <div className="flex items-center gap-1 text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded cursor-pointer transition-colors ml-2 text-[11px]">
                    <span className="font-medium text-slate-600">Untitled Canvas</span>
                    <Edit2 className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                </div>

                {/* Right Mock Buttons */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-600 text-white rounded-md text-[10px] font-semibold flex items-center gap-1 shadow-xs">
                    <Save className="w-2.5 h-2.5" /> Save
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-[10px] font-medium flex items-center gap-1">
                    <FolderOpen className="w-2.5 h-2.5 text-blue-600" /> Load
                  </span>
                  <span className="px-2 py-1 text-red-500 rounded-md text-[10px] font-medium flex items-center gap-1 hover:bg-red-50">
                    <Trash2 className="w-2.5 h-2.5" /> Delete
                  </span>
                </div>
              </div>

              {/* Mockup Editor Body: Toolbar (105px) | Canvas Grid | Properties (220px) */}
              <div className="h-[295px] xl:h-[325px] flex overflow-hidden bg-white">
                
                {/* Left Toolbar */}
                <div className="w-[105px] bg-white border-r border-slate-100 flex flex-col p-2 space-y-1 select-none flex-shrink-0">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-semibold">
                    <MousePointer className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 text-[11px] font-medium hover:bg-slate-50">
                    <Square className="w-3.5 h-3.5 text-slate-500" />
                    <span>Rectangle</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 text-[11px] font-medium hover:bg-slate-50">
                    <Circle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Circle</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 text-[11px] font-medium hover:bg-slate-50">
                    <Type className="w-3.5 h-3.5 text-slate-500" />
                    <span>Text</span>
                  </div>
                </div>

                {/* Center Canvas with subtle grid lines */}
                <div 
                  className="flex-1 bg-white relative overflow-hidden select-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
                    backgroundSize: '22px 22px'
                  }}
                >
                  {/* Rotate icon indicator near top-left of canvas */}
                  <div className="absolute top-4 left-8 text-blue-400 opacity-60 select-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </div>

                  {/* Blue Rectangle */}
                  <div className="absolute top-7 left-12 w-[125px] h-[85px] bg-[#2563eb] rounded-sm shadow-md border-2 border-dashed border-blue-400">
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-blue-600" />
                  </div>

                  {/* Pink Circle */}
                  <div className="absolute top-7 right-14 w-[68px] h-[68px] bg-[#ef476f] rounded-full shadow-md" />

                  {/* Rotate indicator near text */}
                  <div className="absolute bottom-[115px] left-28 text-blue-400 opacity-60 select-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </div>

                  {/* Text "Design Your Ideas" with Bounding Box and Blue Pointer Cursor */}
                  <div className="absolute bottom-10 left-12 p-2 border-2 border-blue-500 border-dashed rounded bg-white/80 backdrop-blur-xs shadow-xs">
                    <span className="font-extrabold text-[#0a192f] text-[17px] xl:text-[19px] tracking-tight leading-[1.12] block">
                      Design <br />
                      Your Ideas
                    </span>
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full" />

                    <div className="absolute -bottom-4 -right-4 text-blue-600 drop-shadow-md">
                      <MousePointer className="w-5 h-5 fill-blue-600 text-white" />
                    </div>
                  </div>

                  {/* Amber tilted rounded diamond */}
                  <div className="absolute bottom-8 right-10 w-12 h-12 bg-[#fbbf24] rounded-2xl transform rotate-[14deg] shadow-sm" />
                </div>

                {/* Right Properties Panel */}
                <div className="w-[215px] xl:w-[230px] bg-white border-l border-slate-100 p-3 flex flex-col justify-between text-[11px] select-none flex-shrink-0">
                  <div className="space-y-2.5">
                    <span className="font-bold text-[#0a192f] block text-xs">Properties</span>
                    
                    {/* X & Y */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">X</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[10px]">100</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">Y</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[10px]">80</div>
                      </div>
                    </div>

                    {/* Width & Height */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">Width</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[10px]">180</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">Height</span>
                        <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[10px]">200</div>
                      </div>
                    </div>

                    {/* Rotation */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium">Rotation</span>
                      <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 flex justify-between items-center font-mono text-[10px]">
                        <span>0°</span>
                        <div className="flex flex-col text-[8px] leading-none text-slate-400">
                          <ChevronUp className="w-2.5 h-2.5 -mb-1" />
                          <ChevronDown className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>

                    {/* Fill */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Fill</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-3 h-3 rounded-xs bg-[#2563EB] shadow-xs" />
                        <span className="font-mono text-[10px] text-slate-700">#2563EB</span>
                      </div>
                    </div>

                    {/* Stroke */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Stroke</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-3 h-3 rounded-xs bg-[#1F2937] shadow-xs" />
                        <span className="font-mono text-[10px] text-slate-700">#1F2937</span>
                      </div>
                    </div>

                    {/* Stroke Width */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Stroke Width</span>
                      <div className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[10px]">2</div>
                    </div>

                    {/* Text property */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium">Text</span>
                      <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 truncate font-medium text-[10px]">
                        Design Your Ideas
                      </div>
                    </div>
                  </div>

                  {/* Delete Element Button */}
                  <div className="pt-1">
                    <button className="w-full py-1.5 px-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-1 font-medium transition-colors text-[10px]">
                      <Trash2 className="w-3 h-3" />
                      <span>Delete Element</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM 5 FEATURE BADGES STRIP (Moved up, colorful, and good-looking)   */}
      {/* ========================================================================= */}
      <footer id="features" className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 pb-6 pt-4 border-t border-slate-200/80 flex-shrink-0 z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 xl:gap-8 select-none">
          
          {/* Feature 1: Easy to Use (Vibrant Blue accent) */}
          <div className="p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-blue-100 hover:shadow-xs transition-all flex flex-col items-start space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-blue-600 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-[#0a192f] tracking-tight">Easy to Use</h4>
              <p className="text-[12px] text-[#64748b] leading-[1.35] mt-0.5">
                Intuitive drag-and-drop interface for quick and seamless design.
              </p>
            </div>
          </div>

          {/* Feature 2: Multiple Elements (Royal Purple accent) */}
          <div className="p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-purple-100 hover:shadow-xs transition-all flex flex-col items-start space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-[#0a192f] tracking-tight">Multiple Elements</h4>
              <p className="text-[12px] text-[#64748b] leading-[1.35] mt-0.5">
                Add rectangles, circles, text and more to bring your ideas to life.
              </p>
            </div>
          </div>

          {/* Feature 3: Save & Access (Emerald / Teal accent) */}
          <div className="p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-teal-100 hover:shadow-xs transition-all flex flex-col items-start space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Cloud className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-[#0a192f] tracking-tight">Save & Access</h4>
              <p className="text-[12px] text-[#64748b] leading-[1.35] mt-0.5">
                Store your canvases securely and access them anytime.
              </p>
            </div>
          </div>

          {/* Feature 4: Full Control (Warm Amber / Orange accent) */}
          <div className="p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-amber-100 hover:shadow-xs transition-all flex flex-col items-start space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Sliders className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-[#0a192f] tracking-tight">Full Control</h4>
              <p className="text-[12px] text-[#64748b] leading-[1.35] mt-0.5">
                Select, resize, rotate and edit elements with precision.
              </p>
            </div>
          </div>

          {/* Feature 5: Built for Developers (Indigo / Rose accent) */}
          <div className="p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-indigo-100 hover:shadow-xs transition-all flex flex-col items-start space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-[#0a192f] tracking-tight">Built for Developers</h4>
              <p className="text-[12px] text-[#64748b] leading-[1.35] mt-0.5">
                Modern tech stack with Next.js, React, Node.js and MongoDB.
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
