'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  const initAuth = useAppStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <>{children}</>;
}
