import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export interface CardItem {
  id?: string;
  label: string;
  icon?: LucideIcon;
  imageUrl?: string;
  audioUrl?: string;
  createdAt?: Timestamp;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CardItem[];
}
