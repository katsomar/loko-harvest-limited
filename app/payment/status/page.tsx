'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

type Status = 'verifying' | 'success' | 'failed';

function PaymentStatusContent() {
  const params = useSearchParams();
  const tx_ref = params.get('tx_ref');
  const status = params.get('status');
  const [pageStatus, setPageStatus] = useState<Status>('verifying');

  useEffect(() => {
    if (status === 'successful' || status === 'completed') {
      setPageStatus('success');
    } else if (status === 'failed' || status === 'cancelled') {
      setPageStatus('failed');
    } else {
      // If no status param, just fall back based on tx_ref presence
      setPageStatus(tx_ref ? 'success' : 'failed');
    }
  }, [status, tx_ref]);

  return (
    <div className="h-screen w-full bg-brand-dark flex flex-col items-center justify-center gap-8 relative overflow-hidden text-white p-8">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-yellow/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-light-green/10 rounded-full blur-[120px]" />

      <div className="relative w-20 h-20 bg-white rounded-2xl p-2 shadow-xl">
        <Image src="/logos/loko.png" alt="Loko Harvest" fill className="object-contain p-1" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark rounded-3xl p-10 border border-white/10 text-center max-w-md w-full"
      >
        {pageStatus === 'verifying' && (
          <>
            <Loader2 className="w-12 h-12 text-primary-yellow animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">Verifying Payment…</h2>
            <p className="text-white/50 text-sm">Please wait while we confirm your transaction.</p>
          </>
        )}

        {pageStatus === 'success' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-light-green mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2 text-light-green">Payment Received!</h2>
            <p className="text-white/60 text-sm mb-6">
              Your hosting fee has been submitted successfully. The Loko Harvest team will confirm and restore your website access shortly.
            </p>
            <p className="text-white/30 text-xs font-mono">Ref: {tx_ref}</p>
          </>
        )}

        {pageStatus === 'failed' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2 text-red-400">Payment Not Completed</h2>
            <p className="text-white/60 text-sm mb-6">
              Your transaction was cancelled or failed. Please try again or contact us directly.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary-yellow text-brand-dark rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-yellow-bright transition-colors"
            >
              Try Again
            </a>
          </>
        )}
      </motion.div>

      <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">
        © 2026 Loko Harvest Limited
      </p>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-yellow animate-spin" />
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}
