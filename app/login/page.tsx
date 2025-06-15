'use client';

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LucideUser, Lock } from 'lucide-react';


export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'developer' | 'manager'>('developer');

   useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = [
      { email: 'dev@fealty.com', password: '1234', role: 'developer' },
      { email: 'manager@fealty.com', password: '1234', role: 'manager' },
    ];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password && user.role === role
    );

    if (matchedUser) {
      localStorage.setItem('user', JSON.stringify(matchedUser));
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  if (!mounted) return null; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 sm:p-10 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back 👋</h2>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6 gap-4">
          {['developer', 'manager'].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r as 'developer' | 'manager')}
              className={`px-5 py-2 rounded-full border transition-all text-sm font-medium shadow-sm duration-200 ${
                role === r
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <input
              type="email"
              className="w-full border rounded-lg p-2 pl-10 outline-blue-500 focus:ring-2 focus:ring-blue-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <LucideUser className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full border rounded-lg p-2 pl-10 outline-blue-500 focus:ring-2 focus:ring-blue-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02] shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
