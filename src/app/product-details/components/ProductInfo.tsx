'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes ? product.sizes[1] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const { addToCart, toggleWishlist, wishlist } = useCartStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
  };

  const savings = product.originalPrice - product.price;

  return (
    <div className="flex flex-col gap-6 lg:pt-2">
      {/* Category + SKU */}
      <div className="flex items-center justify-between">
        <span className="eyebrow text-primary">{product.category}</span>
        <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-foreground leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-foreground">{product.rating}</span>
        <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4 py-4 border-y border-border">
        <span className="font-display text-4xl font-bold text-foreground">${product.price}</span>
        <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
        <div className="px-3 py-1 bg-primary/10 rounded-full">
          <span className="text-sm font-bold text-primary">{product.discount}% OFF</span>
        </div>
      </div>

      {/* Savings callout */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <Icon name="TagIcon" size={16} className="text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-700 font-medium">
          You save <span className="font-bold">${savings}</span> with the Summer Glow Sale!
        </p>
      </div>

      {/* Size selector */}
      {product.sizes && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Ring Size</p>
            <button className="text-xs text-primary underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[44px] h-11 px-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  selectedSize === size
                    ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold text-foreground">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            className="qty-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          className={`flex-1 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
            addedToCart
              ? 'bg-green-500 text-white' :'bg-foreground text-background hover:bg-primary'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={addedToCart ? 'added' : 'add'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {addedToCart ? (
                <>
                  <Icon name="CheckIcon" size={18} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <img src="/assets/add-to-cart-icon.svg" alt="Add to cart" className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={handleWishlist}
          whileTap={{ scale: 0.95 }}
          className={`py-4 px-6 rounded-full border font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            isWishlisted
              ? 'border-red-300 bg-red-50 text-red-500' :'border-border text-foreground hover:border-primary hover:text-primary'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <motion.div
            animate={heartAnim ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon
              name="HeartIcon"
              size={18}
              variant={isWishlisted ? 'solid' : 'outline'}
            />
          </motion.div>
          <span className="hidden sm:inline">
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </span>
        </motion.button>
      </div>

      {/* Buy Now */}
      <Link href="/cart" className="btn-gold text-center justify-center">
        <Icon name="BoltIcon" size={18} />
        Buy Now
      </Link>

      {/* Delivery estimate */}
      <div className="flex items-start gap-3 bg-muted rounded-2xl p-4">
        <Icon name="TruckIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Free delivery by {new Date(Date.now() + product.deliveryDays * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Order within 2 hours for same-day dispatch
          </p>
        </div>
      </div>

      {/* Product details accordion */}
      <div className="border border-border rounded-2xl overflow-hidden">
        {[
          {
            title: 'Product Details',
            content: product.description,
          },
          {
            title: 'Material & Care',
            content: `Material: ${product.material}. Clean with a soft cloth. Avoid contact with water, perfume, and chemicals. Store in the included pouch when not wearing.`,
          },
          {
            title: 'Shipping & Returns',
            content: 'Free standard shipping on orders over $50. Express delivery available at checkout. 30-day hassle-free returns for unworn items in original packaging.',
          },
        ].map((item, i) => (
          <AccordionItem key={i} title={item.title} content={item.content} defaultOpen={i === 0} />
        ))}
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: 'ShieldCheckIcon', label: 'Authentic', sub: '100% Genuine' },
          { icon: 'ArrowPathIcon', label: 'Easy Returns', sub: '30 Days' },
          { icon: 'TruckIcon', label: 'Free Ship', sub: 'Over $50' },
        ].map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-1.5 p-3 bg-muted rounded-xl text-center"
          >
            <Icon name={badge.icon as 'ShieldCheckIcon'} size={18} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">{badge.label}</p>
            <p className="text-[10px] text-muted-foreground">{badge.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccordionItem({
  title,
  content,
  defaultOpen = false,
}: {
  title: string;
  content: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="PlusIcon" size={16} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}