"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Plus, Minus, Package, Clock, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "p1",
    name: "Premium Whole Chicken",
    category: "Poultry",
    image: "/product_collection_1776283806405.png",
    options: ["1.2kg - 1.5kg", "1.6kg - 2.0kg"],
    basePrice: 25000,
  },
  {
    id: "p2",
    name: "Farm Fresh Eggs (Tray)",
    category: "Eggs",
    image: "/product_collection_1776283806405.png",
    options: ["Tray of 30"],
    basePrice: 15000,
  },
  {
    id: "p3",
    name: "Chicken Breasts (Boneless)",
    category: "Processed",
    image: "/about_farm_detail_1776283784366.png",
    options: ["500g Pack", "1kg Pack"],
    basePrice: 18000,
  },
  {
    id: "p4",
    name: "Chicken Drumsticks",
    category: "Processed",
    image: "/about_farm_detail_1776283784366.png",
    options: ["1kg Pack"],
    basePrice: 20000,
  },
];

export default function OrdersPage() {
  const [cart, setCart] = useState<{ id: string; qty: number; option: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateCart = (productId: string, qtyDelta: number, option: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId && item.option === option);
      if (existing) {
        const newQty = Math.max(0, existing.qty + qtyDelta);
        if (newQty === 0) return prev.filter((item) => !(item.id === productId && item.option === option));
        return prev.map((item) => (item.id === productId && item.option === option ? { ...item, qty: newQty } : item));
      }
      if (qtyDelta > 0) return [...prev, { id: productId, qty: 1, option }];
      return prev;
    });
  };

  const cartTotal = cart.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product?.basePrice || 0) * item.qty;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setCart([]);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-green rounded-3xl p-12 md:p-20 text-center mb-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grain opacity-10" />
          <div className="relative z-10">
            <span className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[4px] block mb-4">
              Premium Supply
            </span>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6">Place Your Order</h1>
            <p className="text-white/60 max-w-2xl mx-auto font-sans">
              Select from our range of farm-fresh poultry products. We ensure the highest standards of hygiene and quality for every delivery.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-20 relative">
          {/* Product Catalog */}
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl font-serif text-brand-dark mb-10 flex items-center gap-4"
            >
              <Package className="text-primary-yellow" />
              Product Catalog
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-brand-dark/5 hover:shadow-2xl hover:shadow-brand-dark/5 transition-all group"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-brand-dark/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[2px] rounded-full border border-white/10">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6 leading-tight">{product.name}</h3>
                    <div className="space-y-4">
                      {product.options.map((opt) => {
                        const inCart = cart.find((item) => item.id === product.id && item.option === opt);
                        return (
                          <div key={opt} className="flex items-center justify-between p-5 rounded-2xl bg-off-white/80 border border-brand-dark/5 transition-all hover:bg-white hover:border-primary-yellow/40 group/opt">
                            <div>
                               <p className="text-xs font-sans text-brand-dark/40 uppercase tracking-widest mb-1">{opt}</p>
                               <p className="text-lg font-bold text-brand-dark">UGX {product.basePrice.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {inCart ? (
                                <div className="flex items-center gap-3 bg-white p-1 rounded-full shadow-sm border border-brand-dark/5">
                                  <button
                                    onClick={() => updateCart(product.id, -1, opt)}
                                    className="w-10 h-10 rounded-full bg-off-white border border-brand-dark/5 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-bold w-6 text-center text-sm">{inCart.qty}</span>
                                  <button
                                    onClick={() => updateCart(product.id, 1, opt)}
                                    className="w-10 h-10 rounded-full bg-primary-yellow text-brand-dark flex items-center justify-center hover:bg-primary-yellow-bright transition-all"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => updateCart(product.id, 1, opt)}
                                  className="px-6 py-3 bg-brand-dark text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary-yellow hover:text-brand-dark transition-all transform active:scale-95"
                                >
                                  Add to Order
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Order Form Section Below Catalog */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mt-24 p-12 md:p-20 bg-white rounded-[40px] shadow-xl border border-brand-dark/5"
            >
                <div className="max-w-3xl">
                    <span className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[4px] block mb-4">Finalize</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-10">Shipping & Delivery Details</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="relative group">
                                <input type="text" required placeholder="Full Name" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-4 outline-none focus:border-primary-yellow transition-colors peer placeholder-transparent" />
                                <label className="absolute left-0 top-4 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">Full Name</label>
                            </div>
                            <div className="relative group">
                                <input type="email" required placeholder="Email Address" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-4 outline-none focus:border-primary-yellow transition-colors peer placeholder-transparent" />
                                <label className="absolute left-0 top-4 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">Email Address</label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="relative group">
                                <input type="tel" required placeholder="Phone Number" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-4 outline-none focus:border-primary-yellow transition-colors peer placeholder-transparent" />
                                <label className="absolute left-0 top-4 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">Phone Number</label>
                            </div>
                            <div className="relative group">
                                <input type="date" required className="w-full bg-transparent border-b-2 border-brand-dark/10 py-4 outline-none focus:border-primary-yellow transition-colors text-brand-dark/60" />
                                <label className="absolute left-0 -top-4 text-xs text-primary-yellow uppercase tracking-widest font-bold">Preferred Delivery Date</label>
                            </div>
                        </div>

                        <div className="relative group">
                            <input type="text" required placeholder="Delivery Address" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-4 outline-none focus:border-primary-yellow transition-colors peer placeholder-transparent" />
                            <label className="absolute left-0 top-4 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">Delivery Address</label>
                        </div>

                        <div className="relative group">
                            <textarea rows={3} placeholder="Special Instructions (Optional)" className="w-full bg-transparent border-b-2 border-brand-dark/10 py-4 outline-none focus:border-primary-yellow transition-colors peer placeholder-transparent resize-none" />
                            <label className="absolute left-0 top-4 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">Special Instructions</label>
                        </div>

                        <p className="text-brand-dark/40 text-sm italic">
                            By submitting this order, you agree to our terms and will receive a call from our logistics team to confirm the exact delivery window.
                        </p>
                    </form>
                </div>
            </motion.div>
          </div>

          {/* Sticky Sidebar / Order Summary */}
          <aside className="w-full lg:w-96">
            <div className="sticky top-32">
              <div className="bg-brand-dark rounded-[40px] shadow-2xl p-10 border border-white/5 text-white">
                <h3 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4 text-primary-yellow">
                  <ShoppingBag className="w-6 h-6" />
                  Your Selection
                </h3>

                <div className="space-y-8 mb-10 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                      const p = products.find((prod) => prod.id === item.id);
                      return (
                        <motion.div
                          key={`${item.id}-${item.option}`}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex justify-between items-start gap-4 pb-6 border-b border-white/5"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-white">{p?.name}</h4>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{item.option}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <button onClick={() => updateCart(item.id, -1, item.option)} className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all"><Minus size={12}/></button>
                              <span className="text-sm font-bold">{item.qty}</span>
                              <button onClick={() => updateCart(item.id, 1, item.option)} className="w-6 h-6 rounded-full bg-primary-yellow text-brand-dark flex items-center justify-center hover:bg-primary-yellow-bright transition-all"><Plus size={12}/></button>
                            </div>
                          </div>
                          <p className="text-sm font-serif font-bold text-primary-yellow">
                            UGX {((p?.basePrice || 0) * item.qty).toLocaleString()}
                          </p>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {cart.length === 0 && (
                    <div className="text-center py-20 text-white/20 italic text-sm">
                      Your basket is empty. <br/> Select products from the catalog.
                    </div>
                  )}
                </div>

                <div className="space-y-5 pt-8 border-t-2 border-dashed border-white/10">
                  <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>UGX {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
                    <span>Standard Logistics</span>
                    <span>UGX 5,000</span>
                  </div>
                  <div className="flex justify-between text-2xl font-serif font-bold pt-4 text-white">
                    <span>Total</span>
                    <span className="text-primary-yellow">
                      UGX {(cart.length > 0 ? cartTotal + 5000 : 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-12">
                  <button
                    onClick={handleSubmit}
                    disabled={cart.length === 0 || isSubmitting}
                    className="w-full py-5 bg-primary-yellow text-brand-dark font-sans font-bold uppercase tracking-[3px] rounded-2xl hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? "Processing..." : "Submit Order"}
                      {!isSubmitting && <Check className="w-5 h-5" />}
                    </span>
                  </button>
                </div>

                <div className="mt-10 flex flex-col gap-5 pt-10 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-[2px]">
                        <Truck className="w-5 h-5 text-wait/20" /> 24h Express Fulfillment
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-[2px]">
                        <ShieldCheck className="w-5 h-5 text-white/20" /> Guaranteed Farm-to-Table Quality
                    </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white p-12 md:p-20 rounded-[50px] max-w-xl w-full text-center relative overflow-hidden shadow-2xl"
            >
                <div className="absolute top-0 left-0 w-full h-3 bg-primary-yellow" />
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <Check className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Order Received</h2>
                <p className="text-brand-dark/40 mb-12 text-lg leading-relaxed">
                    Thank you for choosing Loko Harvest Limited. Your order has been registered in our system. A concierge will contact you within the hour to coordinate delivery.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="px-10 py-5 bg-brand-dark text-white rounded-2xl font-sans font-bold uppercase tracking-widest hover:bg-primary-yellow hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/20"
                >
                    Back to Catalog
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
