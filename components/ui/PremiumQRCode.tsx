"use client";

import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

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
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = async () => {
    if (!qrRef.current) return;

    try {
      const canvas = await html2canvas(qrRef.current, {
        scale: 4, // Higher scale for better quality
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true, // Important for the logo image
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [100, 100], // Custom square format for QR
      });

      // Add QR code to PDF
      pdf.addImage(imgData, "PNG", 10, 10, 80, 80);
      
      // Add some text branding
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(27, 67, 50); // dark-green
      pdf.text("Loko Harvest Limited", 50, 95, { align: "center" });

      pdf.save("loko-harvest-qr.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const downloadAsImage = async () => {
    if (!qrRef.current) return;

    try {
      const canvas = await html2canvas(qrRef.current, {
        scale: 4,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = "loko-harvest-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // Expose methods to parent via window or just keep them internal for now
  // For simplicity in this task, I'll add the buttons directly below the QR code 
  // or provide a way to trigger them.
  
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        ref={qrRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="relative flex items-center justify-center p-6 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(27,67,50,0.15)] border border-dark-green/5"
      >
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={false}
          imageSettings={{
            src: logoImage,
            height: logoSize,
            width: logoSize,
            excavate: true,
          }}
          fgColor="#1B4332"
          bgColor="transparent"
        />
        
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary-yellow rounded-tl-2xl" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary-yellow rounded-br-2xl" />
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={downloadAsImage}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-[10px] font-bold uppercase tracking-wider transition-all"
        >
          Download PNG
        </button>
        <button
          onClick={downloadAsPDF}
          className="px-4 py-2 bg-primary-yellow hover:bg-primary-yellow-bright text-brand-dark rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary-yellow/20"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

