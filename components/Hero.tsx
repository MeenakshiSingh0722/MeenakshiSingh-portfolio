'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import Image from 'next/image';

const titles = [
  'Machine Learning Engineer',
  'Aspiring Data Scientist',
  'AI & Computer Vision Dev',
  'B.Tech CSE · Lucknow',
];

function useCounter(end: number, active: boolean, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const tick = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
      else setV(end);
    };
    requestAnimationFrame(tick);
  }, [end, active, duration]);
  return v;
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [active, setActive] = useState(false);

  /* Typewriter */
  useEffect(() => {
    const cur = titles[titleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < cur.length) t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 52);
      else t = setTimeout(() => setTyping(false), 2000);
    } else {
      if (displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 24);
      else { setTitleIndex((i) => (i + 1) % titles.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, titleIndex]);

  useEffect(() => { const t = setTimeout(() => setActive(true), 500); return () => clearTimeout(t); }, []);

  const cgpa     = useCounter(889, active, 1600);
  const projects = useCounter(5,   active, 1100);
  const peers    = useCounter(10,  active, 1300);

  /* Subtle tilt */
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 70, damping: 18 });
  const sy = useSpring(ry, { stiffness: 70, damping: 18 });
  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top  - r.height / 2) / r.height) * -8);
    ry.set(((e.clientX - r.left - r.width  / 2) / r.width)  *  8);
  };
  const resetTilt = () => { rx.set(0); ry.set(0); };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-background">

      {/* ── Photo background (right side bleeds) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Photo — positioned right */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%]" style={{ zIndex: 0 }}>
          <Image
            src="/meenakshi_singh.jpg"
            alt="Meenakshi Singh"
            fill
            className="object-cover object-[center_top]"
            priority
            style={{ opacity: 0.28 }}
          />
          {/* Gradient: left edge totally opaque bg */}
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.92) 25%, hsl(var(--background) / 0.55) 55%, hsl(var(--background) / 0.25) 80%, transparent 100%)',
            }}
          />
          {/* Gradient: bottom fade */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 15%, transparent 75%, hsl(var(--background)) 100%)' }}
          />
        </div>

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
        />
      </div>

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 flex items-center justify-between pt-28 pb-0 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
          Portfolio · 2025
        </span>
        <div className="flex items-center gap-4">
          {[
            { href: 'https://github.com/MeenakshiSingh0722', icon: Github },
            { href: 'https://linkedin.com/in/meenakshi-singh12', icon: Linkedin },
            { href: 'mailto:meenakshisingh0722@gmail.com', icon: Mail },
          ].map(({ href, icon: Icon }) => (
            <motion.a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-max px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="max-w-3xl">

          {/* Role label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-primary opacity-70" />
            <span className="text-xs font-mono tracking-[0.18em] uppercase text-primary">
              ML Engineer &amp; AI Developer
            </span>
          </motion.div>

          {/* Big display name */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[clamp(3.8rem,10vw,9rem)] leading-[0.9] tracking-tighter text-foreground uppercase"
            >
              Meena-
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[clamp(3.8rem,10vw,9rem)] leading-[0.9] tracking-tighter text-gradient-gold uppercase"
            >
              kshi Singh
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-display text-base sm:text-lg text-muted-foreground">
              {displayed}
              <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }} />
            </span>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-foreground text-background font-semibold text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Hire Me
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </motion.a>
            <motion.a
              href="/meenakshiSINGH.pdf"
              download="Meenakshi_Singh_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-border text-foreground font-semibold text-sm rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Resume
            </motion.a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-8 sm:gap-12"
          >
            {[
              { value: cgpa === 889 ? '8.89' : (cgpa / 100).toFixed(2), label: 'CGPA / 10' },
              { value: `${projects}+`, label: 'Projects' },
              { value: `${peers}+`, label: 'Mentored' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-start gap-8">
                {i > 0 && <div className="hidden sm:block w-px h-10 bg-border self-center" />}
                <div>
                  <p className="font-display font-black text-3xl text-foreground tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono tracking-wider uppercase">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Photo card (lg: floating right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute right-16 xl:right-24 top-1/2 -translate-y-1/2 z-10"
      >
        <motion.div
          onMouseMove={tilt}
          onMouseLeave={resetTilt}
          style={{ rotateX: sx, rotateY: sy, perspective: 800 }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute -inset-4 rounded-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(35 28% 66% / 0.4), transparent 70%)' }} />

          {/* Spinning ring */}
          <div className="absolute -inset-1 rounded-3xl photo-ring opacity-60" />
          <div className="absolute inset-0 rounded-3xl bg-background opacity-80" style={{ zIndex: 1 }} />

          {/* Photo */}
          <div className="relative w-56 h-64 xl:w-64 xl:h-72 rounded-2xl overflow-hidden" style={{ zIndex: 2 }}>
            <Image
              src="/meenakshi_singh.jpg"
              alt="Meenakshi Singh"
              fill
              sizes="256px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Name label */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-4 py-2 bg-card border border-border rounded-full text-xs font-semibold text-foreground shadow-xl"
          >
            Meenakshi Singh
          </motion.div>

          {/* Available dot */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute -top-3 -right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-semibold shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 flex items-center gap-3 pb-8 px-4 sm:px-6 lg:px-8 container-max w-full"
      >
        <motion.button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="h-px w-8 bg-current" />
          Scroll
        </motion.button>
      </motion.div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
