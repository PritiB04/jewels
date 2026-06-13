'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;
const TAX_RATE = 0.08;

export default function CartContent() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const subtotal = getTotal();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + shipping + tax;
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  const handleCoupon = () => {
    if (coupon.toUpperCase() === 'JEWELS10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try JEWELS10');
      setCouponApplied(false);
    }
  };

  const handleSaveForLater = (id: string) => {
    setSavedItems((prev) => [...prev, id]);
    removeFromCart(id);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Icon name="ShoppingBagIcon" size={40} className="text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-light text-foreground mb-3">
          Your cart is <span className="italic">empty</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xs">
          Looks like you haven't added any pieces yet. Explore our collection to find something you love.
        </p>
        <Link href="/" className="btn-primary">
          <Icon name="SparklesIcon" size={18} />
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Cart Items */}
      <div className="lg:col-span-7 space-y-4">
        {/* Free shipping progress */}
        {freeShippingRemaining > 0 && (
          <div className="bg-muted rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                Add <span className="font-bold text-primary">${freeShippingRemaining.toFixed(2)}</span> more for free shipping
              </p>
              <Icon name="TruckIcon" size={16} className="text-primary" />
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        )}

        {subtotal >= SHIPPING_THRESHOLD && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl p-3 mb-6">
            <Icon name="CheckCircleIcon" size={16} className="text-green-600" />
            <p className="text-sm text-green-700 font-medium">You've unlocked free shipping!</p>
          </div>
        )}

        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-4 sm:gap-5 p-4 sm:p-5 border border-border rounded-2xl bg-card hover:border-primary/30 transition-colors"
            >
              {/* Product image */}
              <Link href="/product-details" className="flex-shrink-0">
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-muted">
                  <AppImage
                    src={item.product.images[0]}
                    alt={`${item.product.name} in cart`}
                    width={112}
                    height={128}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Product details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Link href="/product-details">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug hover:text-primary transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex-shrink-0 p-1.5 rounded-full hover:bg-muted transition-colors"
                      aria-label="Remove item"
                    >
                      <Icon name="XMarkIcon" size={16} className="text-muted-foreground" />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mb-1">{item.product.category}</p>

                  {item.size && (
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                  )}

                  {item.product.badge && (
                    <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {item.product.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="w-7 text-center font-semibold text-foreground text-sm"
                    >
                      {item.quantity}
                    </motion.span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold text-foreground text-base">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">${item.product.price} each</p>
                    )}
                  </div>
                </div>

                {/* Save for later */}
                <button
                  onClick={() => handleSaveForLater(item.product.id)}
                  className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors text-left flex items-center gap-1"
                >
                  <Icon name="BookmarkIcon" size={12} />
                  Save for later
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Saved items notice */}
        {savedItems.length > 0 && (
          <div className="p-4 border border-dashed border-border rounded-2xl text-center">
            <p className="text-sm text-muted-foreground">
              {savedItems.length} item{savedItems.length > 1 ? 's' : ''} saved for later
            </p>
          </div>
        )}

        {/* Continue shopping */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mt-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </Link>
      </div>

      {/* Order Summary — Sticky */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className="border border-border rounded-3xl p-6 sm:p-7 bg-card shadow-sm">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Order Summary
          </h2>

          {/* Coupon input */}
          <div className="mb-6">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponError(''); }}
                placeholder="Enter code (try JEWELS10)"
                className="coupon-input flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleCoupon()}
              />
              <button
                onClick={handleCoupon}
                className="px-4 py-3 rounded-xl bg-foreground text-background text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors"
              >
                Apply
              </button>
            </div>
            <AnimatePresence>
              {couponError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-500 mt-2"
                >
                  {couponError}
                </motion.p>
              )}
              {couponApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1"
                >
                  <Icon name="CheckIcon" size={12} />
                  10% discount applied!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Price breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
              <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Icon name="TagIcon" size={13} />
                  Discount (JEWELS10)
                </span>
                <span className="text-green-600 font-semibold">−${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-5" />

          {/* Total */}
          <div className="flex justify-between items-center mb-7">
            <span className="font-semibold text-foreground">Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="font-display text-2xl font-bold text-foreground"
            >
              ${total.toFixed(2)}
            </motion.span>
          </div>

          {/* Checkout CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary justify-center py-4 text-base shimmer-effect"
          >
            <Icon name="LockClosedIcon" size={18} />
            Proceed to Checkout
          </motion.button>

          {/* Payment methods */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {['Visa', 'MC', 'Amex', 'Apple'].map((method) => (
              <div
                key={method}
                className="px-2.5 py-1 rounded-md border border-border bg-muted text-[10px] font-bold text-muted-foreground"
              >
                {method}
              </div>
            ))}
          </div>

          {/* Security badge */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="ShieldCheckIcon" size={14} className="text-primary" />
            <span>Secure checkout with SSL encryption</span>
          </div>

          {/* Delivery estimate */}
          <div className="mt-5 p-3 bg-muted rounded-xl flex items-center gap-3">
            <Icon name="TruckIcon" size={16} className="text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Estimated delivery: <span className="font-semibold text-foreground">3–5 business days</span>
            </p>
          </div>
        </div>

        {/* Return policy note */}
        <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
          <Icon name="ArrowPathIcon" size={13} className="text-primary" />
          Free 30-day returns on all unworn items
        </p>
      </div>
    </div>
  );
}