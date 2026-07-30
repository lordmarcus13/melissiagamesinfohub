import Link from 'next/link';
import { WIKI_CATEGORIES } from '@/lib/wikiConfig';

export function Footer() {
  return (
    <footer className="bg-black border-t border-bdo-border py-12 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bdo-gold/5 via-black to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-bold text-bdo-gold tracking-widest block">
                MELISSIA
              </span>
              <span className="text-xl font-serif font-bold text-white tracking-widest block">
                GAMES
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate Black Desert Online private server experience. Join thousands of adventurers in a world without limits.
            </p>
          </div>
          
          {WIKI_CATEGORIES.slice(0, 3).map((category) => (
            <div key={category.name}>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">{category.name}</h3>
              <ul className="space-y-3">
                {category.pages.filter(p => !(p as any).isSubcategoryHeader).slice(0, 4).map((page) => (
                  <li key={page.slug}>
                    <Link href={`/wiki/${page.slug}`} className="text-gray-400 hover:text-bdo-gold text-sm transition-colors">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-bdo-border/50 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Melissia Games. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Created by StarssEnd
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://discord.com/channels/906712777333288990" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-bdo-blue transition-colors text-sm">
              Discord
            </a>
            <a href="https://office.melissia.games/shop/cash" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-bdo-gold transition-colors text-sm">
              Support Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
