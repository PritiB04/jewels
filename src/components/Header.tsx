'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES, Language, getTranslations } from '@/lib/i18n';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const options: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: 'SunIcon' },
    { value: 'dark', label: 'Dark', icon: 'MoonIcon' },
    { value: 'system', label: 'System', icon: 'ComputerDesktopIcon' },
  ];

  const currentIcon = theme === 'system' ? 'ComputerDesktopIcon' : resolvedTheme === 'dark' ? 'MoonIcon' : 'SunIcon';

  return (
    <div className="relative">
      <button
        aria-label="Toggle theme"
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full hover:bg-muted transition-colors"
      >
        <Icon name={currentIcon} size={20} className="text-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[80]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-2 z-[90] bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[130px]"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setTheme(opt.value); setOpen(false); }}
                  className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                    theme === opt.value ? 'text-primary font-semibold bg-muted' : 'text-foreground'
                  }`}
                >
                  <Icon name={opt.icon} size={16} className={theme === opt.value ? 'text-primary' : 'text-muted-foreground'} />
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-muted transition-colors text-xs font-semibold uppercase tracking-wider text-foreground border border-border"
      >
        {language.toUpperCase()}
        <Icon name="ChevronDownIcon" size={12} className="text-muted-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[80]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-2 z-[90] bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[100px]"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code as Language); setOpen(false); }}
                  className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                    language === lang.code ? 'text-primary font-semibold bg-muted' : 'text-foreground'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { getItemCount, wishlist } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const isRtl = language === 'ar';

  const navLinks = [
    { label: t.navigation.rings, href: '/landing-page#rings' },
    { label: t.navigation.necklaces, href: '/landing-page#necklaces' },
    { label: t.navigation.bracelets, href: '/landing-page#bracelets' },
    { label: t.navigation.earrings, href: '/landing-page#earrings' },
    { label: t.navigation.sale, href: '/landing-page#sale' },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlist?.length : 0;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <AppLogo size={56} />
            </Link>

            {/* Nav Links — Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks?.map((link) => (
                <Link
                  key={link?.label}
                  href={link?.href}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                aria-label={t.navigation.search}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Icon name="MagnifyingGlassIcon" size={20} className="text-foreground" />
              </button>

              <Link
                href="/"
                aria-label={`${t.navigation.wishlist} (${wishlistCount} items)`}
                className="relative p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Icon name="HeartIcon" size={20} className="text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                aria-label={`${t.navigation.cart} (${itemCount} items)`}
                className="relative p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Icon name="ShoppingBagIcon" size={20} className="text-foreground" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>

              {/* Language Selector */}
              {mounted && <LanguageSelector />}

              {/* Theme Toggle */}
              {mounted && <ThemeToggle />}

              {/* Hamburger */}
              <button
                aria-label={t.navigation.menu}
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-full hover:bg-muted transition-colors lg:hidden"
              >
                <Icon name="Bars3Icon" size={20} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm drawer-backdrop"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className={`fixed top-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-background flex flex-col ${isRtl ? 'left-0' : 'right-0'}`}
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <AppLogo size={48} />
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label={t.navigation.closeMenu}
                >
                  <Icon name="XMarkIcon" size={20} className="text-foreground" />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {navLinks?.map((link, i) => (
                  <motion.div
                    key={link?.label}
                    initial={{ x: isRtl ? -40 : 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      href={link?.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-border text-foreground font-medium hover:text-primary transition-colors"
                    >
                      <span className="font-display text-xl italic">{link?.label}</span>
                      <Icon name={isRtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'} size={16} className="text-muted-foreground" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ x: isRtl ? -40 : 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  className="pt-6"
                >
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary w-full"
                  >
                    <Icon name="ShoppingBagIcon" size={18} />
                    {t.navigation.viewCart} {itemCount > 0 && `(${itemCount})`}
                  </Link>
                </motion.div>
              </nav>

              <div className="p-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  {t.navigation.freeShipping}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}