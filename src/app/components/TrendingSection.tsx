'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

gsap?.registerPlugin(ScrollTrigger);

export default function TrendingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const tr = t?.home?.trending;

  useEffect(() => {
    const ctx = gsap?.context(() => {
      gsap?.from('.trending-card', {
        scrollTrigger: { trigger: sectionRef?.current, start: 'top 75%' },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trending"
      aria-label="Trending jewelry pieces - What everyone's wearing"
      className="pt-4 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow text-primary block mb-3">{tr?.eyebrow}</span>
            <h2 className="font-display text-hero-md font-light text-foreground">
              {tr?.heading1} <span className="italic">{tr?.heading2}</span>
            </h2>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors border-b border-border pb-1 hover:border-primary"
          >
            {tr?.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products?.map((product) => (
            <div key={product?.id} className="trending-card opacity-100">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}