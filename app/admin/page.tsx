'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, ContactSubmission } from '@/lib/supabase';
import {
  Mail, LogOut, RefreshCw, CheckCircle2, Circle, ArrowLeft,
  Shield, AlertCircle, Chrome, ExternalLink, Info, Copy, Check,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'meenakshisingh0722@gmail.com';

/* Setup guide steps for Google OAuth */
function SetupGuide() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const redirectUri = supabaseUrl
    ? `${supabaseUrl}/auth/v1/callback`
    : 'https://YOUR_PROJECT.supabase.co/auth/v1/callback';

  const copy = () => {
    navigator.clipboard.writeText(redirectUri).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const steps = [
    {
      n: 1,
      title: 'Create a Google Cloud Project',
      body: (
        <>
          Go to{' '}
          <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5">
            console.cloud.google.com <ExternalLink className="w-3 h-3" />
          </a>
          {' '}and create a new project (or use an existing one).
        </>
      ),
    },
    {
      n: 2,
      title: 'Create OAuth 2.0 Credentials',
      body: (
        <>
          Go to <strong className="text-foreground">APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID</strong>.
          Choose <strong className="text-foreground">Web application</strong> as the type.
        </>
      ),
    },
    {
      n: 3,
      title: 'Set the Authorised Redirect URI',
      body: (
        <div>
          <p className="mb-2">Add this exact URI to <strong className="text-foreground">Authorised redirect URIs</strong>:</p>
          <div className="flex items-center gap-2 p-2.5 bg-background rounded-lg border border-border font-mono text-xs text-foreground break-all">
            <span className="flex-1">{redirectUri}</span>
            <button onClick={copy} className="shrink-0 p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      ),
    },
    {
      n: 4,
      title: 'Copy Client ID & Client Secret',
      body: <>After creating, copy both your <strong className="text-foreground">Client ID</strong> and <strong className="text-foreground">Client Secret</strong>.</>,
    },
    {
      n: 5,
      title: 'Paste into Supabase Dashboard',
      body: (
        <>
          Open your{' '}
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5">
            Supabase Dashboard <ExternalLink className="w-3 h-3" />
          </a>
          {' '}→ Authentication → Providers → Google → toggle ON → paste Client ID &amp; Client Secret → Save.
        </>
      ),
    },
  ];

  return (
    <div className="mt-5 rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
      >
        <span className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          How to set up Google sign-in
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-2 space-y-4 border-t border-border">
              {steps.map((step) => (
                <div key={step.n} className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {step.n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        setLoading(false);
      })();
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) loadSubmissions();
  }, [user]);

  const loadSubmissions = async () => {
    setSubmissionsLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setSubmissions(data);
    setSubmissionsLoading(false);
  };

  const markRead = async (id: string, read: boolean) => {
    await supabase.from('contact_submissions').update({ read }).eq('id', id);
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, read } : s)));
  };

  const handleSignIn = async () => {
    setSignInLoading(true);
    setSignInError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin/callback` },
    });
    if (error) {
      setSignInError(error.message);
      setSignInLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-border border-t-primary rounded-full"
        />
      </div>
    );
  }

  /* ── Sign-in ── */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>

          <div className="p-8 rounded-2xl border border-border bg-card shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display font-bold text-xl text-foreground text-center mb-2">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Sign in with Google to manage contact messages. Only{' '}
              <span className="text-foreground font-medium">{ADMIN_EMAIL}</span> can access
              this area.
            </p>

            <motion.button
              onClick={handleSignIn}
              disabled={signInLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all"
            >
              {signInLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="block w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                />
              ) : (
                <Chrome className="w-4 h-4" />
              )}
              {signInLoading ? 'Redirecting to Google…' : 'Continue with Google'}
            </motion.button>

            {signInError && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Sign-in failed:</strong> {signInError}. Make sure Google OAuth is
                  configured in your Supabase project.
                </p>
              </div>
            )}

            <SetupGuide />
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Wrong account ── */
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm p-8 rounded-2xl border border-destructive/30 bg-card text-center"
        >
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <h1 className="font-display font-bold text-lg text-foreground mb-2">Access Denied</h1>
          <p className="text-sm text-muted-foreground mb-1">
            Signed in as <span className="text-foreground font-medium">{user.email}</span>
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Only <span className="text-foreground">{ADMIN_EMAIL}</span> can access this dashboard.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleSignOut}
              className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              Sign Out
            </button>
            <Link
              href="/"
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold text-center hover:opacity-90 transition-all"
            >
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Dashboard ── */
  const unread = submissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-2xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-sm text-foreground">Admin</span>
            </div>
            <AnimatePresence>
              {unread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {unread} new
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={loadSubmissions}
              disabled={submissionsLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <motion.span
                animate={submissionsLoading ? { rotate: 360 } : { rotate: 0 }}
                transition={submissionsLoading ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
                className="block"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.span>
            </motion.button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="font-display font-bold text-xl text-foreground">Contact Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {submissions.length} total &middot; {unread} unread
          </p>
        </div>

        {submissionsLoading ? (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-7 h-7 border-2 border-border border-t-primary rounded-full"
            />
          </div>
        ) : submissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <div className="p-3 rounded-xl bg-muted mb-3">
              <Mail className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No messages yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Contact form submissions will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {submissions.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`p-5 rounded-2xl border bg-card transition-all duration-200 ${
                    sub.read ? 'border-border opacity-70' : 'border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm text-foreground">{sub.name}</p>
                        {!sub.read && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary font-medium"
                          >
                            New
                          </motion.span>
                        )}
                      </div>
                      <a href={`mailto:${sub.email}`} className="text-xs text-primary hover:underline">
                        {sub.email}
                      </a>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed whitespace-pre-wrap">
                        {sub.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(sub.created_at).toLocaleString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => markRead(sub.id, !sub.read)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                      aria-label={sub.read ? 'Mark unread' : 'Mark read'}
                    >
                      {sub.read
                        ? <Circle className="w-4 h-4" />
                        : <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
