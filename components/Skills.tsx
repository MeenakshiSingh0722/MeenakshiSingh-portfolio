'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const bars = [
  { name: 'Python',         pct: 92 },
  { name: 'Pandas / NumPy', pct: 90 },
  { name: 'Scikit-learn',   pct: 87 },
  { name: 'OpenCV',         pct: 82 },
  { name: 'SQL (MySQL)',    pct: 78 },
  { name: 'Java / C++',    pct: 72 },
  { name: 'JavaScript',    pct: 68 },
];

const groups = [
  {
    label: 'ML & AI',
    tags: ['Supervised Learning', 'Computer Vision', 'Feature Engineering', 'EDA', 'Predictive Modeling', 'Hyperparameter Tuning'],
  },
  {
    label: 'Libraries',
    tags: ['Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    label: 'Languages & DB',
    tags: ['Python', 'Java', 'C++', 'JavaScript', 'SQL (MySQL)'],
  },
  {
    label: 'Tools',
    tags: ['Git & GitHub', 'DBMS', 'OOP', 'Tkinter', 'Systems Architecture'],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.06 });

  return (
    <section id="skills" className="section-padding bg-card">
      <div ref={ref} className="container-max">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-display font-black text-[clamp(4rem,8vw,7rem)] leading-none text-muted/30 dark:text-border select-none">02</span>
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-1">Expertise</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight">
              Skills
            </h2>
          </div>
        </motion.div>

        <div className="rule mb-12" />

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Proficiency bars */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-6">Core Proficiency</p>
            <div className="space-y-5">
              {bars.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{b.name}</span>
                    <motion.span
                      className="text-xs font-mono text-primary tabular-nums"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.07 }}
                    >
                      {b.pct}%
                    </motion.span>
                  </div>
                  <div className="h-[3px] bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(35 40% 78%))' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.pct}%` } : {}}
                      transition={{ duration: 1.1, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skill groups */}
          <div className="space-y-8">
            {groups.map((g, gi) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + gi * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-mono tracking-[0.16em] uppercase text-primary shrink-0">{g.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.tags.map((t, ti) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.15 + gi * 0.1 + ti * 0.03 }}
                      whileHover={{ scale: 1.06, y: -1 }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background border border-border text-muted-foreground hover:border-primary hover:text-foreground transition-colors cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
