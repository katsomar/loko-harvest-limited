"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Image as ImageIcon, MessageSquare, Phone, Share2, Copy, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/#home", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Gallery", href: "/#gallery", icon: ImageIcon },
  { name: "Reviews", href: "/#reviews", icon: MessageSquare },
  { name: "Contact", href: "/#contact", icon: Phone },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const shareUrl = "https://loko-harvest-limited.vercel.app/";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(shareUrl)}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparentAllowed = pathname === "/" || pathname === "/about";

  useEffect(() => {
    if (isMobileMenuOpen || isShareModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isShareModalOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-2",
          isScrolled
            ? "bg-dark-green/90 backdrop-blur-md shadow-lg py-1"
            : isTransparentAllowed
              ? "bg-transparent"
              : "bg-dark-green shadow-lg"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative h-16">
          {/* Logo */}
          <div className="flex-shrink-0 w-48 h-full relative">
            <Link href="/" className="absolute top-1/2 -translate-y-1/2 left-0 group flex items-center gap-2">
              {/* Animated Egg */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -15, 15, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4, // 2s animation + 4s delay = 6s cycle
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  y: [0, -15, 0],
                  rotate: [0, -5, 5, 0],
                  transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                className="w-8 h-10 bg-gradient-to-br from-[#FFFDF5] to-primary-yellow/30 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-xl border border-white/40 relative overflow-hidden flex-shrink-0"
              >
                {/* Egg Shine */}
                <div className="absolute top-1 left-2 w-3 h-4 bg-white/40 rounded-full blur-[2px] -rotate-15" />
              </motion.div>

              {/* Logo */}
              <div className="relative w-28 h-28 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logos/loko.png"
                  alt="Loko Harvest"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  sizes="(max-width: 768px) 112px, 112px"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-white/90 font-sans text-xs tracking-widest uppercase group flex items-center gap-2 overflow-hidden transition-colors duration-300"
              >
                <link.icon className="w-3 h-3 text-primary-yellow/80 transition-transform duration-300 group-hover:scale-110" />
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-yellow transition-transform duration-300 -translate-x-full group-hover:translate-x-0" />
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="p-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all group"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <Link
                href="/orders"
                className="px-6 py-2 bg-primary-yellow text-brand-dark font-sans font-bold text-sm uppercase rounded-full hover:bg-primary-yellow-bright transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-primary-yellow/20"
              >
                Orders
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
               onClick={() => setIsShareModalOpen(true)}
               className="p-2 rounded-full border border-white/10 text-white/80"
             >
               <Share2 className="w-6 h-6" />
             </button>
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-sm p-8 bg-dark-green rounded-[40px] border border-white/10 shadow-2xl overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-yellow to-transparent opacity-50" />
               <button 
                 onClick={() => setIsShareModalOpen(false)}
                 className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>

               <div className="text-center space-y-8">
                  <div className="space-y-2 pt-4">
                    <span className="text-primary-yellow font-sans text-[10px] font-bold uppercase tracking-[4px]">Spread The Word</span>
                    <h3 className="text-2xl font-serif text-white">Share Loko Harvest</h3>
                  </div>

                  {/* QR Code */}
                  <div className="relative mx-auto w-48 h-48 bg-white p-4 rounded-3xl shadow-inner group">
                    <div className="absolute inset-0 bg-primary-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                    <img 
                      src={qrCodeUrl} 
                      alt="Loko Harvest QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest px-8">Or copy the link below</p>
                    <div className="relative group">
                       <input 
                         type="text" 
                         readOnly 
                         value={shareUrl}
                         className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white/80 text-xs font-sans focus:outline-none"
                       />
                       <button
                         onClick={handleCopyLink}
                         className={cn(
                           "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all",
                           copied ? "bg-primary-yellow text-brand-dark" : "bg-white/10 text-white hover:bg-white/20"
                         )}
                       >
                         {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                  </div>

                  <p className="text-white/20 text-[9px] font-sans pb-2">Scan with your phone camera to visit our site</p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-dark flex flex-col items-center justify-center gap-8 overflow-y-auto"
          >
            <button
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl text-white hover:text-primary-yellow transition-colors flex items-center gap-4"
                >
                  <link.icon className="w-8 h-8 text-primary-yellow" />
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 items-center"
            >
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-12 py-4 bg-primary-yellow text-brand-dark font-serif text-2xl rounded-full text-center min-w-[200px]"
              >
                Orders
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
