"use client";

import { useState, useEffect, useRef } from "react";
import { X, Bell, BellOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const bossSchedule = [
    { time: "01:00", bosses: ["Kzarka", "Bulgasal"] },
    { time: "01:15", bosses: ["Uturi"] },
    { time: "01:30", bosses: ["Golden Pig King"] },
    { time: "01:45", bosses: ["Sangoon"] },
    { time: "05:00", bosses: ["Bulgasal"] },
    { time: "05:15", bosses: ["Uturi"] },
    { time: "05:30", bosses: ["Golden Pig King"] },
    { time: "05:45", bosses: ["Sangoon"] },
    { time: "09:00", bosses: ["Targargo", "Bulgasal"] },
    { time: "09:15", bosses: ["Uturi"] },
    { time: "09:30", bosses: ["Katzvariak", "Golden Pig King"] },
    { time: "09:45", bosses: ["Sangoon"] },
    { time: "10:00", bosses: ["Giant Mudster", "Red Nose"] },
    { time: "12:00", bosses: ["Stormbringer Karanda"] },
    { time: "13:00", bosses: ["Vell", "Bulgasal"] },
    { time: "13:15", bosses: ["Uturi"] },
    { time: "13:30", bosses: ["Golden Pig King"] },
    { time: "13:45", bosses: ["Sangoon"] },
    { time: "14:00", bosses: ["Thundercloud Ancient Kutum"] },
    { time: "15:30", bosses: ["Quint", "Muraka"] },
    { time: "16:00", bosses: ["Stormbringer Nouver"] },
    { time: "17:00", bosses: ["Offin", "Bulgasal"] },
    { time: "17:15", bosses: ["Uturi"] },
    { time: "17:30", bosses: ["Golden Pig King"] },
    { time: "17:45", bosses: ["Sangoon"] },
    { time: "18:00", bosses: ["Kzarka Nightmares"] },
    { time: "19:00", bosses: ["Garmoth"] },
    { time: "21:00", bosses: ["Bulgasal"] },
    { time: "21:15", bosses: ["Uturi"] },
    { time: "21:30", bosses: ["Dim Tree Spirit", "Dastard Bheg", "Golden Pig King"] },
    { time: "21:45", bosses: ["Sangoon"] },
    { time: "23:30", bosses: ["Nouver", "Kzarka Nightmares"] }
];

function getGMT3Now() {
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utcMs + (3600000 * 3));
}

interface BossTimerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BossTimerModal({ isOpen, onClose }: BossTimerModalProps) {
    const [serverTime, setServerTime] = useState("--:--:--");
    const [countdown, setCountdown] = useState("--:--:--");
    const [activeBosses, setActiveBosses] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [alertsEnabled, setAlertsEnabled] = useState(false);
    
    const listRef = useRef<HTMLUListElement>(null);
    const notifiedBossIndex = useRef<number | null>(null);
    const alertsEnabledRef = useRef(alertsEnabled);

    // Keep ref in sync with state for setInterval closure
    useEffect(() => {
        alertsEnabledRef.current = alertsEnabled;
    }, [alertsEnabled]);

    const toggleAlerts = () => {
        if (!alertsEnabled) {
            if ("Notification" in window) {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        setAlertsEnabled(true);
                    } else {
                        alert("Please allow notifications in your browser settings to receive alerts.");
                    }
                });
            } else {
                alert("This browser does not support desktop notifications.");
            }
        } else {
            setAlertsEnabled(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const tick = () => {
            const gmt3Date = getGMT3Now();
            
            const sH = String(gmt3Date.getHours()).padStart(2, '0');
            const sM = String(gmt3Date.getMinutes()).padStart(2, '0');
            const sS = String(gmt3Date.getSeconds()).padStart(2, '0');
            setServerTime(`Server Time (GMT+3): ${sH}:${sM}:${sS}`);

            const currentTotalSecs = (gmt3Date.getHours() * 3600) + (gmt3Date.getMinutes() * 60) + gmt3Date.getSeconds();

            let nextIdx = -1;
            let targetTotalSecs = 0;

            for (let i = 0; i < bossSchedule.length; i++) {
                const [h, m] = bossSchedule[i].time.split(':').map(Number);
                const slotSecs = (h * 3600) + (m * 60);

                if (slotSecs > currentTotalSecs) {
                    nextIdx = i;
                    targetTotalSecs = slotSecs;
                    break;
                }
            }

            if (nextIdx === -1) {
                nextIdx = 0;
                const [h, m] = bossSchedule[0].time.split(':').map(Number);
                targetTotalSecs = (h * 3600) + (m * 60) + 86400;
            }

            const remainingSecs = targetTotalSecs - currentTotalSecs;
            const hours = Math.floor(remainingSecs / 3600);
            const mins = Math.floor((remainingSecs % 3600) / 60);
            const secs = remainingSecs % 60;

            setCountdown(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
            
            // Check for notification
            if (alertsEnabledRef.current && remainingSecs <= 300 && notifiedBossIndex.current !== nextIdx) {
                const nextBoss = bossSchedule[nextIdx];
                new Notification("World Boss Spawning Soon!", { 
                    body: `${nextBoss.bosses.join(', ')} spawns in 5 minutes!` 
                });

                try {
                    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                    if (AudioContextClass) {
                        const ctx = new AudioContextClass();
                        const osc = ctx.createOscillator();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(440, ctx.currentTime);
                        osc.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.5);
                    }
                } catch (e) {
                    console.error("Audio playback failed", e);
                }

                notifiedBossIndex.current = nextIdx;
            }

            setActiveIndex((prevIdx) => {
                if (prevIdx !== nextIdx) {
                    setActiveBosses(bossSchedule[nextIdx].bosses);
                    // scroll to active row
                    setTimeout(() => {
                        if (listRef.current) {
                            const activeEl = listRef.current.children[nextIdx] as HTMLElement;
                            if (activeEl) {
                                activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }
                    }, 100);
                    return nextIdx;
                }
                return prevIdx;
            });
        };

        tick();
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-[#1a1c23] border border-[#2c303c] rounded-xl shadow-2xl overflow-hidden relative"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 transition-colors bg-black/40 p-1 rounded-full backdrop-blur-md"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="pt-8 pb-6 px-5 text-center border-b border-[#2c303c] bg-gradient-to-b from-[#222631] to-[#17181e] relative">
                            <button 
                                onClick={toggleAlerts}
                                className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                    alertsEnabled 
                                    ? 'bg-[#e5b3522a] text-[#e5b352] border border-[#e5b352]' 
                                    : 'bg-black/30 text-gray-400 border border-transparent hover:text-gray-200'
                                }`}
                            >
                                {alertsEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
                                {alertsEnabled ? 'Alerts On' : 'Alerts Off'}
                            </button>
                            <div className="text-xs tracking-[1.5px] uppercase text-[#8b92a5] mb-2">{serverTime}</div>
                            <div className="text-5xl font-bold tabular-nums text-[#e5b352] drop-shadow-[0_0_16px_rgba(229,179,82,0.25)] leading-tight mb-4">{countdown}</div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {activeBosses.map((boss, i) => (
                                    <span key={i} className="bg-[#e5b3521f] border border-[#e5b352] text-white px-3 py-1 rounded-md text-sm font-semibold tracking-wide">
                                        {boss}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <ul ref={listRef} className="max-h-[420px] overflow-y-auto m-0 p-0 list-none custom-scrollbar-boss">
                            {bossSchedule.map((entry, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <li 
                                        key={idx} 
                                        className={`flex px-5 py-3 border-b border-[#2c303c] items-center transition-colors duration-150 ${isActive ? 'bg-[#e5b35214] border-l-4 border-l-[#e5b352] pl-[16px]' : ''}`}
                                    >
                                        <div className="font-bold text-[#e5b352] w-[65px] shrink-0 text-[0.95rem]">
                                            {entry.time}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {entry.bosses.map((boss, i) => (
                                                <span key={i} className="bg-[#22252f] border border-[#2c303c] text-[#f0f2f5] px-2 py-0.5 rounded text-xs">
                                                    {boss}
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        
                        <style dangerouslySetInnerHTML={{__html: `
                            .custom-scrollbar-boss::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-scrollbar-boss::-webkit-scrollbar-thumb {
                                background: #454c5e;
                                border-radius: 3px;
                            }
                        `}} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
