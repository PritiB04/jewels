import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const socials = [
  { label: 'Instagram', icon: 'HeartIcon', href: 'https://instagram.com' },
  { label: 'Pinterest', icon: 'BookmarkIcon', href: 'https://pinterest.com' },
  { label: 'TikTok', icon: 'PlayIcon', href: 'https://tiktok.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <AppLogo size={32} />
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                Crafters
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Minimal luxury jewelry for the fashion-forward generation.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-8">
            {[
              { label: 'Shop', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Journal', href: '/' },
              { label: 'Privacy', href: '/' },
              { label: 'Terms', href: '/' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Crafters. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-muted-foreground"
              >
                <Icon name={s.icon as 'HeartIcon'} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}