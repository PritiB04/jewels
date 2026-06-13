'use client';

import React, { useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { testimonials } from '@/data/products';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

gsap?.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const ts = t?.home?.testimonials;

  useEffect(() => {
    const ctx = gsap?.context(() => {
      gsap?.from('.testimonial-item', {
        scrollTrigger: { trigger: sectionRef?.current, start: 'top 70%' },
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Customer testimonials and reviews"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow text-primary block mb-4">{ts?.eyebrow}</span>
          <h2 className="font-display text-hero-md font-light text-foreground">
            {ts?.heading1} <span className="italic">{ts?.heading2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="testimonial-item opacity-100 glass-card rounded-3xl p-7 flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5]?.map((s) => (
                  <svg key={s} className={`w-4 h-4 ${s <= testimonial?.rating ? 'star-filled' : 'star-empty'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="font-display text-lg italic text-foreground leading-relaxed flex-1">
                "{testimonial?.text}"
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                {testimonial?.product}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={testimonial?.avatar}
                    alt={`${testimonial?.name} profile photo, satisfied Crafters customer`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial?.name}</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground">{testimonial?.location}</p>
                    {testimonial?.verified && (
                      <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        {t?.common?.verified}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {ts?.trustStats?.map((stat) => (
              <div key={stat?.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary mb-1">{stat?.value}</div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}