import { Arimo } from 'next/font/google';
import "./globals.css";
import { Layout } from '@/components/layout/layout';

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose weights you need
  variable: '--font-arimo', // Optional for Tailwind
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={arimo.className}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
