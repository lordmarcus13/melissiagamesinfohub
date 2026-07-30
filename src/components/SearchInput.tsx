"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { WIKI_CATEGORIES } from "@/lib/wikiConfig";
import Fuse, { FuseResult } from "fuse.js";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type PageInfo = {
  title: string;
  slug: string;
  filename: string;
  category: string;
  content: string;
};

export function SearchInput({ className = "", inputClassName = "", iconClassName = "w-4 h-4 left-3" }: { className?: string, inputClassName?: string, iconClassName?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<PageInfo>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [searchIndex, setSearchIndex] = useState<PageInfo[]>([]);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load search index on mount
  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then((data: { filename: string, content: string }[]) => {
        const mergedPages = WIKI_CATEGORIES.flatMap(cat => 
          cat.pages.filter(p => !(p as any).isSubcategoryHeader).map(p => {
            const fileData = data.find(f => f.filename === p.filename);
            return { ...p, category: cat.name, content: fileData ? fileData.content : "" };
          })
        );
        setSearchIndex(mergedPages);
        setIsReady(true);
      })
      .catch(err => {
        console.error("Failed to load search index", err);
        // Fallback to just titles
        const fallbackPages = WIKI_CATEGORIES.flatMap(cat => 
          cat.pages.filter(p => !(p as any).isSubcategoryHeader).map(p => ({ ...p, category: cat.name, content: "" }))
        );
        setSearchIndex(fallbackPages);
        setIsReady(true);
      });
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      keys: ["title", "category", "content"],
      threshold: 0.4,
      includeMatches: true,
      ignoreLocation: true, // Search everywhere in the text
    });
  }, [searchIndex]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
      setIsOpen(true);
    }
  }, [query, fuse]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to extract a snippet of text around the match
  const getSnippet = (result: FuseResult<PageInfo>) => {
    if (!result.matches) return null;
    const contentMatch = result.matches.find(m => m.key === 'content');
    if (!contentMatch || !contentMatch.value) return null;

    // Get the first match index
    const matchIndex = contentMatch.indices[0][0];
    const matchLength = contentMatch.indices[0][1] - matchIndex + 1;
    
    const snippetStart = Math.max(0, matchIndex - 40);
    const snippetEnd = Math.min(contentMatch.value.length, matchIndex + matchLength + 40);
    
    let snippet = contentMatch.value.substring(snippetStart, snippetEnd);
    if (snippetStart > 0) snippet = "..." + snippet;
    if (snippetEnd < contentMatch.value.length) snippet = snippet + "...";

    // Highlight the match
    const lowerSnippet = snippet.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const qIndex = lowerSnippet.indexOf(lowerQuery);
    
    if (qIndex !== -1) {
      return (
        <span className="text-gray-400 text-xs italic mt-1 block">
          {snippet.substring(0, qIndex)}
          <span className="text-bdo-gold font-bold bg-bdo-gold/10 px-1 rounded">{snippet.substring(qIndex, qIndex + query.length)}</span>
          {snippet.substring(qIndex + query.length)}
        </span>
      );
    }

    return <span className="text-gray-400 text-xs italic mt-1 block">{snippet}</span>;
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search InfoHub..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() !== "" && setIsOpen(true)}
          className={`w-full bg-bdo-surface backdrop-blur-md border border-bdo-border text-white px-4 py-2 rounded-sm pl-10 focus:outline-none focus:border-bdo-gold focus:ring-1 focus:ring-bdo-gold hover:border-[rgba(198,156,109,0.4)] transition-colors duration-300 ease-in-out shadow-inner ${inputClassName}`}
        />
        <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClassName}`} />
        {!isReady && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bdo-gold w-4 h-4 animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full max-h-96 overflow-y-auto custom-scrollbar bg-bdo-surface backdrop-blur-md border border-bdo-border hover:border-[rgba(198,156,109,0.4)] transition-colors duration-300 ease-in-out rounded-sm shadow-2xl z-50 overflow-hidden"
          >
            {results.length > 0 ? (
              results.map((result) => (
                <div 
                  key={result.item.slug}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    router.push(`/wiki/${result.item.slug}`);
                  }}
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-bdo-surface hover:text-white cursor-pointer transition-colors relative"
                >
                  <div className="font-medium text-bdo-gold">{result.item.title}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{result.item.category}</div>
                  {getSnippet(result)}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
                </div>
              ))
            ) : (
              query.trim() !== "" && (
                <div className="p-4 text-center text-sm text-gray-500">
                  No results found for "{query}"
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
