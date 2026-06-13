import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartContent from './components/CartContent';
import MobileBottomNav from '@/app/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Shopping Cart — Crafters',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-10">
            <span className="eyebrow text-primary block mb-3">Your Selection</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-foreground">
              Shopping <span className="italic">Cart</span>
            </h1>
          </div>
          <CartContent />
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}