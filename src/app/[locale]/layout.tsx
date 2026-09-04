import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Noto_Sans, Cinzel } from "next/font/google";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-noto-sans" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <div className={`${notoSans.variable} ${cinzel.variable} flex flex-col min-h-screen dark`}>
      <NextIntlClientProvider messages={messages}>
        <GoogleTranslate />
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
