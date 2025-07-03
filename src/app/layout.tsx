'use client';
import { heIL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Arimo } from 'next/font/google';
import "./globals.css";

const queryClient = new QueryClient();

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
        <ClerkProvider localization={heIL}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
