'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 1500); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-2 animate-fadeIn">
        FealtyX
      </h1>
      <p className="text-gray-600 text-lg sm:text-xl mb-8 animate-fadeIn delay-100">
        Redirecting to your dashboard...
      </p>
      <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}
