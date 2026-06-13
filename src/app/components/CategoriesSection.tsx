'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { categories } from '@/data/products';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

gsap?.registerPlugin(ScrollTrigger);

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const c = t?.home?.categories;

  useEffect(() => {
    const ctx = gsap?.context(() => {
      ScrollTrigger?.create({
        trigger: lineRef?.current,
        start: 'top 85%',
        onEnter: () => lineRef?.current?.classList?.add('active'),
      });

      gsap?.from('.category-card', {
        scrollTrigger: { trigger: sectionRef?.current, start: 'top 75%' },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      aria-label="Browse jewelry by category - Rings, Necklaces, Bracelets, Earrings"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div ref={lineRef} className="section-line mb-4 w-16" style={{ width: 0 }} />
            <span className="eyebrow text-primary block mb-3">{c?.eyebrow}</span>
            <h2 className="font-display text-hero-md font-light text-foreground">
              {c?.heading1} <span className="italic">{c?.heading2}</span> {c?.heading3}
            </h2>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors border-b border-border pb-1 hover:border-primary"
          >
            {c?.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          <div className="category-card sm:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-3xl zoom-container cursor-pointer">
            <div className="aspect-[16/9] lg:aspect-[16/8] relative">
              <AppImage src={categories?.[0]?.image} alt={categories?.[0]?.alt} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 img-overlay-bottom" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-xs font-medium mb-1">{categories?.[0]?.count} {t?.common?.styles}</p>
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white">{t?.navigation?.rings}</h3>
                </div>
                <Link href="/" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <svg className="w-4 h-4 text-white group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="category-card group relative overflow-hidden rounded-3xl zoom-container cursor-pointer">
            <div className="aspect-[3/4] sm:aspect-square lg:aspect-[3/4] relative">
              <AppImage src={categories?.[1]?.image} alt={categories?.[1]?.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 img-overlay-bottom" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-white/70 text-xs font-medium mb-1">{categories?.[1]?.count} {t?.common?.styles}</p>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white">{t?.navigation?.necklaces}</h3>
            </div>
          </div>

          <div className="category-card group relative overflow-hidden rounded-3xl zoom-container cursor-pointer">
            <div className="aspect-[3/4] sm:aspect-square lg:aspect-[3/4] relative">
              <AppImage src={categories?.[2]?.image} alt={categories?.[2]?.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 img-overlay-bottom" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-white/70 text-xs font-medium mb-1">{categories?.[2]?.count} {t?.common?.styles}</p>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white">{t?.navigation?.bracelets}</h3>
            </div>
          </div>

          <div className="category-card sm:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-3xl zoom-container cursor-pointer">
            <div className="aspect-[16/9] lg:aspect-[16/8] relative">
              <AppImage src={categories?.[3]?.image} alt={categories?.[3]?.alt} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 img-overlay-bottom" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-xs font-medium mb-1">{categories?.[3]?.count} {t?.common?.styles}</p>
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white">{t?.navigation?.earrings}</h3>
                </div>
                <Link href="/" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <svg className="w-4 h-4 text-white group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}