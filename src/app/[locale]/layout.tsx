import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "../globals.css";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PType - Typing Practice",
  description: "Test and improve your typing speed with PType",
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['/logo.png'],
    apple: ['/logo.png'],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-950`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthInitializer />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
