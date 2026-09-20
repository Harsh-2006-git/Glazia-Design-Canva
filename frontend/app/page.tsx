'use client';

import React, { useState, useEffect } from 'react';
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
  Edit2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('glazia_auth_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const getStartedLink = isLoggedIn ? '/editor/new' : '/login';

  const featuresList = [
    {
      icon: <Zap className="w-4.5 h-4.5 fill-blue-600 text-blue-600" />,
      bg: 'bg-blue-50 text-blue-600 border-blue-100',
      title: 'Easy to Use',
      desc: 'Intuitive drag-and-drop interface for quick design'
    },
    {
      icon: <Layers className="w-4.5 h-4.5 text-purple-600" />,
      bg: 'bg-purple-50 text-purple-600 border-purple-100',
      title: 'Multiple Elements',
      desc: 'Add rectangles, circles, text and more to canvas'
    },
    {
      icon: <Cloud className="w-4.5 h-4.5 text-teal-600" />,
      bg: 'bg-teal-50 text-teal-600 border-teal-100',
      title: 'Save & Access',
      desc: 'Store your canvases securely and access anytime'
    },
    {
      icon: <Sliders className="w-4.5 h-4.5 text-amber-600" />,
      bg: 'bg-amber-50 text-amber-600 border-amber-100',
      title: 'Full Control',
      desc: 'Select, resize, rotate and edit with precision'
    },
    {
      icon: <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />,
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      title: 'Built for Developers',
      desc: 'Modern tech stack: Next.js, Node.js & MongoDB'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % featuresList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featuresList.length]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#fcfdff] text-slate-900 relative flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Soft Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(219,234,254,0.7) 0%, rgba(239,246,255,0.25) 70%, transparent 100%)'
          }}
        />
        <div
          className="absolute top-1/4 -right-12 w-[600px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(233,213,255,0.5) 0%, rgba(224,231,255,0.3) 70%, transparent 100%)',
            filter: 'blur(30px)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. FIXED HEADER (Always fixed at top when scrolling)                     */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-12 h-16 sm:h-[84px] flex items-center justify-between">
          {/* Left: DesignCanvas Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-8 sm:h-8">
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
            <span className="font-extrabold text-xl sm:text-[23px] tracking-tight text-[#0a192f]">
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

          {/* Right side: Login, Get Started */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!isLoggedIn && (
              <Link
                href="/login"
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[15px] font-semibold text-[#0a192f] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs"
              >
                Login
              </Link>
            )}

            <Link
              href={getStartedLink}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT (Straight untilted editor, mobile optimized)              */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-12 flex-1 flex flex-col justify-center min-h-[calc(100dvh-64px)] sm:min-h-0 pt-16 sm:pt-[104px] pb-6 sm:pb-8 lg:pb-5 overflow-x-hidden">
        <div className="w-full grid grid-cols-12 gap-6 sm:gap-8 xl:gap-14 items-center">

          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-start text-left space-y-3.5 sm:space-y-4 xl:space-y-5 z-10">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-600 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              <span>Design Made Simple</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-[38px] min-[360px]:text-[44px] sm:text-5xl xl:text-[63px] font-extrabold tracking-[-0.035em] text-[#0a192f] leading-[1.08] sm:leading-[1.05]">
              <span className="block">Create. Design.</span>
              <span className="block">
                Save.{' '}
                <span className="text-blue-600 font-extrabold">
                  Repeat.
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-[16px] text-[#475569] font-normal leading-[1.55] max-w-[460px]">
              A simple and powerful design canvas for creating and saving beautiful layouts. Build your ideas with ease using our intuitive drag-and-drop editor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-start gap-2.5 sm:gap-4 pt-1.5 sm:pt-2">
              <Link
                href={getStartedLink}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-[15px] rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-95"
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
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-3.5 bg-white hover:bg-slate-50 text-[#0a192f] font-semibold text-sm sm:text-[15px] rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-95"
              >
                <FolderOpen className="w-4 h-4 text-blue-600" />
                <span>View My Canvases</span>
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: DOMINANT UNTILTED EDITOR MOCKUP */}
          <div className="col-span-12 lg:col-span-7 relative flex items-center justify-center pt-2 pb-2 w-full">

            {/* Top-Right Starburst Doodle */}
            <div className="flex absolute -top-3 right-3 sm:right-6 gap-1 text-blue-400 select-none pointer-events-none z-30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </div>

            {/* Responsive non-scrolling wrapper */}
            <div className="w-full select-none overflow-hidden">
              {/* THE MAIN WHITE EDITOR FRAME */}
              <div
                className="w-full max-w-[390px] xs:max-w-[430px] sm:max-w-none mx-auto bg-white rounded-xl sm:rounded-[22px] border border-slate-200/90 shadow-xl lg:shadow-2xl shadow-slate-200/60 overflow-hidden transform-none"
                style={{
                  boxShadow: '0 20px 45px -15px rgba(15, 27, 51, 0.08), 0 0 1px 1px rgba(226, 232, 240, 0.8)'
                }}
              >

                {/* Mockup Editor Top Bar */}
                <div className="h-8 sm:h-11 bg-white border-b border-slate-100 px-2 sm:px-4 flex items-center justify-between text-xs select-none">
                  {/* Logo & Document Title */}
                  <div className="flex items-center gap-1 sm:gap-2.5">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 flex items-center justify-center text-blue-600">
                      <svg viewBox="0 0 32 32" fill="none" className="w-3 sm:w-4 h-3 sm:h-4">
                        <path d="M16 2L3 8.5L16 15L29 8.5L16 2Z" fill="#2563EB" />
                        <path d="M3 13.5L16 20L29 13.5M3 18.5L16 25L29 18.5" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-bold text-[#0a192f] text-[10px] sm:text-[13px] tracking-tight">DesignCanvas</span>
                    <div className="hidden min-[360px]:flex items-center gap-0.5 text-slate-400 hover:text-slate-700 px-1 py-0.5 rounded cursor-pointer transition-colors ml-0.5 text-[9px] sm:text-[11px]">
                      <span className="font-medium text-slate-600 truncate max-w-[60px] sm:max-w-none">Untitled</span>
                      <Edit2 className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Right Mock Buttons */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-blue-600 text-white rounded-md text-[8px] sm:text-[10px] font-semibold flex items-center gap-0.5 shadow-xs">
                      <Save className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> Save
                    </span>
                    <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5">
                      <FolderOpen className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-blue-600" /> Load
                    </span>
                    <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-red-500 rounded-md text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5 hover:bg-red-50">
                      <Trash2 className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> Delete
                    </span>
                  </div>
                </div>

                {/* Mockup Editor Body */}
                <div className="h-[265px] xs:h-[280px] sm:h-[345px] xl:h-[365px] flex overflow-hidden bg-white">

                  {/* Left Toolbar */}
                  <div className="w-[75px] xs:w-[90px] sm:w-[105px] bg-white border-r border-slate-100 flex flex-col p-1 xs:p-1.5 sm:p-2 space-y-1 select-none flex-shrink-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-blue-50 text-blue-600 text-[10px] xs:text-[11px] font-semibold">
                      <MousePointer className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 flex-shrink-0" />
                      <span>Select</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-slate-600 text-[10px] xs:text-[11px] font-medium hover:bg-slate-50">
                      <Square className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 flex-shrink-0" />
                      <span>Rect</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-slate-600 text-[10px] xs:text-[11px] font-medium hover:bg-slate-50">
                      <Circle className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 flex-shrink-0" />
                      <span>Circle</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-slate-600 text-[10px] xs:text-[11px] font-medium hover:bg-slate-50">
                      <Type className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 flex-shrink-0" />
                      <span>Text</span>
                    </div>
                  </div>

                  {/* Center Canvas with subtle grid lines */}
                  <div
                    className="flex-1 bg-white relative overflow-hidden select-none min-w-0"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
                      backgroundSize: '22px 22px'
                    }}
                  >
                    {/* Rotate icon indicator near top-left of canvas */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-8 text-blue-400 opacity-60 select-none">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </div>

                    {/* Blue Rectangle */}
                    <div className="absolute top-3 sm:top-7 left-[8%] sm:left-12 w-[50px] xs:w-[75px] sm:w-[125px] h-[32px] xs:h-[50px] sm:h-[85px] bg-[#2563eb] rounded-sm shadow-md border border-dashed sm:border-2 border-blue-400">
                      <div className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 w-1.5 sm:w-3 h-1.5 sm:h-3 bg-white border border-blue-600 sm:border-2 rounded-full" />
                      <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-1.5 sm:w-3 h-1.5 sm:h-3 bg-white border border-blue-600 sm:border-2 rounded-full" />
                      <div className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 w-1.5 sm:w-3 h-1.5 sm:h-3 bg-white border border-blue-600 sm:border-2 rounded-full" />
                      <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-1.5 sm:w-3 h-1.5 sm:h-3 bg-white border border-blue-600 sm:border-2 rounded-full" />
                    </div>

                    {/* Pink Circle */}
                    <div className="absolute top-3 sm:top-7 right-[8%] sm:right-14 w-[26px] xs:w-[40px] sm:w-[68px] h-[26px] xs:h-[40px] sm:h-[68px] bg-[#ef476f] rounded-full shadow-md" />

                    {/* Text "Design Your Ideas" with Bounding Box and Blue Pointer Cursor */}
                    <div className="absolute bottom-3 sm:bottom-10 left-[8%] sm:left-12 p-0.5 sm:p-2 border border-blue-500 sm:border-2 border-dashed rounded bg-white/80 backdrop-blur-xs shadow-xs">
                      <span className="font-extrabold text-[#0a192f] text-[9px] xs:text-[11px] sm:text-[17px] xl:text-[19px] tracking-tight leading-[1.12] block">
                        Design <br />
                        Your Ideas
                      </span>
                      <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-4 sm:-right-4 text-blue-600 drop-shadow-md">
                        <MousePointer className="w-3 sm:w-5 h-3 sm:h-5 fill-blue-600 text-white" />
                      </div>
                    </div>

                    {/* Amber tilted rounded diamond */}
                    <div className="absolute bottom-3 sm:bottom-8 right-[8%] sm:right-10 w-5 xs:w-7 sm:w-12 h-5 xs:h-7 sm:h-12 bg-[#fbbf24] rounded-md sm:rounded-2xl transform rotate-[14deg] shadow-sm" />
                  </div>

                  {/* Right Properties Panel */}
                  <div className="w-[140px] xs:w-[165px] sm:w-[215px] xl:w-[230px] bg-white border-l border-slate-100 p-1 xs:p-2 sm:p-3 flex flex-col justify-between text-[8px] xs:text-[9.5px] sm:text-[11px] select-none flex-shrink-0">
                    <div className="space-y-0.5 xs:space-y-1 sm:space-y-2.5">
                      <span className="font-bold text-[#0a192f] block text-[10px] xs:text-xs">Properties</span>

                      {/* X & Y */}
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                        <div>
                          <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">X</span>
                          <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[8px] xs:text-[9.5px]">100</div>
                        </div>
                        <div>
                          <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Y</span>
                          <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[8px] xs:text-[9.5px]">80</div>
                        </div>
                      </div>

                      {/* Width & Height */}
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                        <div>
                          <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Width</span>
                          <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[8px] xs:text-[9.5px]">180</div>
                        </div>
                        <div>
                          <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Height</span>
                          <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[7px] xs:text-[9.5px]">200</div>
                        </div>
                      </div>

                      {/* Rotation */}
                      <div>
                        <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Rotation</span>
                        <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 flex justify-between items-center font-mono text-[8px] xs:text-[9.5px]">
                          <span>0°</span>
                          <div className="flex flex-col text-[7px] sm:text-[8px] leading-none text-slate-400">
                            <ChevronUp className="w-2.5 h-2.5 -mb-0.5 sm:w-2 sm:h-2" />
                            <ChevronDown className="w-2.5 h-2.5 sm:w-2 sm:h-2" />
                          </div>
                        </div>
                      </div>

                      {/* Fill */}
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Fill</span>
                        <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                          <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-xs bg-[#2563EB] shadow-xs" />
                          <span className="font-mono text-[8px] xs:text-[9.5px] text-slate-700">#2563EB</span>
                        </div>
                      </div>

                      {/* Stroke */}
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Stroke</span>
                        <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">
                          <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-xs bg-[#1F2937] shadow-xs" />
                          <span className="font-mono text-[8px] xs:text-[9.5px] text-slate-700">#1F2937</span>
                        </div>
                      </div>

                      {/* Stroke Width */}
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Stroke Width</span>
                        <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[8px] xs:text-[9.5px]">2</div>
                      </div>

                      {/* Text property */}
                      <div>
                        <span className="text-[8px] xs:text-[9.5px] text-slate-400 font-medium">Text</span>
                        <div className="px-1 sm:px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-800 truncate font-medium text-[8px] xs:text-[9.5px]">
                          Design Your Ideas
                        </div>
                      </div>
                    </div>

                    {/* Delete Element Button */}
                    <div className="pt-0.5">
                      <button className="w-full py-0.5 sm:py-1.5 px-1 sm:px-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-md sm:rounded-lg flex items-center justify-center gap-1 font-medium transition-colors text-[8.5px] xs:text-[9.5px]">
                        <Trash2 className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                        <span className="truncate">Delete</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM 5 FEATURE CARDS STRIP (Mobile horizontal row / Desktop grid)   */}
      {/* ========================================================================= */}
      <footer id="features" className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-12 pb-3 sm:pb-8 pt-0 sm:pt-4 border-t-0 sm:border-t sm:border-slate-200/80 -mt-5 sm:mt-0 flex-shrink-0 z-20">

        {/* Mobile Single Feature Card Auto-Switcher (1 feature at a time, direct transition) */}
        <div className="sm:hidden w-full flex flex-col items-center justify-center py-0">
          <div className="w-full max-w-[390px] xs:max-w-[430px] bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-sm flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`w-10.5 h-10.5 rounded-xl border flex items-center justify-center flex-shrink-0 ${featuresList[activeFeatureIndex].bg}`}>
                {featuresList[activeFeatureIndex].icon}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm xs:text-[15px] text-slate-900 truncate">
                  {featuresList[activeFeatureIndex].title}
                </h4>
                <p className="text-xs text-slate-500 leading-tight mt-0.5 truncate">
                  {featuresList[activeFeatureIndex].desc}
                </p>
              </div>
            </div>

            {/* Step Counter Badge */}
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-full flex-shrink-0 ml-2 shadow-2xs">
              {activeFeatureIndex + 1}/5
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 pt-2">
            {featuresList.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveFeatureIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeFeatureIndex ? 'w-7 bg-blue-600' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop 5-Column Grid (Desktop only) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 select-none">

          {/* Feature 1: Easy to Use (Vibrant Blue accent) */}
          <div className="bg-white border border-slate-200/90 hover:border-blue-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start space-x-3.5 sm:space-x-0 sm:space-y-3 group hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <Zap className="w-5 h-5 fill-blue-600 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-[14.5px] text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">Easy to Use</h4>
              <p className="text-xs sm:text-[12.5px] text-slate-500 leading-snug mt-0.5 sm:mt-1 font-normal">
                Intuitive drag-and-drop interface for quick and seamless design.
              </p>
            </div>
          </div>

          {/* Feature 2: Multiple Elements (Royal Purple accent) */}
          <div className="bg-white border border-slate-200/90 hover:border-purple-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start space-x-3.5 sm:space-x-0 sm:space-y-3 group hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-[14.5px] text-slate-900 tracking-tight group-hover:text-purple-600 transition-colors">Multiple Elements</h4>
              <p className="text-xs sm:text-[12.5px] text-slate-500 leading-snug mt-0.5 sm:mt-1 font-normal">
                Add rectangles, circles, text and more to bring your ideas to life.
              </p>
            </div>
          </div>

          {/* Feature 3: Save & Access (Emerald / Teal accent) */}
          <div className="bg-white border border-slate-200/90 hover:border-teal-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start space-x-3.5 sm:space-x-0 sm:space-y-3 group hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <Cloud className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-[14.5px] text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">Save & Access</h4>
              <p className="text-xs sm:text-[12.5px] text-slate-500 leading-snug mt-0.5 sm:mt-1 font-normal">
                Store your canvases securely and access them anytime.
              </p>
            </div>
          </div>

          {/* Feature 4: Full Control (Warm Amber accent) */}
          <div className="bg-white border border-slate-200/90 hover:border-amber-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start space-x-3.5 sm:space-x-0 sm:space-y-3 group hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <Sliders className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-[14.5px] text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">Full Control</h4>
              <p className="text-xs sm:text-[12.5px] text-slate-500 leading-snug mt-0.5 sm:mt-1 font-normal">
                Select, resize, rotate and edit elements with precision.
              </p>
            </div>
          </div>

          {/* Feature 5: Built for Developers (Indigo accent) */}
          <div className="bg-white border border-slate-200/90 hover:border-indigo-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start space-x-3.5 sm:space-x-0 sm:space-y-3 group hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-[14.5px] text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">Built for Developers</h4>
              <p className="text-xs sm:text-[12.5px] text-slate-500 leading-snug mt-0.5 sm:mt-1 font-normal">
                Modern tech stack with Next.js, React, Node.js and MongoDB.
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
