'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'Mentored 10+ engineering peers in Python semantics, system debugging, and core ML theories',
  'Supervised development of 7+ technical software products across cross-functional teams',
  'Reduced integration errors and merge bugs by 40% through structured code reviews',
  'Led end-to-end ML project delivery from architecture design to deployment',
];

const certs = [
  { title: 'Face Attendance Training',      sub: 'Python & Computer Vision',      year: '2025', emoji: '🤖' },
  { title: 'Forage Virtual Experience',     sub: 'Data Analytics Job Simulation',  year: '2025', emoji: '📊' },
];

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <section id="experience" className="section-padding bg-card">
      <div ref={ref} className="container-max">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-display font-black text-[clamp(4rem,8vw,7rem)] leading-none text-muted/30 dark:text-border select-none">04</span>
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-1">Background</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight">Leadership</h2>
          </div>
        </motion.div>

        <div className="rule mb-12" />

        <div className="grid lg:grid-cols-2 gap-14">

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-6">Technical Mentorship & Leadership</p>
            <p className="text-xs text-muted-foreground mb-2 font-mono">Peer Mentor & Project Coordinator · 2025</p>

            <div className="space-y-3 mb-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{h}</p>
                </motion.div>
              ))}
            </div>

            <div className="rule mb-6" />

            <div className="flex items-center gap-8">
              {[{ v: '10+', l: 'Mentored' }, { v: '7+', l: 'Products' }, { v: '40%', l: 'Fewer Bugs' }].map((s) => (
                <div key={s.l}>
                  <p className="font-display font-black text-2xl text-foreground">{s.v}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5 uppercase tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certs + Education */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-6">Certifications</p>
              <div className="space-y-3">
                {certs.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 py-4 border-b border-border last:border-0"
                  >
                    <span className="text-2xl">{c.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                    </div>
                    <span className="text-xs font-mono text-primary">{c.year}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="p-6 rounded-xl border border-border bg-background"
            >
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-4">Current Education</p>
              <p className="font-display font-black text-lg text-foreground uppercase tracking-tight mb-1">
                University of Lucknow
              </p>
              <p className="text-sm text-muted-foreground mb-5">B.Tech Computer Science & Engineering</p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="font-display font-black text-3xl text-foreground">8.89</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1 uppercase">CGPA / 10</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-display font-black text-3xl text-foreground">2027</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1 uppercase">Expected</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-display font-bold text-sm text-foreground">Top</p>
                  <p className="font-display font-bold text-sm text-foreground">Performer</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1 uppercase">Rank</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
