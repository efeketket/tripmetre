"use client";

import { motion } from "framer-motion";
import { useScore } from "@/context/ScoreContext";

export function ResultScreen() {
  const { tripScore, reset, answers } = useScore();
  const score = tripScore ?? 0;
  const level =
    score <= 3 ? "low" : score <= 7 ? "mid" : score <= 9 ? "high" : "extreme";

  const labels = {
    low: { title: "Dümenden Trip", desc: "Hak ettiysen eyvallah." },
    mid: { title: "Trip Pıtırcığı", desc: "Çabalamayı bırakma ikna olacak." },
    high: { title: "Triptkolik", desc: "Çok elleşme kendi haline bırak." },
    extreme: { title: "Triptraliçe", desc: "Seni biz bile kurtaramayız." },
  };

  const { title, desc } = labels[level];

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-neutral-800 bg-card p-8 sm:p-10 shadow-xl text-center"
      aria-live="polite"
      aria-label="Trip skoru sonucu"
    >
      <p className="font-mono text-xs text-neutral-500 tracking-wider mb-4">
        TRIP SKORU
      </p>
      <motion.p
        className="text-5xl sm:text-6xl font-bold text-danger font-mono tabular-nums mb-2"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {score.toFixed(1)}
      </motion.p>
      <p className="text-2xl font-semibold text-white mb-2">{title}</p>
      <p className="text-neutral-400 max-w-sm mx-auto mb-8">{desc}</p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.entries(answers).map(([id, val]) =>
          val != null ? (
            <span
              key={id}
              className="font-mono text-xs px-2 py-1 rounded bg-black border border-neutral-800 text-neutral-400"
            >
              {val}
            </span>
          ) : null
        )}
      </div>

      <button
        type="button"
        onClick={reset}
        className="font-mono text-sm border border-neutral-600 text-neutral-300 hover:border-danger hover:text-danger px-5 py-2.5 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Tekrar başla"
      >
        Tekrar ölç
      </button>
    </motion.section>
  );
}
