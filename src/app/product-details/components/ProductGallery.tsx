'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Product } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      {/* Main image */}
      <div
        className="relative aspect-square rounded-3xl overflow-hidden bg-muted cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <AppImage
              src={product.images[activeIdx]}
              alt={`${product.name} view ${activeIdx + 1} - ${product.category} jewelry`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeIdx === 0}
              className="object-cover"
              style={
                zoomed
                  ? {
                      transform: 'scale(1.6)',
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      transition: 'transform 0.1s ease',
                    }
                  : { transform: 'scale(1)', transition: 'transform 0.3s ease' }
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-foreground text-background">
              {product.badge}
            </span>
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 glass-card rounded-full px-3 py-1.5 text-[10px] font-medium text-foreground flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`gallery-thumb aspect-square overflow-hidden rounded-xl ${i === activeIdx ? 'active' : ''}`}
            aria-label={`View image ${i + 1}`}
          >
            <AppImage
              src={img}
              alt={`${product.name} thumbnail ${i + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}