import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KlearStack AI | Intelligent Document Processing & Automated Extraction',
  description:
    'Extract unstructured document data with 99.4% accuracy. Process invoices, bank statements, KYC, and freight manifests in under 800ms with Hexanovate AI.',
  keywords: [
    'KlearStack',
    'Hexanovate',
    'Intelligent Document Processing',
    'IDP AI',
    'Invoice Extraction',
    'Bank Statement OCR',
    'ROI Calculator',
    'MarTech Engineering',
  ],
  authors: [{ name: 'Hexanovate Private Limited' }],
  openGraph: {
    title: 'KlearStack AI — Intelligent Document Processing',
    description: 'Transform unstructured documents into intelligent data with 99.4% accuracy.',
    url: 'https://roi-by-anit.vercel.app',
    siteName: 'KlearStack by Hexanovate',
    images: [
      {
        url: 'https://klearstack.com/wp-content/uploads/2021/08/klearstack-logo.png',
        width: 1200,
        height: 630,
        alt: 'KlearStack AI Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
