"use client";

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export function GoogleTranslate() {
  const locale = useLocale();

  useEffect(() => {
    let gtLocale = locale;
    if (locale === 'zh') gtLocale = 'zh-CN';
    
    // Set googtrans cookie
    if (locale === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${gtLocale}; path=/;`;
      document.cookie = `googtrans=/en/${gtLocale}; path=/; domain=.${window.location.hostname};`;
    }

    // Load script if not exists
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false
        }, 'google_translate_element');
      };
    }
  }, [locale]);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
}
