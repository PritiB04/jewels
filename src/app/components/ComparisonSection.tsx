'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function ComparisonSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const c = t?.home?.comparison;

  return (
    <section
      id="why-crafters"
      aria-label="Why choose Crafters over other jewelry brands"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-muted/40"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow text-primary block mb-4">{c?.eyebrow}</span>
          <h2 className="font-display text-hero-md font-light text-foreground">
            {c?.heading1} <span className="italic">{c?.heading2}</span>
          </h2>
          <p className="text-muted-foreground text-base mt-4 max-w-2xl mx-auto">{c?.description}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-4 font-display font-semibold text-foreground">{c?.colCategory}</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-primary">{c?.colCrafters}</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-muted-foreground">{c?.colOthers}</th>
              </tr>
            </thead>
            <tbody>
              {c?.rows?.map((row, idx) => (
                <tr
                  key={row?.category}
                  className={`border-b border-border transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                >
                  <td className="py-5 px-4 font-semibold text-foreground">{row?.category}</td>
                  <td className="py-5 px-4 text-primary font-medium">{row?.crafters}</td>
                  <td className="py-5 px-4 text-muted-foreground">{row?.competitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {c?.bottomStats?.map((item) => (
            <div key={item?.label} className="text-center p-6 rounded-2xl bg-muted/30 border border-border">
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">{item?.stat}</div>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
