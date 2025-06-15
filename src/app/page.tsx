'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000); // 2-second splash screen

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      <div className="animate-fade-in flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-xl">
          FealtyX Task Tracker
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Loading your experience...
        </p>
        <div className="mt-6 w-32 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-white animate-pulse rounded-full" />
        </div>
      </div>
    </main>
  );
}
