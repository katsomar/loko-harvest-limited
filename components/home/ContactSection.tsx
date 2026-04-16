"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { Map } from "@/components/ui/Map";
import { cn } from "@/lib/utils";

const contactInfo = [
  { icon: MapPin, title: "Our Location", detail: "Plot 45, Industrial Area, Kampala, UG" },
  { icon: Phone, title: "Phone Number", detail: "+256 761 974 265" },
  { icon: Mail, title: "Email Address", detail: "info@lokoharvest.com" },
  { icon: Clock, title: "Working Hours", detail: "Mon - Sat: 8:00 AM - 6:00 PM" },
];

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name) newErrors.name = "Full name is required";
    if (!formState.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = "Invalid email format";
    if (!formState.message) newErrors.message = "Please enter your message";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setStatus("loading");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-brand-dark/5"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Get In Touch</h2>
            <p className="text-brand-dark/60 mb-12 font-sans italic">
              Have a question or looking to partner? Send us a message and our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={cn(
                        "w-full bg-transparent border-b-2 py-3 outline-none transition-colors peer placeholder-transparent",
                        errors.name ? "border-red-500" : "border-brand-dark/10 focus:border-primary-yellow"
                    )}
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                  <label className="absolute left-0 top-3 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">
                    Full Name
                  </label>
                  {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold mt-2 tracking-widest">{errors.name}</p>}
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={cn(
                        "w-full bg-transparent border-b-2 py-3 outline-none transition-colors peer placeholder-transparent",
                        errors.email ? "border-red-500" : "border-brand-dark/10 focus:border-primary-yellow"
                    )}
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                  <label className="absolute left-0 top-3 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">
                    Email Address
                  </label>
                  {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold mt-2 tracking-widest">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                   <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-transparent border-b-2 border-brand-dark/10 py-3 outline-none focus:border-primary-yellow transition-colors peer placeholder-transparent"
                  />
                  <label className="absolute left-0 top-3 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">
                    Phone Number
                  </label>
                </div>
                <div className="relative">
                  <select className="w-full bg-transparent border-b-2 border-brand-dark/10 py-3 outline-none focus:border-primary-yellow transition-colors appearance-none text-brand-dark/60">
                    <option value="">Subject</option>
                    <option value="quotes">Product Quote</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className={cn(
                      "w-full bg-transparent border-b-2 py-3 outline-none transition-colors peer placeholder-transparent resize-none",
                      errors.message ? "border-red-500" : "border-brand-dark/10 focus:border-primary-yellow"
                  )}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
                <label className="absolute left-0 top-3 text-brand-dark/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-yellow pointer-events-none uppercase tracking-widest font-bold">
                  Your Message
                </label>
                {errors.message && <p className="text-red-500 text-[10px] uppercase font-bold mt-2 tracking-widest">{errors.message}</p>}
              </div>

              <button
                disabled={status === "loading" || status === "success"}
                className={`w-full py-5 rounded-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                  status === "success" 
                    ? "bg-green-600 text-white" 
                    : "bg-primary-yellow text-brand-dark hover:bg-brand-dark hover:text-white"
                }`}
              >
                {status === "loading" ? <Loader2 className="animate-spin" /> : status === "success" ? "Message Sent!" : "Send Message"}
                {status === "idle" && <Send className="w-5 h-5" />}
              </button>
            </form>
          </motion.div>

          {/* Right: Map & Info */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 h-[400px]"
            >
              <Map />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl border border-brand-dark/5 flex items-start gap-4 hover:shadow-lg transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-yellow/10 flex items-center justify-center shrink-0 group-hover:bg-primary-yellow transition-colors">
                    <item.icon className="w-6 h-6 text-primary-yellow group-hover:text-brand-dark transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-dark mb-1">{item.title}</h4>
                    <p className="text-brand-dark/60 text-sm">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
