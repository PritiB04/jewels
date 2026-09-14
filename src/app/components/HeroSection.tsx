'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

const floatingImages = [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bde687f2-1772159019875.png",
    alt: 'Delicate rose gold layered necklace on ivory linen, soft morning light, minimal editorial styling',
    className: 'w-36 sm:w-44 lg:w-52 rounded-2xl shadow-2xl float-anim',
    style: { top: '12%', right: '8%' }
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f569215d-1769332855877.png",
    alt: 'Gold stacking rings close-up on feminine hand, warm sunlight, airy lifestyle background',
    className: 'w-28 sm:w-36 lg:w-44 rounded-2xl shadow-xl float-anim-delay',
    style: { bottom: '20%', right: '18%' }
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f54c5bcf-1772154558402.png",
    alt: 'Pearl drop earrings portrait, diffused natural light, soft ivory background, close-up editorial',
    className: 'w-24 sm:w-32 lg:w-40 rounded-2xl shadow-lg float-anim-delay-2',
    style: { top: '30%', left: '4%' }
  }
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const h = t.home.hero;
  const isRtl = language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouse = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xRatio = clientX / innerWidth - 0.5;
        const yRatio = clientY / innerHeight - 0.5;

        gsap.to(blobRef1.current, { x: xRatio * 60, y: yRatio * 40, duration: 2, ease: 'power2.out' });
        gsap.to(blobRef2.current, { x: -xRatio * 40, y: -yRatio * 30, duration: 2.5, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouse);
      return () => window.removeEventListener('mousemove', handleMouse);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Crafters hero section - Wear Your Story"
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20"
    >
      <div ref={blobRef1} className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] blob-primary pointer-events-none" />
      <div ref={blobRef2} className="absolute bottom-1/4 left-1/4 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] blob-accent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="watermark-text italic font-light">Crafters</span>
      </div>

      {floatingImages.map((img, i) => (
        <div key={i} className="absolute hidden lg:block pointer-events-none z-10" style={img.style}>
          <div className={img.className}>
            <AppImage src={img.src} alt={img.alt} width={220} height={280} className="w-full h-full object-cover" />
          </div>
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh]">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <span className="eyebrow text-primary mb-6 block">{h.eyebrow}</span>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="text-hero-xl font-display font-light italic text-foreground leading-none"
              >
                {h.headline1} <span className="text-rose-gold-gradient">{h.headline2}</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-md mb-10"
            >
              {h.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/product-details" className="btn-primary shimmer-effect">{t.common.shopCollection}</Link>
              <Link href="/#trending" className="btn-outline">{t.common.exploretrends}</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-border"
            >
              <div>
                <span className="font-display text-2xl font-bold text-foreground">4.9</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3 h-3 star-filled" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-sm font-semibold text-foreground">12,400+</p>
                <p className="text-xs text-muted-foreground">{h.ratingLabel}</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-sm font-semibold text-foreground">{h.freeShipping}</p>
                <p className="text-xs text-muted-foreground">{h.freeShippingDesc}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-none">
              <div className="clip-reveal active aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_rgba(201,149,106,0.25)]">
                <AppImage
                  src="/assets/images/luxury_jewelry_hero.png"
                  alt="Close-up editorial portrait of a woman wearing an exquisite diamond and gold statement necklace, dramatic chiaroscuro lighting, deep black background, luxury jewelry campaign"
                  width={600}
                  height={800}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className={`absolute -bottom-6 ${isRtl ? '-right-4 sm:-right-8' : '-left-4 sm:-left-8'} glass-card rounded-2xl p-4 sm:p-5 shadow-xl`}
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-primary">{h.discountBadge}</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">{h.discountCollection}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4, type: 'spring', stiffness: 400, damping: 20 }}
                className={`absolute -top-4 ${isRtl ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'} w-16 h-16 sm:w-20 sm:h-20 bg-foreground rounded-full flex flex-col items-center justify-center shadow-lg`}
              >
                <span className="text-[8px] sm:text-[9px] font-bold text-background uppercase tracking-wider leading-tight text-center">{h.newDrop}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="eyebrow text-muted-foreground">{h.scrollLabel}</span>
        <div className="w-px h-10 bg-border relative overflow-hidden rounded-full">
          <div className="absolute inset-x-0 top-0 h-full bg-primary scroll-pulse" />
        </div>
      </div>
    </section>
  );
}