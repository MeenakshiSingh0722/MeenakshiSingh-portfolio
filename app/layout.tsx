import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://meenakshi-singh.vercel.app'),
  title: 'Meenakshi Singh | ML Engineer & Data Scientist',
  description:
    'Personal portfolio of Meenakshi Singh — Machine Learning Enthusiast, Aspiring Data Scientist & AI Engineer pursuing B.Tech CSE at University of Lucknow.',
  keywords: [
    'Meenakshi Singh',
    'Machine Learning',
    'Data Science',
    'AI Engineer',
    'Python',
    'Computer Vision',
    'Portfolio',
  ],
  authors: [{ name: 'Meenakshi Singh' }],
  creator: 'Meenakshi Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Meenakshi Singh | ML Engineer & Data Scientist',
    description:
      'Portfolio of Meenakshi Singh — ML Enthusiast, Aspiring Data Scientist & AI Engineer.',
    siteName: 'Meenakshi Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meenakshi Singh | ML Engineer & Data Scientist',
    description:
      'Portfolio of Meenakshi Singh — ML Enthusiast, Aspiring Data Scientist & AI Engineer.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
