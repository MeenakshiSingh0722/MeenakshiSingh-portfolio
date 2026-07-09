'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import Image from 'next/image';

function Counter({ end, suffix = '', decimals = 0, active }: { end: number; suffix?: string; decimals?: number; active: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const tick = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1500, 1);
      setV(parseFloat(((1 - Math.pow(1 - p, 3)) * end).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
      else setV(end);
    };
    requestAnimationFrame(tick);
  }, [end, decimals, active]);
  return <>{v.toFixed(decimals)}{suffix}</>;
}

const stats = [
  { end: 8.89, suffix: '', decimals: 2, label: 'CGPA' },
  { end: 5,    suffix: '+', decimals: 0, label: 'Projects' },
  { end: 10,   suffix: '+', decimals: 0, label: 'Mentored' },
  { end: 7,    suffix: '+', decimals: 0, label: 'Products' },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.12 });

  return (
    <section id="about" className="section-padding">
      <div ref={ref} className="container-max">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-display font-black text-[clamp(4rem,8vw,7rem)] leading-none text-muted/30 dark:text-border select-none">01</span>
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-1">About Me</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight">
              The Story
            </h2>
          </div>
        </motion.div>

        <div className="rule mb-12" />

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT — photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/meenakshi_singh.jpg"
                  alt="Meenakshi Singh"
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-cover object-top"
                />
                {/* Warm tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>

              {/* Name plate */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/80 backdrop-blur-sm border border-border rounded-xl">
                <p className="font-display font-black text-sm uppercase tracking-wider text-foreground">Meenakshi Singh</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">B.Tech CSE · Univ. of Lucknow</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mt-4 max-w-sm mx-auto lg:mx-0">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl border border-border bg-card text-center cursor-default"
                >
                  <p className="font-display font-black text-2xl text-foreground">
                    <Counter {...s} active={inView} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-7"
          >
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-muted-foreground">
                I'm a <span className="text-foreground font-semibold">final year B.Tech CSE student</span> at the University of Lucknow, passionate about building intelligent systems that move beyond notebooks and into the real world.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                From engineering a <span className="text-foreground font-semibold">90%+ accurate face recognition attendance system</span> to predictive models on 1,000+ row datasets, I focus on shipping work that performs in production — not just in demos.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Currently exploring <span className="text-foreground font-semibold">deep learning, NLP, and MLOps</span>. I mentor peers in Python and ML foundations, and have led cross-functional teams across 7+ software products.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-primary mb-4">Education</p>
              {[
                { title: 'B.Tech — Computer Science', sub: 'University of Lucknow · 2023–2027', metric: '8.89 CGPA' },
                { title: 'Class XII — UP Board',       sub: 'L.P.S. Bulandshahr · 2022',        metric: '88.4%' },
              ].map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.1 }}
                  className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0 group hover:pl-2 transition-all duration-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{e.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.sub}</p>
                  </div>
                  <span className="shrink-0 text-xs font-mono font-semibold text-primary mt-0.5">{e.metric}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick tags */}
            <div className="pt-2">
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-primary mb-3">Currently working with</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'SQL', 'React', 'Node.js'].map((t) => (
                  <motion.span
                    key={t}
                    whileHover={{ scale: 1.06 }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
