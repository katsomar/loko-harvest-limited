"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Phone, User2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_CONFIG = {
  airtel: {
    number: "256708000000", // Airtel Uganda Placeholder
    label: "Airtel Support",
    sub: "Concierge & Logistics",
    color: "bg-[#FF0000]"
  },
  mtn: {
    number: "256772000000", // MTN Uganda Placeholder
    label: "MTN Support",
    sub: "Sales & Inquiries",
    color: "bg-[#FFCC00]"
  }
};

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (number: string) => {
    const message = encodeURIComponent("Hello Loko Harvest, I would like to inquire about your products.");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-10 left-10 z-[100] flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            className="w-80 bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-brand-dark/5 overflow-hidden origin-bottom-left"
          >
            {/* Header */}
            <div className="bg-brand-dark p-6 text-white relative">
              <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary-yellow flex items-center justify-center text-brand-dark overflow-hidden">
                        <User2 size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-brand-dark" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-tight">Harvest Concierge</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Typically replies in 10m</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 bg-off-white/50">
                <p className="text-xs text-brand-dark/60 leading-relaxed mb-4">
                    Welcome to Loko Harvest. Please choose your preferred line to start a conversation:
                </p>

                {Object.entries(WHATSAPP_CONFIG).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => openWhatsApp(config.number)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-dark/5 hover:border-primary-yellow hover:shadow-xl hover:shadow-brand-dark/5 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner", config.color)}>
                                <Phone size={18} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-sm text-brand-dark">{config.label}</h4>
                                <p className="text-[10px] text-brand-dark/40 uppercase tracking-[1px]">{config.sub}</p>
                            </div>
                        </div>
                        <ExternalLink size={14} className="text-brand-dark/20 group-hover:text-primary-yellow transition-colors" />
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white/40 border-t border-brand-dark/5 text-center">
                <p className="text-[9px] text-brand-dark/30 uppercase tracking-[2px]">Loko Harvest Limited &copy; Official Channel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative",
          isOpen ? "bg-brand-dark text-white" : "bg-green-500 text-white"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
            >
                <X size={28} />
            </motion.div>
          ) : (
            <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
            >
                <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Active Badge */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-yellow"></span>
            </span>
        )}
      </motion.button>
    </div>
  );
};
