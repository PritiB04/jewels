'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useCartStore } from '@/store/cartStore';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function MobileBottomNav() {
  const { getItemCount, wishlist } = useCartStore();
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    setCartCount(getItemCount());
    setWishlistCount(wishlist.length);
  }, [getItemCount, wishlist]);

  const navItems = [
    { label: t.mobileNav.home, icon: 'HomeIcon' as const, href: '/' },
    { label: t.mobileNav.shop, icon: 'SparklesIcon' as const, href: '/landing-page#trending' },
    { label: t.mobileNav.wishlist, icon: 'HeartIcon' as const, href: '/', badge: wishlistCount },
    { label: t.mobileNav.cart, icon: 'ShoppingBagIcon' as const, href: '/cart', badge: cartCount },
    { label: t.mobileNav.profile, icon: 'UserIcon' as const, href: '/' },
  ];

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center relative px-3 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={22} variant={isActive ? 'solid' : 'outline'} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}