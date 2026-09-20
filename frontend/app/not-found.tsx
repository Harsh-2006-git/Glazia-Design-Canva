import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
          <Image src="/logo.jpg" alt="Glazia" width={40} height={40} className="object-cover w-full h-full" priority />
        </div>
        <span className="font-bold text-xl text-slate-900 tracking-tight">Glazia</span>
      </div>

      <div className="max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-5">
        <div className="text-6xl sm:text-7xl font-extrabold text-blue-600 tracking-tight">
          404
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
          <p className="text-sm text-slate-500">
            The canvas or page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" icon={<Home className="w-4 h-4" />} className="w-full">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
