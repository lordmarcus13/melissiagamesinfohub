"use client";

import { useEffect, useRef } from "react";

export function ClickSoundProvider() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3");
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.5; // Set volume to 50% so it's not overwhelming

    const playSound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the clicked element or any of its parents is a clickable element
      const isClickable = target.closest('a') || 
                          target.closest('button') || 
                          target.closest('[role="button"]') || 
                          target.closest('input[type="button"]') ||
                          target.closest('input[type="submit"]') ||
                          target.closest('summary');
                          
      if (isClickable) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Allow rapid clicking
          audioRef.current.play().catch((err) => {
            // Ignore autoplay/interaction errors
            console.debug("Click sound prevented:", err);
          });
        }
      }
    };

    // Use the capture phase so it triggers even if a child calls stopPropagation()
    document.addEventListener("click", playSound, true);

    return () => {
      document.removeEventListener("click", playSound, true);
    };
  }, []);

  return null;
}
