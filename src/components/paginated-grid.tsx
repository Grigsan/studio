"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IconCard } from '@/components/icon-card';
import type { CardItem } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedGridProps {
  items: CardItem[];
  onItemClick: (item: CardItem) => void;
  itemsPerPage?: number;
  getKey: (item: CardItem, index: number) => string;
}

export function PaginatedGrid({ items, onItemClick, itemsPerPage = 24, getKey }: PaginatedGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {currentItems.map((item, index) => (
          <IconCard
            key={getKey(item, startIndex + index)}
            label={item.label}
            icon={item.icon}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4 mt-4">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            Страница {currentPage} / {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
}
