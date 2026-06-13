import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';
import MobileBottomNav from '@/app/components/MobileBottomNav';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Luxury Jewelry — Crafters Minimal Collection',
  description: 'Explore our curated collection of minimal luxury jewelry. Premium necklaces, rings, bracelets and earrings designed for the modern generation.',
};

export default function ProductDetailsPage() {
  const product = products?.[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Luxury Jewelry — Crafters Minimal Collection',
            description: 'Explore our curated collection of minimal luxury jewelry. Premium necklaces, rings, bracelets and earrings designed for the modern generation.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/product-details`,
          }),
        }}
      />
      <Header />
      <main className="pt-20 min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <a href="/" className="hover:text-primary transition-colors">{product?.category}</a>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product?.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </section>

        {/* Reviews */}
        <ProductReviews />

        {/* Related Products */}
        <RelatedProducts currentProductId={product?.id} />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}