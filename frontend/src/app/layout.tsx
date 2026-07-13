import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import QuickEnquiry from '@/components/layout/QuickEnquiry';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: { default: 'GRD Travels - Safe Journey, Our Priority', template: '%s | GRD Travels' },
  description: 'Premium tour & travel booking platform. Explore India and the world with GRD Travels.',
  keywords: ['GRD Travels', 'tour packages', 'travel booking', 'tempo traveller', 'Delhi tours'],
  openGraph: {
    type: 'website',
    siteName: 'GRD Travels',
    title: 'GRD Travels - Safe Journey, Our Priority',
    description: 'Premium tour & travel booking platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
          <QuickEnquiry />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
