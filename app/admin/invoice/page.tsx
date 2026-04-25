"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Plus, Trash2, FileText, Download, Settings, Info } from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  price: number;
}

export default function InvoiceGenerator() {
  const [invoiceNo, setInvoiceNo] = useState("VERC-" + Math.floor(10000 + Math.random() * 90000));
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [clientName, setClientName] = useState("Loko Harvest Limited");
  const [clientAddress, setClientAddress] = useState("Kampala, Uganda");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Vercel Pro Plan - Hosting Setup Fee", price: 30.00 },
    { id: "2", description: "Cloud Storage Booking - Asset Management", price: 11.00 },
  ]);
  const [renewalNote, setRenewalNote] = useState("Hosting will renew at $27.00 per month.");
  const [taxAmount, setTaxAmount] = useState(2.00);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "New Item", price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const blueColor = [29, 78, 216]; // #1D4EDE
    const lightBlue = [239, 246, 255];
    const lightGrey = [209, 213, 219];

    // --- Header ---
    doc.setFillColor(0, 0, 0);
    doc.triangle(20, 20, 30, 20, 25, 12, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("VERCEL", 35, 18);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("DEVELOP. PREVIEW. SHIP.", 35, 22);

    doc.setFontSize(32);
    doc.setTextColor(blueColor[0], blueColor[1], blueColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 140, 22);

    doc.setDrawColor(blueColor[0], blueColor[1], blueColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
    
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("VERCEL.COM", 190, 35, { align: "right" });

    // --- Info ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice to :", 20, 50);
    doc.setFontSize(14);
    doc.text(clientName, 20, 58);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(clientAddress, 20, 63);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice no : ${invoiceNo}`, 190, 50, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(date, 190, 58, { align: "right" });

    // --- Table ---
    const startY = 80;
    const colWidths = [15, 80, 25, 25, 25]; 
    const colNames = ["NO", "DESCRIPTION", "QTY", "PRICE", "TOTAL"];
    const tableX = 20;

    doc.setFillColor(blueColor[0], blueColor[1], blueColor[2]);
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

    let subtotal = 0;
    items.forEach((item, index) => {
      if (index % 2 === 0) doc.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
      else doc.setFillColor(255, 255, 255);
      doc.rect(tableX, currentY, 170, 8, "F");

      let rowX = tableX;
      const total = item.price; // Qty is assumed 1 for simplicity in this professional look
      subtotal += total;
      
      doc.text((index + 1).toString(), rowX + colWidths[0] / 2, currentY + 5.5, { align: "center" });
      rowX += colWidths[0];
      doc.text(item.description, rowX + 5, currentY + 5.5);
      rowX += colWidths[1];
      doc.text("1", rowX + colWidths[2] / 2, currentY + 5.5, { align: "center" });
      rowX += colWidths[2];
      doc.text(`$${item.price.toFixed(2)}`, rowX + colWidths[3] / 2, currentY + 5.5, { align: "center" });
      rowX += colWidths[3];
      doc.text(`$${total.toFixed(2)}`, rowX + colWidths[4] / 2, currentY + 5.5, { align: "center" });
      
      currentY += 8;
    });

    const tax = taxAmount;
    const grandTotal = subtotal + tax;

    currentY += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Sub Total :", 150, currentY, { align: "right" });
    doc.text(`$${subtotal.toFixed(2)}`, 190, currentY, { align: "right" });
    
    currentY += 6;
    doc.text("Tax :", 150, currentY, { align: "right" });
    doc.text(`$${tax.toFixed(2)}`, 190, currentY, { align: "right" });

    currentY += 8;
    doc.setFillColor(blueColor[0], blueColor[1], blueColor[2]);
    doc.rect(130, currentY - 5, 60, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("GRAND TOTAL :", 160, currentY, { align: "right" });
    doc.text(`$${grandTotal.toFixed(2)}`, 190, currentY, { align: "right" });

    // --- Note Section ---
    if (renewalNote) {
      currentY += 15;
      doc.setFillColor(249, 250, 251); // Light grey bg
      doc.rect(20, currentY, 170, 10, "F");
      doc.setTextColor(blueColor[0], blueColor[1], blueColor[2]);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("RENEWAL NOTE:", 25, currentY + 6.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50);
      doc.text(renewalNote, 55, currentY + 6.5);
    }

    // --- Payment Method ---
    if (showPaymentMethod) {
      currentY += 20;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT METHOD :", 20, currentY);
      doc.rect(20, currentY + 2, 45, 0.5, "F");
      
      currentY += 10;
      doc.setFont("helvetica", "normal");
      doc.text("Bank Name : Vercel Global Operations", 20, currentY);
      currentY += 5;
      doc.text("Account Number : 992-1102-883", 20, currentY);
    }

    currentY = Math.max(currentY + 20, 230);
    doc.setDrawColor(lightGrey[0], lightGrey[1], lightGrey[2]);
    doc.line(20, currentY, 80, currentY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0,0,0);
    doc.text("Thank you for business with us!", 20, currentY + 8);

    // Signature
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.text("Guillermo Rauch", 160, currentY + 15, { align: "center" });
    doc.line(140, currentY + 17, 180, currentY + 17);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Guillermo Rauch", 160, currentY + 22, { align: "center" });

    // Footer bar
    doc.setDrawColor(blueColor[0], blueColor[1], blueColor[2]);
    doc.line(20, 280, 190, 280);
    doc.setFontSize(7);
    doc.setTextColor(100);
    doc.text("340 S Lemon Ave #4133, Walnut, CA 91789", 20, 285);
    doc.text("support@vercel.com", 105, 285, { align: "center" });
    doc.text("+1 (800) VERCEL-1", 190, 285, { align: "right" });

    doc.save(`Invoice_${invoiceNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">Invoice Generator</h1>
              <p className="text-slate-500 text-sm">Professional Vercel Billing System</p>
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Download className="w-5 h-5" />
            Generate PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Items Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Invoice Items
                </h3>
                <button
                  onClick={addItem}
                  className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                    <div className="flex-grow space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                      <div className="w-32">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Price ($)</label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-6 p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-blue-600" />
                Renewal Note
              </h3>
              <textarea
                value={renewalNote}
                onChange={(e) => setRenewalNote(e.target.value)}
                placeholder="e.g. Hosting will renew at $27.00 per month."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all min-h-[100px]"
              />
              <p className="mt-2 text-[10px] text-slate-400">This note appears below the grand total.</p>
            </div>
          </div>

          {/* Sidebar Config */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-6">Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Tax Amount ($)</label>
                  <input
                    type="number"
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showPaymentMethod}
                      onChange={(e) => setShowPaymentMethod(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors ${showPaymentMethod ? 'bg-blue-600' : 'bg-slate-200'}`} />
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showPaymentMethod ? 'translate-x-4' : ''}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Show Payment Method</span>
                </label>
              </div>
            </div>
            
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-600/20">
              <h4 className="font-bold mb-2">Pro Tip</h4>
              <p className="text-blue-100 text-xs leading-relaxed">
                Use the **Renewal Note** to specify future costs without affecting the current Total Due. This keeps the invoice clean and focused on what needs to be paid now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
