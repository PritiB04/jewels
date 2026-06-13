'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const f = t?.home?.faq;

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow text-primary block mb-4">{f?.eyebrow}</span>
          <h2 className="font-display text-hero-md font-light text-foreground">
            {f?.heading1} <span className="italic">{f?.heading2}</span>
          </h2>
          <p className="text-muted-foreground text-base mt-4 max-w-xl mx-auto">{f?.description}</p>
        </div>

        <div className="space-y-3">
          {f?.items?.map((faq, index) => (
            <details
              key={faq?.question}
              open={openIndex === index}
              onClick={(e) => {
                e?.preventDefault();
                setOpenIndex(openIndex === index ? null : index);
              }}
              className="group border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 bg-muted/30 hover:bg-muted/50 transition-colors">
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground pe-4">
                  {faq?.question}
                </h3>
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="p-5 sm:p-6 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border bg-background">
                {faq?.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-4">{f?.stillHaveQuestions}</p>
          <a
            href="mailto:support@crafters.com"
            className="inline-block text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            {t?.common?.contactSupport}
          </a>
        </div>
      </div>
    </section>
  );
}
