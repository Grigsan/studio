"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Grid3x3, MessageSquarePlus, FolderPlus, MessageCircleHeart, LogOut } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { getAuth, signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const navItems = [
  { href: '/', label: 'Доски', icon: Grid3x3 },
  { href: '/builder', label: 'Конструктор', icon: MessageSquarePlus },
  { href: '/editor', label: 'Редактор', icon: FolderPlus },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth);
  }

  return (
    <>
      <SidebarHeader className="flex items-center gap-2">
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                    <MessageCircleHeart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Говоруша</h1>
            </div>
            <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <SidebarSeparator />
         <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            {isLoading ? (
                <Skeleton className="h-8 w-8 rounded-full" />
            ) : user ? (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                </Avatar>
            ) : null}

            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                {isLoading ? (
                    <>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-32" />
                    </>
                ) : user ? (
                    <>
                        <span className="text-sm font-semibold text-foreground truncate">{user.displayName}</span>
                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </>
                ) : null}
            </div>
        </div>

        <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={handleSignOut}
        >
            <LogOut />
            <span className="group-data-[collapsible=icon]:hidden">Выйти</span>
        </Button>

        <div className="text-xs text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">
            <p>Сделано с ❤️ для особенных детей</p>
        </div>
      </SidebarFooter>
    </>
  );
}
