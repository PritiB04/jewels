'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

gsap?.registerPlugin(ScrollTrigger);

export default function SaleBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const s = t?.home?.sale;

  useEffect(() => {
    const ctx = gsap?.context(() => {
      gsap?.to(imgRef?.current, {
        scrollTrigger: { trigger: sectionRef?.current, start: 'top bottom', end: 'bottom top', scrub: true },
        yPercent: 15,
        ease: 'none'
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sale"
      className="relative overflow-hidden sale-bg py-24 lg:py-40 px-4 sm:px-6 lg:px-8"
    >
      <div ref={imgRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <AppImage
          src="https://images.unsplash.com/photo-1633701394188-c11a1e6a4e26"
          alt="Woman wearing gold jewelry in dim atmospheric light, dark moody shadows, deep warm tones, cinematic editorial"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="eyebrow text-accent block mb-6">{s?.eyebrow}</span>
              <h2 className="font-display text-hero-lg font-light text-white leading-none mb-4">{s?.heading1}</h2>
              <div className="font-display text-hero-lg font-black text-white leading-none mb-8">
                <span className="text-rose-gold-gradient">{s?.heading2}</span>
              </div>
              <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md">
                {s?.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-10">
                {s?.stats?.map((stat) => (
                  <div key={stat?.label} className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-white">{stat?.value}</div>
                    <div className="eyebrow text-white/50 mt-1">{stat?.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/" className="btn-gold">{t?.common?.shopTheSale}</Link>
                <Link href="/product-details" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white hover:text-white">
                  {t?.common?.viewLookbook}
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 items-end">
            {s?.products?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 w-72 shimmer-effect"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <AppImage
                    src={i === 0
                      ? "https://img.rocket.new/generatedImages/rocket_gen_img_12b270e35-1772154720856.png"
                      : "https://img.rocket.new/generatedImages/rocket_gen_img_1923f5073-1773834958559.png"
                    }
                    alt={i === 0
                      ? 'Rose gold layered necklace on ivory background, minimal jewelry photography' :'Delicate gold stacking rings on feminine hand, soft warm light'
                    }
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item?.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-primary">{item?.price}</span>
                    <span className="text-xs text-muted-foreground line-through">{item?.original}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}