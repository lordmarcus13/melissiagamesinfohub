import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'ru', 'tr', 'zh', 'th', 'id', 'ko', 'vi', 'de', 'es', 'fr', 'pt', 'pl', 'ro', 'ja'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = 'en';
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return {
      locale: locale as string,
      messages
    };
  } catch (error) {
    console.error("i18n import error for locale", locale, error);
    notFound();
  }
});
