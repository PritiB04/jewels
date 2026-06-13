'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { reviews } from '@/data/products';
import { motion } from 'framer-motion';

const ratingBreakdown = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 14 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 1 },
];

export default function ProductReviews() {
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);

  const toggleHelpful = (id: string) => {
    setHelpfulIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="font-display text-2xl font-light text-foreground mb-6">
            Customer <span className="italic">Reviews</span>
          </h2>

          {/* Overall rating */}
          <div className="flex items-center gap-4 mb-8 p-6 bg-muted rounded-2xl">
            <div className="text-center">
              <div className="font-display text-5xl font-bold text-primary">4.8</div>
              <div className="flex justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 star-filled" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">312 reviews</p>
            </div>
          </div>

          {/* Rating bars */}
          <div className="space-y-3">
            {ratingBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground w-6 text-right">{row.stars}</span>
                <svg className="w-3 h-3 star-filled flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: row.stars * 0.05, ease: [0.23, 1, 0.32, 1] }}
                    className="review-bar-fill h-full"
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{row.percent}%</span>
              </div>
            ))}
          </div>

          {/* Write review CTA */}
          <button className="btn-outline w-full mt-8">
            Write a Review
          </button>
        </div>

        {/* Review List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 border border-border rounded-2xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={review.avatar}
                    alt={`${review.author} profile photo`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{review.author}</p>
                      {review.verified && (
                        <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className={`w-3 h-3 ${s <= review.rating ? 'star-filled' : 'star-empty'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-foreground text-sm mb-2">{review.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.body}</p>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Helpful?</span>
                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                    helpfulIds.includes(review.id)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  <Icon name="HandThumbUpIcon" size={13} />
                  {review.helpful + (helpfulIds.includes(review.id) ? 1 : 0)}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}