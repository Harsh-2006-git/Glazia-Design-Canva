'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  Mail,
  Lock,
  Save,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sidebar, MobilePageHeader } from '@/components/layout/Sidebar';
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
        setName(res.data.name || '');
        setEmail(res.data.email || '');
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match. Please verify your new password.' });
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
      setStatusMessage({ type: 'success', text: 'Profile information updated successfully!' });
      localStorage.setItem('glazia_user', JSON.stringify(res.data));
      setPassword('');
      setConfirmPassword('');
    } else {
      setStatusMessage({ type: 'error', text: res.message || 'Failed to update profile' });
    }
  };

  const getInitials = (str: string) => {
    if (!str) return 'U';
    return str
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen flex bg-slate-50/80">
      {/* Reusable Sticky Sidebar */}
      <Sidebar currentPath="/profile" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <MobilePageHeader title="Profile Settings" subtitle="Account & credentials" />

        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200/80 px-6 sm:px-10 items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Account &amp; Profile Settings</h1>
              <p className="text-xs text-slate-500">Manage your profile credentials and security preferences</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Account Verified</span>
          </div>
        </header>

        {/* Form Body Container */}
        <main className="p-6 sm:p-10 flex-1 w-full max-w-4xl mx-auto space-y-8">
          {/* User Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/20">
                {getInitials(name)}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white shadow-xs" title="Online" />
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 truncate">{name || 'Glazia User'}</h2>
                  <p className="text-sm text-slate-500 truncate">{email || 'user@example.com'}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-center sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Glazia Creator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-semibold text-slate-900">Personal Information</h3>
              <p className="text-xs text-slate-500">Update your account name and security details.</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 border transition-all ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-slate-50 cursor-not-allowed opacity-90"
                      helperText="Email address cannot be changed."
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                    <KeyRound className="w-4 h-4 text-blue-600" />
                    <span>Change Password</span>
                    <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">New Password</label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Confirm New Password</label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    icon={<Save className="w-4 h-4" />}
                    className="px-6 shadow-sm shadow-blue-600/20"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
