'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeveloperDashboard from '../../components/DeveloperDashboard';
import ManagerDashboard from '../../components/ManagerDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
        return;
      }

      const parsed = JSON.parse(storedUser);
      if (parsed?.role === 'developer' || parsed?.role === 'manager') {
        setRole(parsed.role);
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login'); 
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-4">
      {role === 'developer' ? <DeveloperDashboard /> : <ManagerDashboard />}
    </div>
  );
}
