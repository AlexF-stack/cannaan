"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const numbers = [
    { label: "Secrétariat 1", phone: "2290166734734" },
    { label: "Secrétariat 2", phone: "2290167522228" },
  ];

  const defaultMessage = encodeURIComponent("Bonjour Centre Canaan, je souhaite avoir plus d'informations.");

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 w-72"
          >
            <div className="bg-[#25D366] p-4 text-white">
              <h3 className="font-bold">Discuter avec nous</h3>
              <p className="text-xs text-white/80 mt-1">Nous répondons généralement en quelques minutes.</p>
            </div>
            <div className="p-2 bg-slate-50">
              {numbers.map((num) => (
                <a
                  key={num.phone}
                  href={`https://wa.me/${num.phone}?text=${defaultMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{num.label}</div>
                    <div className="text-xs text-slate-500">+{num.phone}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50"
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
        ) : (
          <MessageCircle className="h-7 w-7 transition-transform group-hover:-translate-y-1" />
        )}
      </button>
    </div>
  );
}
