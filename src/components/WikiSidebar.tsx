"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function WikiSidebar({ categories, currentSlug }: { categories: any[], currentSlug: string }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const sidebarContent = (
    <div className="space-y-8 pr-2 custom-scrollbar">
      {categories.filter(c => !(c as any).isHidden).map(category => (
        <div key={category.name}>
          <h4 className="text-bdo-gold font-serif font-bold mb-3 uppercase tracking-wider text-sm pb-2 relative">
            {category.name}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
          </h4>
          <ul className="space-y-2">
            {category.pages.map((page: any) => (
              page.isSubcategoryHeader ? (
                <li key={page.slug} className="pt-3 pb-1">
                  <div className="text-[11px] font-bold text-bdo-gold/80 uppercase tracking-wider">{page.title}</div>
                </li>
              ) : (
              <li key={page.slug}>
                <Link 
                  href={`/wiki/${page.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center text-sm px-2 py-1.5 rounded-sm transition-colors ${
                    page.slug === currentSlug 
                      ? 'bg-bdo-surface backdrop-blur-md text-white border-l-2 border-bdo-gold font-medium' 
                      : 'text-bdo-muted hover:text-gray-200 hover:bg-bdo-surface/30'
                  } ${page.isSubcategoryItem ? 'ml-3' : ''}`}
                >
                  <FileText className="w-3.5 h-3.5 mr-2 opacity-70" />
                  <span className="truncate">{page.title}</span>
                </Link>
              </li>
              )
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-bdo-gold text-black rounded-full shadow-lg shadow-bdo-gold/20 hover:scale-105 transition-transform flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="lg:hidden fixed inset-y-0 right-0 w-80 bg-bdo-surface border-l border-bdo-border z-50 overflow-y-auto shadow-2xl flex flex-col"
            >
              <div className="p-6 pb-2 border-b border-bdo-border flex justify-between items-center relative">
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
                <span className="font-serif font-bold text-bdo-gold uppercase tracking-widest">Categories</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 pt-4 flex-1 overflow-y-auto">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
