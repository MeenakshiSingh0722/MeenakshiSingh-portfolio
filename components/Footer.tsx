'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

const socials = [
  { href: 'https://github.com/MeenakshiSingh0722',        icon: Github,   label: 'GitHub' },
  { href: 'https://linkedin.com/in/meenakshi-singh12',     icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:meenakshisingh0722@gmail.com',           icon: Mail,     label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Brand */}
          <div>
            <p className="font-display font-black text-sm uppercase tracking-[0.14em] text-foreground">
              Meenakshi Singh
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              ML Engineer · AI Developer · B.Tech CSE
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground font-mono order-last sm:order-none">
            &copy; {new Date().getFullYear()} · All rights reserved
          </p>

          {/* Socials */}
          <div className="flex items-center gap-1">
            {socials.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                whileHover={{ scale: 1.12, y: -1 }}
                whileTap={{ scale: 0.92 }}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
            <Link href="/admin" aria-label="Admin" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <Lock className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
