"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'zh', name: '中文' },
  { code: 'th', name: 'ไทย' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'pt', name: 'Português' },
  { code: 'pl', name: 'Polski' },
  { code: 'ro', name: 'Română' },
  { code: 'ja', name: '日本語' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (locale: string) => {
    // pathname usually starts with /locale/something, replace the first segment
    const segments = pathname.split('/');
    if (segments.length > 1 && segments[1] === currentLocale) {
      segments[1] = locale;
    } else {
      // If no locale in pathname somehow, prepend it
      segments.splice(1, 0, locale);
    }
    const newPath = segments.join('/');
    window.location.href = newPath;
    setIsOpen(false);
  };

  const activeLanguage = languages.find(l => l.code === currentLocale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-bdo-gold transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden lg:inline-block uppercase">{activeLanguage.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-bdo-dark border border-bdo-border ring-1 ring-black ring-opacity-5 overflow-hidden z-50 max-h-96 overflow-y-auto custom-scrollbar"
          >
            <div className="py-1" role="menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-sm transition-colors",
                    currentLocale === lang.code
                      ? "bg-bdo-gold/20 text-bdo-gold font-bold"
                      : "text-gray-300 hover:bg-bdo-gray hover:text-white"
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
