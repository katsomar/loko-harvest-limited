'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldAlert, CreditCard, CheckCircle2, Calendar, Phone, Mail, Globe, MapPin, Server, HardDrive, Receipt } from 'lucide-react';

export default function PaywallPage() {
  return (
    <div className="h-screen w-full bg-brand-dark flex flex-col items-center justify-between p-6 md:p-12 relative overflow-hidden text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-yellow/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-light-green/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grain opacity-30 pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-20"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 bg-white rounded-xl p-2 shadow-xl">
            <Image src="/logos/loko.png" alt="Loko Harvest" fill className="object-contain p-1" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">Loko Harvest</h1>
            <p className="text-primary-yellow text-xs uppercase tracking-[0.3em] font-bold">Limited Partnership</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
          <ShieldAlert className="text-red-500 w-4 h-4" />
          <span className="text-red-500 font-bold text-xs uppercase tracking-widest">Account Suspended</span>
        </div>
      </motion.div>

      {/* Main Content - Three Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
        
        {/* Card 1: Hosting (The Outstanding One) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark rounded-3xl p-8 border border-white/10 flex flex-col justify-between hover:border-primary-yellow/30 transition-all duration-500 group"
        >
          <div>
            <div className="w-12 h-12 bg-primary-yellow/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Server className="text-primary-yellow w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Web Hosting & Maintenance</h3>
            <p className="text-white/50 text-sm mb-6">Full server provisioning, monthly maintenance, and 99.9% uptime guarantee.</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60 italic">Setup Fee</span>
                <div className="text-right">
                  <span className="font-bold block">$30.00</span>
                  <span className="text-[10px] text-primary-yellow uppercase font-bold tracking-tighter">Required Now</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60 italic">Monthly Renewal</span>
                <div className="text-right">
                  <span className="font-bold block text-white/40">$25.00</span>
                  <span className="text-[10px] text-white/20 uppercase font-bold tracking-tighter">Later</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold font-serif">$30.00</span>
              <span className="text-white/40 text-xs uppercase tracking-wider">Outstanding</span>
            </div>
            <div className="w-full py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-center text-red-400 text-xs font-bold uppercase tracking-widest">
              Action Required
            </div>
          </div>
        </motion.div>

        {/* Card 2: Storage (The Paid One) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-dark rounded-3xl p-8 border border-light-green/30 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-light-green text-brand-dark px-6 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-[0.2em]">
            Verified
          </div>
          <div>
            <div className="w-12 h-12 bg-light-green/10 rounded-2xl flex items-center justify-center mb-6">
              <HardDrive className="text-light-green w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Cloud Storage Booking</h3>
            <p className="text-white/50 text-sm mb-6">Dedicated SSD storage for high-resolution assets and database backups.</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60 italic">Asset Storage</span>
                <span className="font-bold line-through text-white/30">$11.00</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold font-serif text-light-green">$0.00</span>
              <span className="text-light-green/40 text-xs uppercase tracking-wider">Remaining</span>
            </div>
            <div className="w-full py-3 bg-light-green/20 border border-light-green/30 rounded-xl text-center text-light-green text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Fully Paid
            </div>
          </div>
        </motion.div>

        {/* Card 3: Summary & Support */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary-yellow rounded-3xl p-8 flex flex-col justify-between text-brand-dark shadow-[0_0_50px_rgba(245,197,24,0.2)]"
        >
          <div>
            <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center mb-6">
              <Receipt className="text-brand-dark w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Billing Summary</h3>
            <p className="text-brand-dark/70 text-sm mb-8">Please settle the outstanding balance to restore website accessibility and dashboard functions.</p>
            
            <div className="bg-black/5 rounded-2xl p-6 border border-black/5">
              <p className="text-brand-dark/60 text-xs uppercase font-bold tracking-widest mb-1">Total Due Now</p>
              <p className="text-4xl font-bold font-serif">$30.00</p>
            </div>
          </div>
          
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-brand-dark/80 text-xs font-bold uppercase tracking-wider">
              <Phone className="w-4 h-4" /> +256 761 974 265
            </div>
            <div className="flex items-center gap-3 text-brand-dark/80 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-4 h-4" /> lokoharvestuganda@gmail.com
            </div>
            <div className="mt-4 pt-4 border-t border-black/10">
              <p className="text-[10px] text-brand-dark/50 leading-relaxed uppercase font-bold">
                Akright Bwebajja, Entebbe Road, Uganda
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-7xl text-center pb-4 relative z-20"
      >
        <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold">
          © 2026 Loko Harvest Limited • Secure Infrastructure Management
        </p>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none animate-pulse-slow" />
    </div>
  );
}
