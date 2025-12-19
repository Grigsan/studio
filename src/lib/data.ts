import type { LucideIcon } from 'lucide-react';
import {
  Utensils,
  Smile,
  Users,
  Home,
  ToyBrick,
  HelpingHand,
  Book,
  Hand,
  Shirt,
  Cat,
  CookingPot,
  Sandwich,
  Footprints,
  GlassWater,
  Bed,
  Soup,
  Car,
  Circle,
  Square,
  Star,
  Heart,
  Dog,
  Bird,
  Fish,
  ShoppingBag,
  Trees,
  Building2,
  School,
  PersonStanding
} from 'lucide-react';

export interface CardItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  imageUrl?: string;
  imageHint?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CardItem[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'wants',
    label: 'Я хочу',
    icon: Hand,
    items: [
      { id: 'eat', label: 'Есть', icon: Utensils },
      { id: 'drink', label: 'Пить', icon: GlassWater },
      { id: 'play', label: 'Играть', icon: ToyBrick },
      { id: 'sleep', label: 'Спать', icon: Bed },
      { id: 'toilet', label: 'В туалет', icon: PersonStanding },
      { id: 'walk', label: 'Гулять', icon: Footprints },
    ],
  },
  {
    id: 'food',
    label: 'Еда и напитки',
    icon: Utensils,
    items: [
      { id: 'apple', label: 'Яблоко', icon: Circle },
      { id: 'banana', label: 'Банан', icon: Circle },
      { id: 'soup', label: 'Суп', icon: Soup },
      { id: 'water', label: 'Вода', icon: GlassWater },
      { id: 'juice', label: 'Сок', icon: GlassWater },
      { id: 'milk', label: 'Молоко', icon: GlassWater },
      { id: 'bread', label: 'Хлеб', icon: Sandwich },
      { id: 'porridge', label: 'Каша', icon: CookingPot },
    ],
  },
    {
    id: 'animals',
    label: 'Животные',
    icon: Cat,
    items: [
      { id: 'cat', label: 'Кошка', icon: Cat },
      { id: 'dog', label: 'Собака', icon: Dog },
      { id: 'bird', label: 'Птица', icon: Bird },
      { id: 'fish', label: 'Рыба', icon: Fish },
    ],
  },
  {
    id: 'feelings',
    label: 'Чувства',
    icon: Smile,
    items: [
      { id: 'happy', label: 'Радость', icon: Smile },
      { id: 'sad', label: 'Грусть', icon: Heart },
      { id: 'angry', label: 'Злость', icon: Heart },
      { id: 'surprised', label: 'Удивление', icon: Star },
      { id: 'tired', label: 'Усталость', icon: Star },
    ],
  },
    {
    id: 'clothes',
    label: 'Одежда',
    icon: Shirt,
    items: [
      { id: 'shirt', label: 'Футболка', icon: Shirt },
      { id: 'pants', label: 'Штаны', icon: Square },
      { id: 'dress', label: 'Платье', icon: Square },
      { id: 'hat', label: 'Шапка', icon: Circle },
    ],
  },
  {
    id: 'people',
    label: 'Люди',
    icon: Users,
    items: [
      { id: 'mom', label: 'Мама', icon: Users },
      { id: 'dad', label: 'Папа', icon: Users },
      { id: 'teacher', label: 'Учитель', icon: Users },
      { id: 'friend', label: 'Друг', icon: Users },
      { id: 'grandmother', label: 'Бабушка', icon: Users },
      { id: 'grandfather', label: 'Дедушка', icon: Users },
    ],
  },
  {
    id: 'places',
    label: 'Места',
    icon: Home,
    items: [
      { id: 'home', label: 'Дом', icon: Home },
      { id: 'school', label: 'Школа', icon: School },
      { id: 'shop', label: 'Магазин', icon: ShoppingBag },
      { id: 'park', label: 'Парк', icon: Trees },
      { id: 'playground', label: 'Детская площадка', icon: Building2 },
    ],
  },
    {
    id: 'toys',
    label: 'Игрушки',
    icon: ToyBrick,
    items: [
      { id: 'ball', label: 'Мяч', icon: Circle },
      { id: 'car', label: 'Машинка', icon: Car },
      { id: 'doll', label: 'Кукла', icon: PersonStanding },
      { id: 'blocks', label: 'Кубики', icon: Square },
    ],
  },
  {
    id: 'actions',
    label: 'Действия',
    icon: HelpingHand,
    items: [
        { id: 'play', label: 'Играть', icon: ToyBrick },
        { id: 'sleep', label: 'Спать', icon: Bed },
        { id: 'read', label: 'Читать', icon: Book },
        { id: 'draw', label: 'Рисовать', icon: Square },
        { id: 'go', label: 'Идти', icon: Footprints },
        { id: 'look', label: 'Смотреть', icon: Star },
    ]
  }
];

export const ALL_ITEMS: CardItem[] = CATEGORIES.flatMap(category => category.items);
