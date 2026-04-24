"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface PremiumQRCodeProps {
  value: string;
  size?: number;
  logoImage?: string;
  logoSize?: number;
}

export const PremiumQRCode: React.FC<PremiumQRCodeProps> = ({
  value,
  size = 200,
  logoImage = "/logos/loko.png",
  logoSize = 50,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 
      }}
      className="relative flex items-center justify-center p-4 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(27,67,50,0.15)] border border-dark-green/5"
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="H" // High error correction for logo embedding
        includeMargin={false}
        imageSettings={{
          src: logoImage,
          height: logoSize,
          width: logoSize,
          excavate: true,
        }}
        fgColor="#1B4332" // Dark Green
        bgColor="transparent"
      />
      
      {/* Decorative corner accents */}
      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary-yellow rounded-tl-xl" />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary-yellow rounded-br-xl" />
    </motion.div>
  );
};
