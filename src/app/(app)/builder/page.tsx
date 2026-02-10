"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import { useSpeech } from '@/hooks/use-speech';
import { CATEGORIES, ALL_ITEMS } from '@/lib/data';
import type { CardItem, Category } from '@/lib/types';
import { Play, Trash2, X, Folder, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaginatedGrid } from '@/components/paginated-grid';
import { useCollection, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';


export default function PhraseBuilderPage() {
  const [phrase, setPhrase] = useState<CardItem[]>([]);
  const { speak, isSpeaking } = useSpeech();

  const { firestore } = useFirebase();

  const customCardsQuery = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'cards');
  }, [firestore]);

  const { data: customCards = [] } = useCollection<CardItem>(customCardsQuery);

  const myCardsCategory: Category | null = customCards.length > 0 ? {
    id: 'my-cards',
    label: 'Мои карточки',
    icon: Sparkles,
    items: customCards,
  } : null;

  const allCategories = myCardsCategory ? [myCardsCategory, ...CATEGORIES] : CATEGORIES;
  const allItemsWithCustom = [...(myCardsCategory?.items || []), ...ALL_ITEMS];


  const addToPhrase = (item: CardItem) => {
    setPhrase((currentPhrase) => [...currentPhrase, item]);
  };

  const removeFromPhrase = (index: number) => {
    setPhrase((currentPhrase) => currentPhrase.filter((_, i) => i !== index));
  };

  const clearPhrase = () => {
    setPhrase([]);
  };

  const speakPhrase = () => {
    if (phrase.length > 0) {
      const textToSpeak = phrase.map((item) => item.label).join(' ');
      speak(textToSpeak);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
        <header>
            <h1 className="text-3xl font-bold text-foreground">Конструктор фраз</h1>
            <p className="text-muted-foreground">Составляйте предложения из картинок.</p>
        </header>

      <Card className="min-h-[10rem] flex flex-col justify-between">
        <CardContent className="p-4 flex-grow">
          {phrase.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Здесь появится ваше предложение</p>
            </div>
          ) : (
            <ScrollArea>
              <div className="flex gap-4 pb-4">
                {phrase.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="relative group shrink-0">
                    <div className="w-28">
                       <IconCard
                        label={item.label}
                        icon={item.icon}
                        onClick={() => {}}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-3 -right-3 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromPhrase(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </CardContent>
        <div className="flex justify-end gap-2 p-4 border-t">
          <Button onClick={speakPhrase} disabled={phrase.length === 0 || isSpeaking} size="lg">
            <Play className="mr-2 h-5 w-5" />
            Озвучить
          </Button>
          <Button
            variant="destructive"
            onClick={clearPhrase}
            disabled={phrase.length === 0}
            size="lg"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Очистить
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="all" className="flex-grow flex flex-col overflow-hidden">
        <TabsList className="h-auto shrink-0 flex-wrap justify-start">
            <TabsTrigger value="all">Все</TabsTrigger>
            {allCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>{category.label}</TabsTrigger>
            ))}
        </TabsList>
        <ScrollArea className="mt-4 flex-grow">
        <TabsContent value="all">
            <PaginatedGrid 
              items={allItemsWithCustom} 
              onItemClick={addToPhrase} 
              getKey={(item, index) => `${item.id}-${index}`}
            />
        </TabsContent>
        {allCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
                <PaginatedGrid 
                  items={category.items} 
                  onItemClick={addToPhrase} 
                  getKey={(item) => item.id!}
                />
            </TabsContent>
        ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
}
