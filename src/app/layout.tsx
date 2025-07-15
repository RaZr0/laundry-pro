"use client";

import { heIL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClientProvider } from '@tanstack/react-query';
import { Arimo } from 'next/font/google';
import "./globals.css";
import { queryClient } from './query-client';
import { DialogProvider } from '@/providers/dialog-provider';

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400','500','600', '700'],
  variable: '--font-arimo',
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
            <DialogProvider>{children}</DialogProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
