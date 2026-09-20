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
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[#fcfdff] text-slate-900 relative flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900 lg:overflow-hidden">
      
      {/* ========================================================================= */}
      {/* AMBIENT BACKGROUND BLOBS (Exact match to reference design)                */}
      {/* ========================================================================= */}
      {/* 1. Top-Left soft blue sweeping glow */}
      <div 
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(224,242,254,0.7) 0%, rgba(240,249,255,0.3) 70%, transparent 100%)'
        }}
      />
      {/* 2. Top-Right soft cyan/blue glow */}
      <div 
        className="absolute -top-20 right-0 w-[550px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(224,231,255,0.6) 0%, rgba(245,243,255,0.2) 70%, transparent 100%)'
        }}
      />
      {/* 3. Right-side large purple/lilac organic blob (Crucial from screenshot) */}
      <div 
        className="absolute top-1/4 -right-16 w-[550px] h-[550px] rounded-[45%_55%_70%_30%/30%_60%_40%_70%] pointer-events-none -z-10 transform rotate-12"
        style={{
          background: 'linear-gradient(135deg, rgba(216,180,254,0.45) 0%, rgba(199,210,254,0.35) 100%)',
          filter: 'blur(40px)'
        }}
      />

      {/* ========================================================================= */}
      {/* 1. HEADER (Max-width ~1280px, centered)                                   */}
      {/* ========================================================================= */}
      <header className="w-full max-w-[1260px] mx-auto px-6 sm:px-8 h-20 flex items-center justify-between z-20 flex-shrink-0">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Exact isometric stacked layers glyph */}
          <div className="w-8 h-8 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
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
          <span className="font-extrabold text-[21px] tracking-tight text-[#0f172a]">
            DesignCanvas
          </span>
        </Link>

        {/* Center: Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 relative py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full"
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
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100/60 rounded-lg transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>

          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
          >
            Login
          </Link>

          <Link
            href="/editor/new"
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT (Two-Column Layout, vertically centered)                  */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[1260px] mx-auto px-6 sm:px-8 flex-1 flex items-center min-h-0 py-2">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* LEFT COLUMN (45% -> 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-4 xl:space-y-5 z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              <span>Design Made Simple</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-[60px] font-extrabold tracking-tight text-[#0a192f] leading-[1.06]">
              Create. Design. <br />
              Save.{' '}
              <span className="text-blue-600 font-extrabold">
                Repeat.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[15px] sm:text-base text-slate-500 font-normal leading-relaxed max-w-[430px]">
              A simple and powerful design canvas for creating and saving beautiful layouts. Build your ideas with ease using our intuitive drag-and-drop editor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/editor/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              >
                {/* Layered glyph icon inside button */}
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
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all active:scale-95"
              >
                <FolderOpen className="w-4 h-4 text-blue-600" />
                <span>View My Canvases</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: DOMINANT EDITOR MOCKUP (55% -> 7 Cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Celebration Sparkles (Top Right of Editor) */}
            <div className="absolute -top-3 right-8 flex gap-1 text-blue-400 select-none pointer-events-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </div>

            {/* Floating Image Icon Card (Top-Left, positioned cleanly OUTSIDE without covering logo) */}
            <div className="absolute -top-6 -left-3 sm:-left-6 z-30 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center justify-center transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>

            {/* Dotted Arrow Swoosh (From Image Icon curving toward canvas) */}
            <div className="absolute top-7 left-7 z-20 hidden sm:block pointer-events-none text-blue-400 opacity-60">
              <svg width="42" height="38" viewBox="0 0 50 45" fill="none">
                <path d="M5 8 C 12 26, 22 30, 42 32" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <path d="M36 28 L 44 32 L 38 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Floating Color Palette Card (Bottom-Center, below editor bottom edge) */}
            <div className="absolute -bottom-4 left-[38%] -translate-x-1/2 z-30 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#f97316] shadow-xs" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shadow-xs" />
            </div>

            {/* Floating Typography Card (Bottom-Right) */}
            <div className="absolute -bottom-3 -right-3 z-30 bg-white w-12 h-14 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center justify-center rotate-6 transition-transform hover:rotate-0">
              <span className="text-2xl font-serif font-black text-slate-800">T</span>
            </div>

            {/* THE MAIN WHITE EDITOR FRAME */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-300/30 overflow-hidden">
              
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
                  <span className="font-bold text-slate-900 text-xs tracking-tight">DesignCanvas</span>
                  <div className="flex items-center gap-1 text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded cursor-pointer transition-colors ml-1 text-[11px]">
                    <span className="font-medium text-slate-600">Untitled Canvas</span>
                    <Edit2 className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                </div>

                {/* Right Mock Actions */}
                <div className="flex items-center gap-1.5">
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

              {/* Mockup Editor Body: Toolbar | Canvas Grid | Properties */}
              <div className="h-[290px] xl:h-[320px] flex overflow-hidden bg-white">
                
                {/* Left Mini Toolbar */}
                <div className="w-24 bg-white border-r border-slate-100 flex flex-col p-2 space-y-1 select-none flex-shrink-0">
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

                {/* Center Canvas with subtle grid lines matching screenshot */}
                <div 
                  className="flex-1 bg-white relative overflow-hidden select-none"
                  style={{
                    backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)',
                    backgroundSize: '18px 18px'
                  }}
                >
                  {/* Blue Rectangle (Selected with 8-point handles and top rotate stem) */}
                  <div className="absolute top-6 left-12 w-28 h-20 bg-blue-600 rounded-md shadow-md border-2 border-dashed border-blue-400">
                    {/* 4 corner square handles */}
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-xs" />
                    {/* Top rotate knob */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full" />
                  </div>

                  {/* Pink Circle */}
                  <div className="absolute top-6 right-12 w-16 h-16 bg-[#ef476f] rounded-full shadow-md" />

                  {/* Text "Design Your Ideas" with Selection box & pointer cursor */}
                  <div className="absolute bottom-10 left-12 p-2 border-2 border-blue-500 border-dashed rounded bg-white/70 backdrop-blur-xs shadow-xs">
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight block">
                      Design <br />
                      Your Ideas
                    </span>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600 rounded-xs" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-600 rounded-xs" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-600 rounded-xs" />

                    {/* Blue mouse cursor clicking handle */}
                    <div className="absolute -bottom-3.5 -right-3.5 text-blue-600 drop-shadow-md">
                      <MousePointer className="w-5 h-5 fill-blue-600 text-white" />
                    </div>
                  </div>

                  {/* Amber tilted rounded diamond */}
                  <div className="absolute bottom-6 right-8 w-12 h-12 bg-amber-400 rounded-xl transform rotate-12 shadow-sm" />
                </div>

                {/* Right Properties Panel (Matches screenshot exactly) */}
                <div className="w-48 xl:w-52 bg-white border-l border-slate-100 p-3 flex flex-col justify-between text-[11px] select-none flex-shrink-0">
                  <div className="space-y-2.5">
                    <span className="font-bold text-slate-900 block text-xs">Properties</span>
                    
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
                        <span className="w-3 h-3 rounded-xs bg-blue-600 shadow-xs" />
                        <span className="font-mono text-[10px] text-slate-700">#2563EB</span>
                      </div>
                    </div>

                    {/* Stroke */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Stroke</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="w-3 h-3 rounded-xs bg-slate-800 shadow-xs" />
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
      {/* 3. BOTTOM 5 FEATURE BADGES (Docked neatly at bottom of viewport)          */}
      {/* ========================================================================= */}
      <footer id="features" className="w-full max-w-[1260px] mx-auto px-6 sm:px-8 pb-5 pt-3 border-t border-slate-100 flex-shrink-0 z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 xl:gap-8 select-none">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-start space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 fill-blue-600 text-blue-600" />
            </div>
            <h4 className="font-bold text-[13px] text-slate-900 tracking-tight">Easy to Use</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Intuitive drag-and-drop interface for quick and seamless design.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-[13px] text-slate-900 tracking-tight">Multiple Elements</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Add rectangles, circles, text and more to bring your ideas to life.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Cloud className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-[13px] text-slate-900 tracking-tight">Save & Access</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Store your canvases securely and access them anytime.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Sliders className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-[13px] text-slate-900 tracking-tight">Full Control</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Select, resize, rotate and edit elements with precision.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col items-start space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-[13px] text-slate-900 tracking-tight">Built for Developers</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Modern tech stack with Next.js, React, Node.js and MongoDB.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
