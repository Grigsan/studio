import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AuthGate } from '@/firebase/auth/auth-gate';


export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <SidebarProvider>
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGate>
  );
}
