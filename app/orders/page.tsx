"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Check, Plus, Minus, Package, Clock, Truck, 
  ShieldCheck, X, MapPin, Phone, User, MessageCircle, Info, ExternalLink, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Map } from "@/components/ui/Map";

const products = [
  { id: "p1", name: "Premium Whole Chicken", category: "Poultry", image: "/chicken.png", options: ["1.2kg - 1.5kg", "1.6kg - 2.0kg"], basePrice: 25000 },
  { id: "p2", name: "Farm Fresh Eggs (Tray)", category: "Eggs", image: "/eggs.png", options: ["Tray of 30"], basePrice: 15000 },
  { id: "p3", name: "Boneless Breast (Pack)", category: "Processed", image: "/gallery/farm1.JPG", options: ["1kg Pack"], basePrice: 28000 },
  { id: "p4", name: "Chicken Drumsticks", category: "Processed", image: "/gallery/farm1.JPG", options: ["1kg Pack"], basePrice: 22000 },
  { id: "p5", name: "Buffalo Wings (Pack)", category: "Processed", image: "/gallery/eggs.JPG", options: ["1kg Pack"], basePrice: 18000 },
  { id: "p6", name: "Organic Gizzards", category: "Poultry", image: "/gallery/farm1.JPG", options: ["500g Pack"], basePrice: 12000 },
  { id: "p7", name: "Smoked Whole Chicken", category: "Specialty", image: "/hero.png", options: ["Lg 1.8kg"], basePrice: 35000 },
  { id: "p8", name: "Pre-Seasoned Roast", category: "Specialty", image: "/gallery/eggs2.JPG", options: ["1.5kg"], basePrice: 32000 },
  { id: "p9", name: "Fresh Chicken Thighs", category: "Poultry", image: "/gallery/farm1.JPG", options: ["1kg Pack"], basePrice: 24000 },
  { id: "p10", name: "Premium Duck Breast", category: "Specialty", image: "/gallery/fields1.JPG", options: ["400g Pack"], basePrice: 45000 },
  { id: "p11", name: "Quail Eggs (Pack)", category: "Eggs", image: "/gallery/eggs.JPG", options: ["24 Eggs"], basePrice: 10000 },
  { id: "p12", name: "Chicken Hearts", category: "Poultry", image: "/gallery/farm1.JPG", options: ["500g Pack"], basePrice: 8000 },
];

const CONTACTS = {
  MTN: "+256761974265",
  Airtel: "+256749793597"
};

export default function OrdersPage() {
  const [cart, setCart] = useState<{ id: string; qty: number; option: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCarrierOpen, setIsCarrierOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", altContact: "", location: "" });
  const [locationUrl, setLocationUrl] = useState("");

  const updateCart = (productId: string, qtyDelta: number, option: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId && item.option === option);
      if (existing) {
        const newQty = Math.max(0, existing.qty + qtyDelta);
        if (newQty === 0) return prev.filter((item) => !(item.id === productId && item.option === option));
        return prev.map((item) => (item.id === productId && item.option === option ? { ...item, qty: newQty } : item));
      }
      if (qtyDelta > 0) {
        setIsCartOpen(true);
        return [...prev, { id: productId, qty: 1, option }];
      }
      return prev;
    });
  };

  const cartTotal = cart.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product?.basePrice || 0) * item.qty;
  }, 0);

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        setLocationUrl(url);
        setCustomerInfo(prev => ({ ...prev, location: "Current Location Captured" }));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleFinishOrder = () => {
    if (!customerInfo.name || !customerInfo.altContact) {
      alert("Please enter all details");
      return;
    }
    setIsCheckoutOpen(false);
    setIsCarrierOpen(true);
  };

  const sendOrderToWhatsApp = (carrier: "MTN" | "Airtel") => {
    const number = CONTACTS[carrier].replace("+", "");
    const orderDetails = cart.map(item => {
      const p = products.find(prod => prod.id === item.id);
      return `- ${p?.name} (${item.option}) x ${item.qty} = UGX ${((p?.basePrice || 0) * item.qty).toLocaleString()}`;
    }).join("\n");

    const message = encodeURIComponent(`*LOKO HARVEST ORDER*\n\n*Customer Details:*\nName: ${customerInfo.name}\nContacts: ${customerInfo.altContact}\nLocation: ${locationUrl || "Not shared"}\n\n*Order Items:*\n${orderDetails}\n\n*Total:* UGX ${cartTotal.toLocaleString()}\n\n_Sent via Loko Harvest Portal_`);
    
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    setIsCarrierOpen(false);
    setCart([]);
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-green rounded-[40px] p-12 md:p-20 text-center mb-16 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-grain opacity-10" />
          <div className="relative z-10">
            <span className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[4px] block mb-4">
              Premium Supply
            </span>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6">Place Your Order</h1>
            <p className="text-white/60 max-w-2xl mx-auto font-sans text-lg">
              Direct from our farm to your kitchen. Select your premium poultry below and we'll handle the rest.
            </p>
          </div>
        </motion.div>

        {/* Product Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 4) * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-brand-dark/5 hover:shadow-2xl hover:shadow-brand-dark/5 transition-all group flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-dark/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-[2px] rounded-full border border-white/10">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-4 leading-tight">{product.name}</h3>
                <div className="mt-auto space-y-3">
                  {product.options.map((opt) => {
                    const inCart = cart.find((item) => item.id === product.id && item.option === opt);
                    return (
                      <div key={opt} className="flex items-center justify-between p-3 rounded-xl bg-off-white/80 border border-brand-dark/5 hover:bg-white transition-all">
                        <div className="flex-1 min-w-0 mr-2">
                           <p className="text-[9px] text-brand-dark/40 uppercase tracking-widest truncate">{opt}</p>
                           <p className="text-sm font-bold text-brand-dark">UGX {product.basePrice.toLocaleString()}</p>
                        </div>
                        {inCart ? (
                          <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow-sm border border-brand-dark/5">
                            <button onClick={() => updateCart(product.id, -1, opt)} className="w-7 h-7 rounded-full bg-off-white border border-brand-dark/5 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"><Minus className="w-3 h-3" /></button>
                            <span className="font-bold w-4 text-center text-xs">{inCart.qty}</span>
                            <button onClick={() => updateCart(product.id, 1, opt)} className="w-7 h-7 rounded-full bg-primary-yellow text-brand-dark flex items-center justify-center hover:bg-primary-yellow-bright transition-all"><Plus className="w-3 h-3" /></button>
                          </div>
                        ) : (
                          <button onClick={() => updateCart(product.id, 1, opt)} className="p-2 bg-brand-dark text-white rounded-lg hover:bg-primary-yellow hover:text-brand-dark transition-all"><Plus className="w-4 h-4" /></button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-10 right-28 z-[110] w-16 h-16 bg-primary-yellow text-brand-dark rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-yellow-bright transition-colors"
          >
            <ShoppingBag size={28} />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-dark text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-primary-yellow">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[9998]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[9999] flex flex-col"
            >
              <div className="p-8 border-b border-brand-dark/5 flex items-center justify-between bg-dark-green text-white">
                <h3 className="text-2xl font-serif">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.map((item) => {
                  const p = products.find(prod => prod.id === item.id);
                  return (
                    <div key={`${item.id}-${item.option}`} className="flex gap-4 pb-6 border-b border-brand-dark/5">
                      <div className="w-20 h-20 rounded-2xl bg-off-white overflow-hidden flex-shrink-0">
                        <Image src={p?.image || ""} alt="" width={80} height={80} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-dark text-sm">{p?.name}</h4>
                        <p className="text-[10px] text-brand-dark/40 uppercase tracking-widest">{item.option}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateCart(item.id, -1, item.option)} className="w-8 h-8 rounded-full border border-brand-dark/10 flex items-center justify-center"><Minus size={14}/></button>
                            <span className="font-bold">{item.qty}</span>
                            <button onClick={() => updateCart(item.id, 1, item.option)} className="w-8 h-8 rounded-full bg-primary-yellow flex items-center justify-center"><Plus size={14}/></button>
                          </div>
                          <p className="font-serif font-bold">UGX {((p?.basePrice || 0) * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-8 bg-off-white border-t border-brand-dark/5">
                <div className="flex justify-between text-2xl font-serif font-bold text-brand-dark mb-8">
                  <span>Subtotal</span>
                  <span className="text-primary-yellow">UGX {cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-5 bg-dark-green text-white rounded-2xl font-sans font-bold uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center justify-center gap-3"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Transition Pop-up (Step 1: Info) */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-brand-dark/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[50px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 md:p-16 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-8 right-8 p-3 bg-off-white rounded-full hover:bg-brand-dark hover:text-white transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                   <span className="text-primary-yellow font-sans text-xs font-bold uppercase tracking-[4px] block mb-4">Secure Checkout</span>
                   <h2 className="text-4xl font-serif text-brand-dark mb-8">Delivery Details</h2>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-dark/40 font-bold ml-1">Your Full Name</label>
                        <input 
                          type="text" 
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Farmer John Doe" 
                          className="w-full bg-off-white p-5 rounded-2xl outline-none focus:ring-2 ring-primary-yellow/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-dark/40 font-bold ml-1">Alternative Contact (WhatsApp/Call)</label>
                        <input 
                          type="text" 
                          value={customerInfo.altContact}
                          onChange={(e) => setCustomerInfo(prev => ({ ...prev, altContact: e.target.value }))}
                          placeholder="+256..." 
                          className="w-full bg-off-white p-5 rounded-2xl outline-none focus:ring-2 ring-primary-yellow/20" 
                        />
                      </div>
                      <div className="pt-4">
                        <button 
                          onClick={shareLocation}
                          className="w-full p-6 border-2 border-dashed border-primary-yellow text-brand-dark rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-primary-yellow/5 transition-all group"
                        >
                          <MapPin className={cn("transition-colors", locationUrl ? "text-green-600" : "text-primary-yellow")} /> 
                          {locationUrl ? "Location Captured Successfully" : "Share Delivery Location"}
                        </button>
                      </div>
                      <button 
                        onClick={handleFinishOrder}
                        className="w-full py-6 bg-primary-yellow text-brand-dark rounded-2xl font-bold uppercase tracking-widest text-lg mt-8 hover:bg-primary-yellow-bright shadow-xl shadow-primary-yellow/20 transition-all"
                      >
                        Finish Order
                      </button>
                   </div>
                </div>
                
                <div className="hidden lg:block relative h-full min-h-[400px]">
                   <Map />
                   <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-brand-dark/5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carrier Selection Modal (Step 2) */}
      <AnimatePresence>
        {isCarrierOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-brand-dark/95 flex items-center justify-center p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white rounded-[40px] p-12 max-w-md w-full text-center relative shadow-2xl"
            >
               <div className="w-24 h-24 bg-primary-yellow/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <MessageCircle className="w-12 h-12 text-primary-yellow" />
               </div>
               <h3 className="text-3xl font-serif text-brand-dark mb-4">Choose Carrier</h3>
               <p className="text-brand-dark/40 mb-10 text-sm">Select which line you'd like to send your order through. Our team will receive it instantly.</p>
               
               <div className="space-y-4">
                  <button 
                    onClick={() => sendOrderToWhatsApp("MTN")}
                    className="w-full p-6 bg-[#FFCC00] text-brand-dark rounded-2xl font-bold flex items-center justify-between hover:scale-[1.02] transition-transform"
                  >
                    MTN Line <ExternalLink size={18} />
                  </button>
                  <button 
                    onClick={() => sendOrderToWhatsApp("Airtel")}
                    className="w-full p-6 bg-[#FF0000] text-white rounded-2xl font-bold flex items-center justify-between hover:scale-[1.02] transition-transform"
                  >
                    Airtel Line <ExternalLink size={18} />
                  </button>
               </div>
               
               <button onClick={() => setIsCarrierOpen(false)} className="mt-8 text-brand-dark/20 hover:text-brand-dark transition-colors uppercase tracking-widest text-[9px] font-bold">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
