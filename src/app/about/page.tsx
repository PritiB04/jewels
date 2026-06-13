import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/app/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'About — Crafters',
  description: 'Learn the story behind Crafters — minimal luxury jewelry designed for the fashion-forward generation. Handcrafted with intention, priced with honesty.',
};

const values = [
  {
    title: 'Crafted with intention',
    description:
      'Every piece starts as a sketch, becomes a prototype, and earns its place in our collection only after weeks of refinement. No shortcuts.',
    accent: 'bg-amber-50',
  },
  {
    title: 'Materials that last',
    description:
      '14k–18k gold fill, solid sterling silver, hand-set cubic zirconia and freshwater pearls. We source responsibly and tell you exactly what you\'re wearing.',
    accent: 'bg-rose-50',
  },
  {
    title: 'Priced honestly',
    description:
      'Luxury shouldn\'t require a second mortgage. We cut out the middlemen and pass the savings to you — without cutting corners on quality.',
    accent: 'bg-stone-50',
  },
];

const milestones = [
  { year: '2019', event: 'Founded in a small studio in Brooklyn, NY.' },
  { year: '2021', event: 'Reached 10,000 customers across 40+ countries.' },
  { year: '2023', event: 'Launched our first recycled-silver collection.' },
  { year: '2025', event: '12,400+ verified 5-star reviews and counting.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pb-24 md:pb-0">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                Our story
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
                Jewelry made for
                <br />
                <span className="italic font-normal">real life.</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Crafters was born from a simple frustration: beautiful jewelry
                that either costs a fortune or falls apart in a week. We set out
                to fix that — one piece at a time.
              </p>
            </div>

            {/* Asymmetric stat cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl bg-primary/5 border border-border p-6 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-display font-semibold tracking-tight">12,400+</p>
                  <p className="text-sm text-muted-foreground mt-1">verified 5-star reviews</p>
                </div>
                <span className="text-3xl">⭐</span>
              </div>
              <div className="rounded-2xl bg-amber-50 border border-border p-5">
                <p className="text-3xl font-display font-semibold tracking-tight">40+</p>
                <p className="text-xs text-muted-foreground mt-1">countries shipped to</p>
              </div>
              <div className="rounded-2xl bg-rose-50 border border-border p-5">
                <p className="text-3xl font-display font-semibold tracking-tight">200+</p>
                <p className="text-xs text-muted-foreground mt-1">designs in collection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-10">
            What we stand for
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className={`rounded-2xl ${v.accent} border border-border p-7 flex flex-col gap-3`}
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-10">
              How we got here
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex flex-col gap-2">
                  <span className="font-display text-3xl font-semibold tracking-tight text-primary">
                    {m.year}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Wear something that means something.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            Browse our latest collection — pieces designed to be worn every day,
            for years.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Shop the collection
          </a>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
