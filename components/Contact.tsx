'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Send, Mail, Github, Linkedin, Phone, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08 });
  const [form, setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg]   = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
    if (!name || !email || !message) return;
    setStatus('loading'); setErrMsg('');

    const { error } = await supabase.from('contact_submissions').insert({ name, email, message });
    if (error) { setStatus('error'); setErrMsg('Something went wrong. Please email me directly.'); return; }

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    }).catch(() => {});

    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  };

  const contacts = [
    { icon: Mail,     label: 'Email',    value: 'meenakshisingh0722@gmail.com',   href: 'mailto:meenakshisingh0722@gmail.com' },
    { icon: Github,   label: 'GitHub',   value: 'github.com/MeenakshiSingh0722', href: 'https://github.com/MeenakshiSingh0722' },
    { icon: Linkedin, label: 'LinkedIn', value: 'meenakshi-singh12',               href: 'https://linkedin.com/in/meenakshi-singh12' },
    { icon: Phone,    label: 'Phone',    value: '+91-8938083868',                  href: 'tel:+918938083868' },
  ];

  return (
    <section id="contact" className="section-padding">
      <div ref={ref} className="container-max">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-display font-black text-[clamp(4rem,8vw,7rem)] leading-none text-muted/30 dark:text-border select-none">05</span>
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-1">Get in Touch</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight">Contact</h2>
          </div>
        </motion.div>

        <div className="rule mb-12" />

        <div className="grid lg:grid-cols-5 gap-14">

          {/* Left — contact links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              Open to internships, research collaborations, and interesting ML/AI projects.
              Let's build something great.
            </p>

            {/* Available badge */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-foreground">Currently available</span>
            </div>

            <div className="space-y-2 pt-2">
              {contacts.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between py-3.5 border-b border-border hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl border border-border bg-card"
              >
                <CheckCircle2 className="w-10 h-10 text-primary mb-4" />
                <p className="font-display font-black text-xl text-foreground mb-2 uppercase">Message Sent</p>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button onClick={() => setStatus('idle')} className="text-sm text-primary hover:underline font-medium">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name',  label: 'Name',  type: 'text',  placeholder: 'Jane Doe' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={form[f.name as 'name' | 'email']}
                        onChange={onChange}
                        required
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, opportunity, or just say hi…"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-foreground text-background font-semibold text-sm rounded-xl hover:bg-primary hover:text-primary-foreground disabled:opacity-60 transition-all duration-300"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
