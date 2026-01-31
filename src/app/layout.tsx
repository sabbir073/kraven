import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'KRAVEN - The First Ever CreatorFi Platform',
  description:
    'Kraven is the pioneering CreatorFi protocol that enables creators to tokenize their influence and build sustainable creator economies with blockchain technology.',
  keywords: [
    'CreatorFi',
    'NFT',
    'Web3',
    'Creator Economy',
    'Blockchain',
    'Token',
    'DeFi',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'KRAVEN - The First Ever CreatorFi Platform',
    description: 'The Wave 2 of InfoFi is Here. Tokenize your influence and build your creator economy.',
    type: 'website',
    images: ['/logo/Kraven aaai banner.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KRAVEN - The First Ever CreatorFi Platform',
    description: 'The Wave 2 of InfoFi is Here. Tokenize your influence and build your creator economy.',
    images: ['/logo/Kraven aaai banner.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0a] text-white`}>
        {children}
      </body>
    </html>
  );
}
