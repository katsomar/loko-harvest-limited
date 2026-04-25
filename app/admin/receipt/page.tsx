"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Plus, Trash2, FileCheck, Download, Settings, Info, CreditCard, CheckCircle2 } from "lucide-react";

interface ReceiptItem {
  id: string;
  description: string;
  price: number;
}

export default function ReceiptGenerator() {
  const [receiptNo, setReceiptNo] = useState("REC-" + Math.floor(10000 + Math.random() * 90000));
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [customerName, setCustomerName] = useState("Loko Harvest Limited");
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money (MTN)");
  const [transactionId, setTransactionId] = useState("PES-" + Math.random().toString(36).substring(7).toUpperCase());
  const [items, setItems] = useState<ReceiptItem[]>([
    { id: "1", description: "Vercel Pro Plan - Hosting Setup Fee", price: 30.00 },
    { id: "2", description: "Cloud Storage Booking - Asset Management", price: 11.00 },
    { id: "3", description: "Tax Adjustment", price: 2.00 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "New Item", price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof ReceiptItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const tealColor = [13, 148, 136]; // #0D9488 (A nice professional teal/green)
    const lightTeal = [240, 253, 250]; 
    const darkGrey = [55, 65, 81];

    // --- Header ---
    doc.setFillColor(0, 0, 0);
    doc.triangle(20, 20, 30, 20, 25, 12, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("VERCEL", 35, 18);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL RECEIPT", 35, 22);

    doc.setFontSize(32);
    doc.setTextColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("RECEIPT", 140, 22);

    doc.setDrawColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
    
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("VERCEL.COM / BILLING", 190, 35, { align: "right" });

    // --- PAID Stamp ---
    doc.setDrawColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.setLineWidth(1);
    doc.setTextColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    doc.saveGraphicsState();
    doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
    doc.text("PAID", 100, 150, { align: "center", angle: 30 });
    doc.restoreGraphicsState();

    // --- Info ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Customer :", 20, 50);
    doc.setFontSize(14);
    doc.text(customerName, 20, 58);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Kampala, Uganda", 20, 63);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`Receipt no : ${receiptNo}`, 190, 50, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Date : ${date}`, 190, 58, { align: "right" });
    doc.text(`Ref : ${transactionId}`, 190, 64, { align: "right" });

    // --- Table ---
    const startY = 80;
    const colWidths = [15, 100, 30, 25]; 
    const colNames = ["NO", "DESCRIPTION", "METHOD", "AMOUNT"];
    const tableX = 20;

    doc.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.rect(tableX, startY, 170, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    
    let currentX = tableX;
    colNames.forEach((name, i) => {
      doc.text(name, currentX + (i === 1 ? 5 : colWidths[i] / 2), startY + 5.5, { align: i === 1 ? "left" : "center" });
      currentX += colWidths[i];
    });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    let currentY = startY + 8;

    let totalPaid = 0;
    items.forEach((item, index) => {
      if (index % 2 === 0) doc.setFillColor(lightTeal[0], lightTeal[1], lightTeal[2]);
      else doc.setFillColor(255, 255, 255);
      doc.rect(tableX, currentY, 170, 8, "F");

      let rowX = tableX;
      totalPaid += item.price;
      
      doc.text((index + 1).toString(), rowX + colWidths[0] / 2, currentY + 5.5, { align: "center" });
      rowX += colWidths[0];
      doc.text(item.description, rowX + 5, currentY + 5.5);
      rowX += colWidths[1];
      doc.text(paymentMethod.split(' ')[0], rowX + colWidths[2] / 2, currentY + 5.5, { align: "center" });
      rowX += colWidths[2];
      doc.text(`$${item.price.toFixed(2)}`, rowX + colWidths[3] / 2, currentY + 5.5, { align: "center" });
      
      currentY += 8;
    });

    currentY += 10;
    doc.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.rect(120, currentY - 5, 70, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL PAID :", 155, currentY + 1.5, { align: "right" });
    doc.text(`$${totalPaid.toFixed(2)}`, 185, currentY + 1.5, { align: "right" });

    // Status Badge
    currentY += 15;
    doc.setFillColor(lightTeal[0], lightTeal[1], lightTeal[2]);
    doc.roundedRect(20, currentY, 50, 12, 2, 2, "F");
    doc.setTextColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.setFontSize(9);
    doc.text("PAYMENT STATUS:", 25, currentY + 5);
    doc.setFontSize(11);
    doc.text("SUCCESSFUL", 25, currentY + 9.5);

    // --- Footer ---
    currentY = 230;
    doc.setDrawColor(200);
    doc.line(20, currentY, 80, currentY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0,0,0);
    doc.text("Thank you for your payment!", 20, currentY + 8);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("This is a computer-generated receipt and requires no signature.", 20, currentY + 14);

    // Footer bar
    doc.setDrawColor(tealColor[0], tealColor[1], tealColor[2]);
    doc.line(20, 280, 190, 280);
    doc.setFontSize(7);
    doc.setTextColor(100);
    doc.text("340 S Lemon Ave #4133, Walnut, CA 91789", 20, 285);
    doc.text("verified-payment@vercel.com", 105, 285, { align: "center" });
    doc.text("+1 (800) VERCEL-1", 190, 285, { align: "right" });

    doc.save(`Receipt_${receiptNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-teal-50/30 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-teal-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-teal-900">Receipt Generator</h1>
              <p className="text-teal-600/60 text-sm font-medium">Issue Official Payment Confirmations</p>
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
          >
            <Download className="w-5 h-5" />
            Generate Receipt
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Items Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2 text-teal-900">
                  <CreditCard className="w-5 h-5 text-teal-600" />
                  Payment Items
                </h3>
                <button
                  onClick={addItem}
                  className="text-xs font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-start bg-teal-50/50 p-4 rounded-2xl border border-teal-100 group">
                    <div className="flex-grow space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Item Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          className="w-full bg-white border border-teal-100 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-teal-500/20 outline-none transition-all"
                        />
                      </div>
                      <div className="w-32">
                        <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Amount ($)</label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                          className="w-full bg-white border border-teal-100 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-teal-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-6 p-2 text-teal-200 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Card */}
            <div className="bg-teal-600 p-8 rounded-3xl text-white shadow-xl shadow-teal-600/20 flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <FileCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Official Confirmation</h4>
                <p className="text-teal-50 text-sm leading-relaxed">
                  Generating a receipt confirms that funds have been successfully settled. This document serves as a legal proof of transaction for your clients.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Config */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-teal-50">
              <h3 className="font-bold text-lg mb-6 text-teal-900">Receipt Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Receipt Number</label>
                  <input
                    type="text"
                    value={receiptNo}
                    onChange={(e) => setReceiptNo(e.target.value)}
                    className="w-full bg-teal-50/50 border border-teal-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Payment Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-teal-50/50 border border-teal-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-teal-50/50 border border-teal-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-teal-50/50 border border-teal-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 transition-all"
                  >
                    <option>Mobile Money (MTN)</option>
                    <option>Mobile Money (Airtel)</option>
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>Cash</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-teal-900/40 tracking-wider mb-1 block">Transaction Ref</label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full bg-teal-50/50 border border-teal-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 transition-all uppercase"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-900/20">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-400" />
                Receipt Policy
              </h4>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Receipts are generated with a "PAID" watermark and a success badge. This distinguishes them from invoices and prevents double-billing confusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
