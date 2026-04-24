'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Server, HardDrive, Receipt, Loader2, Smartphone, CheckCircle2, Phone, Mail, AlertCircle, User } from 'lucide-react';

type PayStatus = 'idle' | 'processing' | 'redirecting' | 'error';

export default function PaywallPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [payStatus, setPayStatus] = useState<PayStatus>('idle');
  const [errorMsg, setErrorMsg]   = useState('');

  const handlePay = async () => {
    if (!email || !firstName || !phone) {
      setErrorMsg('Please enter your name, email, and phone number.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setPayStatus('processing');

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          first_name: firstName,
          phone_number: phone 
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setPayStatus('error');
        setErrorMsg(data.error || 'Could not initiate payment. Please try again.');
        return;
      }

      // Redirect to Pesapal-hosted checkout where the user picks MTN / Airtel
      if (data.redirect_url) {
        setPayStatus('redirecting');
        window.location.href = data.redirect_url;
      }
    } catch {
      setPayStatus('error');
      setErrorMsg('Network error. Check your connection and try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPayStatus('idle');
    setErrorMsg('');
  };

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
                  <span className="font-bold block text-white/40">$27.00</span>
                  <span className="text-[10px] text-white/20 uppercase font-bold tracking-tighter">Later</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold font-serif">$30.00</span>
              <span className="text-white/40 text-xs uppercase tracking-wider">Equivalent to UGX 111,600</span>
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
            
            <div className="bg-black/5 rounded-2xl p-6 border border-black/5 mb-6">
              <p className="text-brand-dark/60 text-xs uppercase font-bold tracking-widest mb-1">Total Due Now</p>
              <p className="text-4xl font-bold font-serif">$30.00</p>
              <p className="text-[10px] text-brand-dark/40 font-bold mt-1 uppercase">Equivalent to UGX 111,600</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-lg group"
            >
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-yellow-400 rounded-md text-[8px] flex items-center justify-center font-black text-black">MTN</div>
                <div className="w-5 h-5 bg-red-600 text-white rounded-md text-[7px] flex items-center justify-center font-black">AIRTEL</div>
              </div>
              Pay via Mobile Money
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-black/10">
            <p className="text-brand-dark/30 text-[9px] uppercase font-bold tracking-[0.2em] text-center">
              Secure Checkout via Pesapal
            </p>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-md p-8 relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-brand-dark">Complete Payment</h2>
                  <p className="text-brand-dark/50 text-sm">Secure Hosting Setup Fee</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors text-brand-dark/30 hover:text-brand-dark"
                >
                  <AlertCircle className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="bg-primary-yellow/10 rounded-2xl p-4 mb-6 border border-primary-yellow/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary-yellow tracking-widest">Total Amount</p>
                  <p className="text-2xl font-serif font-bold text-brand-dark">UGX 111,600</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-yellow-400 rounded text-[9px] font-black text-black">MTN</div>
                  <div className="px-2 py-1 bg-red-600 rounded text-[9px] font-black text-white">AIRTEL</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/30" />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-black/5 border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 text-brand-dark font-bold placeholder:text-brand-dark/20 outline-none focus:border-primary-yellow focus:bg-white transition-all"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/30" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-black/5 border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 text-brand-dark font-bold placeholder:text-brand-dark/20 outline-none focus:border-primary-yellow focus:bg-white transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/30" />
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g. 0771...)"
                    className="w-full bg-black/5 border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 text-brand-dark font-bold placeholder:text-brand-dark/20 outline-none focus:border-primary-yellow focus:bg-white transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3 text-xs font-bold"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
                  </motion.div>
                )}

                <button
                  onClick={handlePay}
                  disabled={payStatus === 'processing' || payStatus === 'redirecting'}
                  className="w-full py-5 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70 transition-all hover:bg-black hover:shadow-xl active:scale-[0.98]"
                >
                  {payStatus === 'idle'       && <>Proceed to Pay — UGX 111,600</>}
                  {payStatus === 'processing'  && <><Loader2 className="animate-spin w-5 h-5 text-primary-yellow" /> Preparing Checkout…</>}
                  {payStatus === 'redirecting' && <><Loader2 className="animate-spin w-5 h-5 text-primary-yellow" /> Redirecting…</>}
                  {payStatus === 'error'       && <>Try Again</>}
                </button>

                <p className="text-[10px] text-center text-brand-dark/40 font-medium px-4">
                  By clicking proceed, you will be redirected to Pesapal's secure gateway to complete your payment with MTN or Airtel Money.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
