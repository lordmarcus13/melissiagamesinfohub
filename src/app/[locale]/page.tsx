"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { Play, Disc as Discord, ShoppingCart, Info, Search, ChevronRight, Wrench, Clock, Gift } from "lucide-react";
import { WIKI_CATEGORIES } from "@/lib/wikiConfig";
import { SearchInput } from "@/components/SearchInput";
import { playHoverSound, playClickSound } from "@/lib/sounds";
import { useEffect, useState } from "react";
import { BossTimerModal } from "@/components/BossTimerModal";

export default function Home() {
  const t = useTranslations('Index');
  const playHover = () => playHoverSound();
  const playClick = () => playClickSound();
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            poster="/images/hero-bg.jpg"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bdo-gold via-yellow-200 to-bdo-gold mb-6 drop-shadow-lg tracking-tight uppercase">
              Melissia Games InfoHub
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-10 text-shadow">
              Melissia Games Game and Server Guide Welcome to "InfoHub":<br/>This hub features a number of referral links and informative & guiding content
            </p>

            <div className="flex flex-col items-center mt-10">
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  href="/wiki/download-setup"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-bdo-crimson font-serif text-lg rounded-sm hover:bg-red-700 overflow-hidden shadow-[0_0_20px_rgba(220,20,60,0.5)] hover:shadow-[0_0_30px_rgba(220,20,60,0.8)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bdo-crimson"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>START PLAYING NOW</span>
                </Link>

                <Link 
                  href="https://discord.com/channels/906712777333288990"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[#5865F2] font-serif text-lg rounded-sm hover:bg-[#4752C4] overflow-hidden shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2]"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <Discord className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>JOIN DISCORD</span>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link 
                  href="/wiki/faq"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative inline-flex items-center justify-center px-6 py-2 font-bold text-bdo-dark transition-all duration-200 bg-bdo-gold font-serif text-sm rounded-sm hover:bg-yellow-400 overflow-hidden shadow-[0_0_15px_rgba(198,156,109,0.4)] hover:shadow-[0_0_20px_rgba(198,156,109,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bdo-gold"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-48 group-hover:h-48 opacity-20"></span>
                  <Info className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>MUST READ</span>
                </Link>

                <Link 
                  href="/wiki/technical-faq"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-200 bg-amber-600 font-serif text-sm rounded-sm hover:bg-amber-500 overflow-hidden shadow-[0_0_15px_rgba(217,119,6,0.4)] hover:shadow-[0_0_20px_rgba(217,119,6,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-48 group-hover:h-48 opacity-20"></span>
                  <Wrench className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>FIX GAME</span>
                </Link>

              </div>
            </div>
            
            {/* Server Info Highlight */}
            <div className="mt-10 max-w-5xl mx-auto px-4">
              <div className="relative p-4 md:p-6 group text-center">
                <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <strong className="text-bdo-gold font-serif text-xl md:text-2xl font-bold tracking-wide mr-1 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Melissia Games</strong> 
                  Currently running <span className="text-white font-medium">January 15, 2025 patch</span> with <span className="text-yellow-200 font-medium">Seoul area</span>, <span className="text-white font-medium">Dosa & Scholar & Deadeye classes</span> and <span className="text-white font-medium">Voltarion Horse & Boosted Alpaca mounts</span>.
                </p>
                <p className="mt-4 text-base md:text-lg text-gray-300 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Over <span className="text-white font-medium">six years</span> of continuous development history, offering an active, non-toxic community environment alongside retail-like content with <strong className="text-bdo-gold tracking-wide font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">boosted rates</strong>.
                </p>
                
                <div className="mt-6 flex flex-col items-center justify-center text-bdo-gold/90 animate-pulse">
                  <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">↓ Search for more ↓</span>
                </div>
              </div>
            </div>

            <div className="mt-10 max-w-4xl mx-auto relative z-30">
               <SearchInput 
                 className="w-full shadow-2xl" 
                 inputClassName="py-5 text-lg pl-14" 
                 iconClassName="w-6 h-6 left-5"
               />
               <p className="mt-6 text-sm text-bdo-muted font-light max-w-3xl mx-auto text-center leading-relaxed bg-bdo-surface backdrop-blur-md p-4 rounded-sm border border-bdo-border hover:border-[rgba(198,156,109,0.4)] transition-colors duration-300 ease-in-out shadow-lg">
                This search engine is your biggest assistant on the site. You can query (type) your questions, the information you want to reach, or what you are curious about, without browsing the category, page, or content one by one. The search engine does not just find the pages or titles. It brings all the sentences or content containing your search words. You can find answers to most of your questions.
               </p>
            </div>
          </motion.div>
        </div>
        
        {/* Animated scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-bdo-gold/50 flex justify-center p-2">
            <motion.div 
              className="w-1 h-3 bg-bdo-gold rounded-full"
              animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
      <section className="py-24 bg-transparent relative">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Explore the <span className="text-bdo-gold">InfoHub</span>
            </h2>
            <div className="w-24 h-1 bg-bdo-gold mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
              Everything you need to know to master your journey in Melissia Games.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {WIKI_CATEGORIES.map((category) => (
              <motion.div key={category.name} variants={item} className="h-full">
                <div className="bg-bdo-surface backdrop-blur-md border border-bdo-border rounded-sm p-6 h-full hover:border-[rgba(198,156,109,0.4)] transition-colors duration-300 ease-in-out group flex flex-col">
                  <div className="w-14 h-14 bg-black/50 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-bdo-gold/20 transition-all duration-300">
                    <Info className="w-7 h-7 text-bdo-gold group-hover:text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-serif group-hover:text-bdo-gold transition-colors">{category.name}</h3>
                  <ul className="space-y-3 flex-grow">
                    {category.pages.filter(p => !(p as any).isSubcategoryHeader).slice(0, 4).map((page) => (
                      <li key={page.slug}>
                        <Link 
                          href={`/wiki/${page.slug}`}
                          onMouseEnter={() => playHover()}
                          onClick={() => playClick()}
                          className="text-gray-400 hover:text-white flex items-center group/link text-sm transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 mr-2 text-bdo-gold/50 group-hover/link:text-bdo-gold transition-colors" />
                          <span className="truncate">{page.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {category.pages.filter(p => !(p as any).isSubcategoryHeader).length > 4 && (
                    <div className="mt-6 pt-4 relative">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
                      <span className="text-xs text-bdo-gold/70 italic">+ {category.pages.filter(p => !(p as any).isSubcategoryHeader).length - 4} more guides</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-bdo-surface backdrop-blur-md z-10" />
          <div className="absolute inset-0 bg-[url('/images/footer-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">Ready to write your legend?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Join thousands of players in the most expansive and rewarding BDO private server experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="https://discord.com/channels/906712777333288990"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all bg-[#5865F2] hover:bg-[#4752C4] rounded-sm shadow-lg hover:shadow-[#5865F2]/50 hover:-translate-y-1"
              >
                <Discord className="w-5 h-5 mr-2" />
                Discord
              </Link>
              <Link 
                href="https://office.melissia.games/shop/cash"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="inline-flex items-center justify-center px-8 py-4 font-bold text-bdo-dark transition-all bg-bdo-gold hover:bg-yellow-400 rounded-sm shadow-lg hover:shadow-bdo-gold/50 hover:-translate-y-1"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Support Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BossTimerModal isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />
      {/* Floating Side Action Buttons Container (Desktop) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
        {/* New Player Rewards Button */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.25, transition: { duration: 0.2 } }}
          className="relative group"
        >
          <Link 
            href="/wiki/new-player-rewards"
            onClick={playClick}
            onMouseEnter={playHover}
            className="w-20 h-20 flex flex-col items-center justify-center font-bold text-bdo-dark transition-all bg-bdo-gold hover:bg-yellow-400 hover:shadow-[0_0_35px_rgba(229,179,82,0.9)] rounded-full shadow-[0_0_25px_rgba(229,179,82,0.6)] border-2 border-yellow-200 backdrop-blur-md focus:outline-none"
          >
            <Gift className="w-8 h-8 mb-1" />
            <span className="text-[9px] font-serif leading-tight text-center px-1 uppercase drop-shadow-md">NEW PLAYER<br/>REWARDS</span>
          </Link>
        </motion.div>

        {/* Floating Boss Timer Button */}
        <motion.button 
          onClick={() => { playClick(); setIsTimerOpen(true); }}
          onMouseEnter={() => playHover()}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.25, transition: { duration: 0.2 } }}
          className="w-20 h-20 flex flex-col items-center justify-center font-bold text-white transition-all bg-purple-600 hover:bg-purple-500 hover:shadow-[0_0_35px_rgba(147,51,234,0.9)] rounded-full shadow-[0_0_25px_rgba(147,51,234,0.7)] border-2 border-purple-400 backdrop-blur-md focus:outline-none"
        >
          <Clock className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-serif leading-tight text-center">BOSS<br/>TIMER</span>
        </motion.button>
      </div>

      {/* Floating Side Action Buttons Container (Mobile) */}
      <div className="fixed right-4 bottom-24 z-40 flex md:hidden flex-col gap-4 items-end">
        {/* New Player Rewards Button */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link 
            href="/wiki/new-player-rewards"
            onClick={playClick}
            onMouseEnter={playHover}
            className="w-14 h-14 flex flex-col items-center justify-center font-bold text-bdo-dark transition-all bg-bdo-gold hover:bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(229,179,82,0.6)] border-2 border-yellow-200 backdrop-blur-md focus:outline-none"
          >
            <Gift className="w-6 h-6" />
          </Link>
        </motion.div>

        {/* Mobile Floating Boss Timer Button */}
        <motion.button 
          onClick={() => { playClick(); setIsTimerOpen(true); }}
          onMouseEnter={() => playHover()}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 flex flex-col items-center justify-center font-bold text-white transition-all bg-purple-600 hover:bg-purple-500 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.7)] border-2 border-purple-400 backdrop-blur-md focus:outline-none"
        >
          <Clock className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
