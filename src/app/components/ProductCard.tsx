'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useCartStore();
  const [addedToCart, setAddedToCart] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
  };

  return (
    <div className="product-lift group relative">
      {/* Image Container */}
      <Link href="/product-details" className="block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4">
          <AppImage
            src={product.images[0]}
            alt={`${product.name} - ${product.category} jewelry, minimal luxury aesthetic`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Hover second image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <AppImage
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                product.badge === 'New' || product.badge === 'Trending' ?'bg-foreground text-background'
                  : product.badge === 'Bestseller' ?'badge-gold text-white' :'bg-primary text-primary-foreground'
              }`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.div
              animate={heartAnim ? { scale: [1, 1.5, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                name="HeartIcon"
                size={16}
                variant={isWishlisted ? 'solid' : 'outline'}
                className={isWishlisted ? 'text-red-500' : 'text-foreground'}
              />
            </motion.div>
          </button>

          {/* Quick add overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                addedToCart
                  ? 'bg-green-500 text-white' :'bg-white/90 backdrop-blur-sm text-foreground hover:bg-foreground hover:text-background'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={addedToCart ? 'added' : 'add'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {addedToCart ? '✓ Added to Cart' : (
                    <span className="flex items-center justify-center gap-1.5">
                      <img src="/assets/add-to-cart-icon.svg" alt="Add to cart" className="w-5 h-5" />
                      Quick Add
                    </span>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className={`w-2.5 h-2.5 ${s <= Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">${product.price}</span>
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
            <span className="text-[10px] font-bold text-primary">{product.discount}% off</span>
          </div>
        </div>
      </Link>
    </div>
  );
}