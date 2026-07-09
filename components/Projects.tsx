'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    no: '01',
    title: 'AI Face Recognition Attendance System',
    period: 'Jun – Jul 2025',
    tags: ['OpenCV', 'Python', 'MySQL', 'Tkinter'],
    metrics: [{ v: '90%+', l: 'Accuracy' }, { v: '70%', l: 'Faster' }, { v: '50+', l: 'Profiles' }],
    desc: 'Automated attendance framework parsing 50+ concurrent image profiles via OpenCV. Achieved 90%+ accuracy and cut manual processing by 70% with a GUI dashboard.',
    href: 'https://github.com/MeenakshiSingh0722',
    featured: true,
  },
  {
    no: '02',
    title: 'Machine Learning Prediction Models',
    period: '2025',
    tags: ['Scikit-learn', 'Pandas', 'NumPy'],
    metrics: [{ v: '89%', l: 'Accuracy' }, { v: '1000+', l: 'Rows' }],
    desc: 'Logistic Regression & Random Forest on Titanic/Iris datasets with 89% accuracy via structured preprocessing and feature engineering.',
    href: 'https://github.com/MeenakshiSingh0722',
    featured: true,
  },
  {
    no: '03',
    title: 'Smart Billing & Invoice Automation',
    period: '2025',
    tags: ['React', 'Node.js', 'Database Design'],
    metrics: [{ v: '60%', l: 'Efficiency ↑' }, { v: '100+', l: 'Concurrent' }],
    desc: 'Responsive invoice platform with 10+ relational DB schema ops, boosting workflow efficiency by 60% via data validation and concurrent handling.',
    href: 'https://github.com/MeenakshiSingh0722',
    featured: false,
  },
  {
    no: '04',
    title: 'Sky Shaper Suite',
    period: '2025',
    tags: ['Data Visualization', 'JavaScript'],
    metrics: [{ v: '30%', l: 'Load ↓' }, { v: '5+', l: 'Metrics' }],
    desc: 'Environmental data viz platform tracking 5+ air quality metrics with optimized asset pipelines reducing render latency by 30%.',
    href: 'https://github.com/MeenakshiSingh0722',
    featured: false,
  },
  {
    no: '05',
    title: 'Cafe Management System',
    period: '2024',
    tags: ['C++', 'Data Structures', 'Algorithm Design'],
    metrics: [{ v: '45%', l: 'Checkout ↑' }, { v: '100+', l: 'Items' }],
    desc: 'Automated transaction pipeline for 100+ menu items with refactored index lookup functions reducing checkout delays by 45%.',
    href: 'https://github.com/MeenakshiSingh0722',
    featured: false,
  },
];

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.04 });

  return (
    <section id="projects" className="section-padding">
      <div ref={ref} className="container-max">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-display font-black text-[clamp(4rem,8vw,7rem)] leading-none text-muted/30 dark:text-border select-none">03</span>
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-1">Portfolio</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight">Projects</h2>
          </div>
        </motion.div>

        <div className="rule mb-12" />

        <div className="space-y-px">
          {projects.map((p, i) => (
            <motion.a
              key={p.no}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ backgroundColor: 'hsl(var(--card))', transition: { duration: 0.15 } }}
              className="group block rounded-xl p-5 sm:p-6 border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                  {/* Number */}
                  <span className="shrink-0 font-display font-black text-3xl sm:text-4xl text-border group-hover:text-primary transition-colors tabular-nums leading-none mt-1">
                    {p.no}
                  </span>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground uppercase tracking-tight leading-tight">
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.desc}</p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-5 mb-3">
                      {p.metrics.map((m) => (
                        <div key={m.l}>
                          <p className="font-display font-bold text-sm text-foreground">{m.v}</p>
                          <p className="text-xs text-muted-foreground font-mono">{m.l}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-card border border-border text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all mt-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.div>
              </div>

              {/* Bottom rule */}
              <div className="rule mt-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
