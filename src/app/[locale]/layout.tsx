import type { Metadata } from "next";
import "../globals.css";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="font-sans antialiased bg-gray-950">
        <NextIntlClientProvider messages={messages}>
          <AuthInitializer />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
