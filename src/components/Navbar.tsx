"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Rocket, Swords, ShoppingCart, Users, Search, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WIKI_CATEGORIES } from '@/lib/wikiConfig';
import { cn } from '@/lib/utils';
import { SearchInput } from './SearchInput';
import { LanguageSwitcher } from './LanguageSwitcher';

const iconMap: Record<string, React.ElementType> = {
  Rocket, Swords, ShoppingCart, Users
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-bdo-surface backdrop-blur-md">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-4 xl:px-4 2xl:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 xl:gap-2 2xl:gap-6">
            <Link href="/" className="flex-shrink-0">
              <span className="text-[20px] 2xl:text-2xl font-serif font-bold text-bdo-gold text-shadow-gold tracking-widest pr-2">
                MELISSIA <span className="text-white">GAMES</span>
              </span>
            </Link>
            
            <div className="hidden 2xl:flex items-baseline space-x-0.5 2xl:space-x-1">
              <Link href="/wiki/enhancement-calculator" className="flex items-center space-x-1 px-1 2xl:px-2 py-2 rounded-md text-[13px] 2xl:text-sm font-medium transition-colors text-bdo-gold hover:text-white whitespace-nowrap">
                <Swords className="w-4 h-4 mr-1" />
                <span>Enhancement</span>
              </Link>
              
              {WIKI_CATEGORIES.filter(c => !(c as any).isHidden).map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <div
                    key={category.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(category.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={cn(
                      "flex items-center space-x-1 px-1 2xl:px-2 py-2 rounded-md text-[13px] 2xl:text-sm font-medium transition-colors hover:text-bdo-gold whitespace-nowrap",
                      activeDropdown === category.name ? "text-bdo-gold" : "text-gray-300"
                    )}>
                      {Icon && <Icon className="w-4 h-4 mr-1" />}
                      <span>{category.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === category.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-64 rounded-sm shadow-lg bg-bdo-surface backdrop-blur-md border border-bdo-border hover:border-[rgba(198,156,109,0.4)] transition-colors duration-300 ease-in-out ring-1 ring-black ring-opacity-5 overflow-hidden"
                        >
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {category.pages.map((page) => (
                              (page as any).isSubcategoryHeader ? (
                                <div key={page.slug} className="px-4 py-2 mt-1 mb-1 text-xs font-bold text-bdo-gold uppercase tracking-wider bg-bdo-gray/30 border-y border-bdo-border/50">
                                  {page.title}
                                </div>
                              ) : (
                                <Link
                                  key={page.slug}
                                  href={`/wiki/${page.slug}`}
                                  className={`block px-4 py-3 text-sm text-gray-300 hover:bg-bdo-gray hover:text-bdo-gold transition-colors ${(page as any).isSubcategoryItem ? "pl-6" : ""}`}
                                >
                                  {page.title}
                                </Link>
                              )
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              
              <Link href="/wiki/server-info" className="flex flex-col items-center justify-center px-1 2xl:px-2 py-1 rounded-md text-[12px] 2xl:text-[13px] font-medium transition-transform transform hover:-translate-y-0.5 text-bdo-gold hover:text-white leading-tight text-center ml-2">
                <span>Server Info</span>
                <span>& Rates</span>
              </Link>
            </div>
          </div>

          <div className="hidden 2xl:flex items-center space-x-1 2xl:space-x-4">
            <SearchInput className="w-24 2xl:w-48" />
            <LanguageSwitcher />
            <Link href="/wiki/download-setup" className="px-3 2xl:px-5 py-2 bg-bdo-crimson text-white rounded text-[13px] 2xl:text-sm font-medium hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,20,60,0.4)] whitespace-nowrap">
              Play Now
            </Link>
          </div>

          <div className="-mr-2 flex 2xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-bdo-gray focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="2xl:hidden bg-bdo-surface backdrop-blur-md relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/wiki/enhancement-calculator"
                className="block px-4 py-2 text-base font-serif font-bold text-bdo-gold hover:text-white hover:bg-bdo-gray rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Enhancement Calculator
              </Link>
              {WIKI_CATEGORIES.filter(c => !(c as any).isHidden).map((category) => (
                <div key={category.name} className="py-2">
                  <div className="text-bdo-gold px-3 font-serif mb-2">{category.name}</div>
                  {category.pages.map((page) => (
                    (page as any).isSubcategoryHeader ? (
                      <div key={page.slug} className="px-6 py-2 mt-2 text-sm font-bold text-bdo-gold uppercase tracking-wider bg-bdo-gray/30">
                        {page.title}
                      </div>
                    ) : (
                      <Link
                        key={page.slug}
                        href={`/wiki/${page.slug}`}
                        className={`block px-6 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-bdo-gray rounded-md ${(page as any).isSubcategoryItem ? "pl-10" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {page.title}
                      </Link>
                    )
                  ))}
                </div>
              ))}
              <div className="px-4 py-4 flex justify-between items-center relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
                <SearchInput />
                <div className="ml-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
