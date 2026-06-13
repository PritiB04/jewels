import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import CategoriesSection from '@/app/components/CategoriesSection';
import TrendingSection from '@/app/components/TrendingSection';
import SaleBanner from '@/app/components/SaleBanner';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import FAQSection from '@/app/components/FAQSection';
import ComparisonSection from '@/app/components/ComparisonSection';
import MobileBottomNav from '@/app/components/MobileBottomNav';
import SchemaInjector from '@/components/SchemaInjector';

export const metadata: Metadata = {
  title: 'Crafters — Minimal Luxury Jewelry for Gen Z',
  description: 'Shop curated necklaces, rings, bracelets and earrings. Crafters brings minimal luxury jewelry to fashion-forward Gen Z girls at prices that feel right.',
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Crafters',
  description: 'Crafters is a minimal luxury jewelry brand offering hand-crafted necklaces, rings, bracelets, and earrings for fashion-forward Gen Z girls who value quality and timeless design.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  applicationCategory: 'Shopping',
  featureList: [
    'Premium 14k–18k gold fill and sterling silver jewelry',
    'Hand-set cubic zirconia and freshwater pearl pieces',
    'Fast 2–5 day shipping on all orders',
    '30-day easy returns with free return shipping',
    'Timeless minimal designs that never go out of style',
    '4.9/5 rating from 12,400+ verified customers',
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '28',
    highPrice: '115',
    offerCount: '200+',
  },
};

const webpageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Minimal Luxury Jewelry for Gen Z',
  description: 'Discover hand-crafted necklaces, rings, bracelets, and earrings designed for fashion-forward Gen Z girls. Premium materials, timeless design, accessible prices.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function LandingPage() {
  return (
    <>
      <SchemaInjector
        webpageSchema={webpageSchema}
        productSchema={productSchema}
      />
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <TrendingSection />
        <SaleBanner />
        <ComparisonSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}