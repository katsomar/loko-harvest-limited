"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Image as ImageIcon, MessageSquare, Phone } from "lucide-react";
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparentAllowed = pathname === "/" || pathname === "/about";

  return (
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
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white/90 font-sans text-sm tracking-widest uppercase group flex items-center gap-2 overflow-hidden transition-colors duration-300"
            >
              <link.icon className="w-4 h-4 text-primary-yellow/80 transition-transform duration-300 group-hover:scale-110" />
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-yellow transition-transform duration-300 -translate-x-full group-hover:translate-x-0" />
            </Link>
          ))}
          <Link
            href="/orders"
            className="px-6 py-2 bg-primary-yellow text-brand-dark font-sans font-bold text-sm uppercase rounded-full hover:bg-primary-yellow-bright transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-primary-yellow/20"
          >
            Orders
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-dark flex flex-col items-center justify-center gap-8"
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
            >
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-12 py-4 bg-primary-yellow text-brand-dark font-serif text-2xl rounded-full"
              >
                Orders
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
