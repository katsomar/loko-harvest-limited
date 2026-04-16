"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="relative w-10 h-10">
              <Image
                src="/logos/loko.png"
                alt="Loko Harvest Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider">
              LOKO HARVEST
            </span>
          </Link>
          <p className="text-white/60 font-sans leading-relaxed mb-8">
            Experience the legacy of quality poultry farming in Uganda. Naturally raised, premium products from our farm to your table.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary-yellow hover:border-primary-yellow hover:text-brand-dark transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-serif text-xl mb-6 text-primary-yellow">Quick Links</h3>
          <ul className="space-y-4">
            {["Home", "About", "Gallery", "Reviews", "Contacts", "Orders"].map((link) => (
              <li key={link}>
                <Link
                  href={link === "Orders" ? "/orders" : `/#${link.toLowerCase()}`}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-xl mb-6 text-primary-yellow">Contact Us</h3>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-yellow shrink-0 mt-1" />
              <span>Plot 45, Industrial Area, Kampala, Uganda</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-yellow shrink-0" />
              <span>+256 700 000 000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-yellow shrink-0" />
              <span>info@lokoharvest.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-serif text-xl mb-6 text-primary-yellow">Stay Updated</h3>
          <p className="text-white/60 mb-6 font-sans text-sm">
            Join our mailing list to receive the latest updates and exclusive offers.
          </p>
          <div className="flex bg-white/5 border border-white/10 rounded-full overflow-hidden focus-within:border-primary-yellow transition-colors">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent px-4 py-3 flex-1 text-sm outline-none"
            />
            <button className="px-6 py-2 bg-primary-yellow text-brand-dark font-bold text-xs uppercase hover:bg-primary-yellow-bright transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:row items-center justify-between gap-6 text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Loko Harvest Limited. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
