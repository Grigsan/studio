'use client';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }

  if (!user) {
    // This will redirect to /login due to the useEffect,
    // so we can just show a loader while that happens.
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }

  return <>{children}</>;
}
