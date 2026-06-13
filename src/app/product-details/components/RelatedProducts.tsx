'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/app/components/ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const related = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="eyebrow text-primary block mb-3">You Might Also Love</span>
          <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground">
            Related <span className="italic">Pieces</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {related.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-56 sm:w-64 lg:w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/" className="btn-outline">
          View All Products
        </Link>
      </div>
    </section>
  );
}