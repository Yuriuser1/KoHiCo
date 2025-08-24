
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Providers from "@/components/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "KoHiCo - Премиальная корейская косметика",
  description: "Официальный интернет-магазин премиальной корейской косметики. Sulwhasoo, The History of Whoo, BonCho, Rejuran, O HUI. Только оригинальные товары с доставкой по России.",
  keywords: "корейская косметика, k-beauty, Sulwhasoo, The History of Whoo, уход за кожей, premium косметика",
  authors: [{ name: "KoHiCo" }],
  creator: "KoHiCo",
  publisher: "KoHiCo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.kohico.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "KoHiCo - Премиальная корейская косметика",
    description: "Официальный интернет-магазин премиальной корейской косметики. Только оригинальные товары с доставкой по России.",
    url: 'https://www.kohico.ru',
    siteName: 'KoHiCo',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers session={session}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
