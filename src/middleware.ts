import createMiddleware from 'next-intl/middleware';

export const locales = ['en', 'ru', 'tr', 'zh', 'th', 'id', 'ko', 'vi', 'de', 'es', 'fr', 'pt', 'pl', 'ro', 'ja'];

const middleware = createMiddleware({
  locales,
  defaultLocale: 'en'
});

export default function(req: any) {
  console.log("Middleware called for URL:", req.url);
  return middleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
