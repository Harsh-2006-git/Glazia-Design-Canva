'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  FolderOpen,
  Layout,
  Plus,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentPath?: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activePath = currentPath || pathname;
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('glazia_user');
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('glazia_auth_token');
    localStorage.removeItem('glazia_user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Layout },
    { name: 'My Canvases', href: '/canvases', icon: FolderOpen },
    { name: 'New Canvas', href: '/editor/new', icon: Plus },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      {/* ─── Desktop Sidebar only ─────────────────────────────────── */}
      <aside className="w-64 bg-black border-r border-zinc-800 text-white flex-col justify-between hidden md:flex select-none flex-shrink-0 h-screen sticky top-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="h-16 border-b border-zinc-800/80 px-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-zinc-700/80 shadow-md group-hover:border-blue-500 transition-colors">
                <Image src="/logo.jpg" alt="Glazia Logo" width={32} height={32} className="object-cover w-full h-full" priority />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Glazia
                </span>
                <span className="block text-[10px] text-blue-400 font-medium tracking-wide uppercase">Design Studio</span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-zinc-800 space-y-2 bg-zinc-950">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-200 truncate">{user.name || 'User'}</p>
                <p className="text-[11px] text-zinc-400 truncate">{user.email || ''}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── Mobile Full-Screen Drawer (triggered externally via onOpenMobile) ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-black border-r border-zinc-800 text-white flex flex-col justify-between p-5 z-10">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <Image src="/logo.jpg" alt="Glazia" width={28} height={28} className="rounded-lg" />
                  <span className="font-bold text-base">Glazia Studio</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                        isActive ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              {user && (
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{user.name || 'User'}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user.email || ''}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Mobile Hamburger trigger button (rendered inline so pages can use it) ── */}
      {/* Pages that use <Sidebar> should render their own top header on mobile.      */}
      {/* This hidden button gets called via ref - instead pages manage mobile header. */}
    </>
  );
}

/**
 * MobilePageHeader — drop this inside any page that uses <Sidebar> to get
 * a clean mobile top bar with hamburger menu + title + optional right action.
 */
export function MobilePageHeader({
  title,
  subtitle,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem('glazia_user');
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('glazia_auth_token');
    localStorage.removeItem('glazia_user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Layout },
    { name: 'My Canvases', href: '/canvases', icon: FolderOpen },
    { name: 'New Canvas', href: '/editor/new', icon: Plus },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <>
      {/* Mobile header bar */}
      <header className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 leading-tight">{subtitle}</p>}
          </div>
        </div>
        {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
      </header>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-black border-r border-zinc-800 text-white flex flex-col justify-between p-5 z-10">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <Image src="/logo.jpg" alt="Glazia" width={28} height={28} className="rounded-lg" />
                  <span className="font-bold text-base">Glazia Studio</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                        isActive ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              {user && (
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{user.name || 'User'}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user.email || ''}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
