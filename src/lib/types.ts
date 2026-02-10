import type { LucideIcon } from 'lucide-react';

export interface CardItem {
  id?: string;
  label: string;
  icon?: LucideIcon;
  imageUrl?: string;
  audioUrl?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CardItem[];
}
