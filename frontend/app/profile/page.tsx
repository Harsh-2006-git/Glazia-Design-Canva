'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FolderOpen,
  Layout,
  Plus,
  User as UserIcon,
  LogOut,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getCurrentUser, updateUserProfile } from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Read cached user or fetch /me
    const cached = localStorage.getItem('glazia_user');
    if (cached) {
      try {
        const u = JSON.parse(cached);
        setName(u.name || '');
        setEmail(u.email || '');
      } catch (e) {}
    }

    getCurrentUser().then((res) => {
      if (res.success && res.data) {
        setName(res.data.name);
        setEmail(res.data.email);
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const res = await updateUserProfile({
      name,
      ...(password ? { password } : {}),
    });
    setIsLoading(false);

    if (res.success && res.data) {
      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      localStorage.setItem('glazia_user', JSON.stringify(res.data));
      setPassword('');
      setConfirmPassword('');
    } else {
      setStatusMessage({ type: 'error', text: res.message || 'Failed to update profile' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('glazia_auth_token');
    localStorage.removeItem('glazia_user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar matching Screen 9 */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex select-none flex-shrink-0">
        <div>
          <div className="h-16 border-b border-slate-800 px-6 flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0">
              <Image src="/logo.jpg" alt="Glazia Logo" width={32} height={32} className="object-cover w-full h-full" priority />
            </div>
            <span className="font-bold text-lg tracking-tight">Glazia</span>
          </div>

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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              <span>My Canvases</span>
            </Link>

            <Link
              href="/editor/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Canvas</span>
            </Link>

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white shadow-sm">
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
            <p className="text-xs text-slate-500">Manage your account information and credentials</p>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1 max-w-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            {statusMessage && (
              <div
                className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 border ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {statusMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                disabled
                helperText="Email address cannot be modified once created."
              />

              <div className="pt-2 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Change Password (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" isLoading={isLoading} icon={<Save className="w-4 h-4" />}>
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
