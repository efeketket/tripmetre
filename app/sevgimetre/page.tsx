"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SevgimetrePage() {
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    setDay(new Date().getDate());
  }, []);

  const name = day === null ? "..." : day % 2 === 1 ? "EFE" : "KÜBRA";

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 hover:text-danger transition-colors mb-6"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri Dön
        </Link>

        <section className="rounded-xl border border-white/10 bg-[#1a1a1a] p-10 text-center">
          <p className="font-mono text-sm text-neutral-400 mb-6">Bugün en çok O seviyor.</p>

          <motion.h1
            initial={{ scale: 0.6, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="text-6xl sm:text-8xl font-extrabold text-white tracking-tight select-none"
            style={{
              textShadow:
                "0 0 20px rgba(255,0,60,0.9), 0 0 60px rgba(255,0,60,0.6), 0 0 120px rgba(255,0,60,0.35)",
            }}
          >
            {name}
          </motion.h1>

          <div
            aria-hidden
            className="mt-10 h-1 w-full rounded bg-gradient-to-r from-transparent via-[rgba(255,0,60,0.45)] to-transparent"
          />
        </section>
      </div>
    </main>
  );
}

