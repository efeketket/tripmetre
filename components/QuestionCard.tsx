"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/context/ScoreContext";
import { BOOLEAN_SCORE } from "@/context/ScoreContext";
import { ScoreSlider } from "./ScoreSlider";

interface QuestionCardProps {
  question: Question;
  value: number | null;
  onSelect: (value: number) => void;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function QuestionCard({
  question,
  value,
  onSelect,
  index,
  total,
  onNext,
  onPrev,
  canGoPrev,
}: QuestionCardProps) {
  const isBoolean = question.type === "boolean";
  const numericDefault = 5;
  const score = value ?? numericDefault;
  const selectedYes = value === BOOLEAN_SCORE.yes;
  const selectedNo = value === BOOLEAN_SCORE.no;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-neutral-800 bg-card p-6 sm:p-8 shadow-xl"
      >
        <header className="mb-6">
          <p className="font-mono text-xs text-neutral-500 tracking-wider mb-2">
            SORU {index + 1} / {total}
          </p>
          <h2 className="text-lg sm:text-xl font-semibold text-white leading-tight">
            {question.text}
          </h2>
        </header>

        {isBoolean ? (
          <div
            className="flex gap-4 sm:gap-6 pt-2 pb-4"
            role="group"
            aria-label={`${question.text}, Evet veya Hayır seçin`}
          >
            <motion.button
              type="button"
              onClick={() => onSelect(BOOLEAN_SCORE.yes)}
              aria-pressed={selectedYes}
              aria-label="Evet"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-5 sm:py-6 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                selectedYes
                  ? "bg-danger text-white border-2 border-danger"
                  : "bg-black border-2 border-neutral-700 text-neutral-300 hover:border-neutral-500"
              }`}
            >
              Evet
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onSelect(BOOLEAN_SCORE.no)}
              aria-pressed={selectedNo}
              aria-label="Hayır"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-5 sm:py-6 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                selectedNo
                  ? "bg-danger text-white border-2 border-danger"
                  : "bg-black border-2 border-neutral-700 text-neutral-300 hover:border-neutral-500"
              }`}
            >
              Hayır
            </motion.button>
          </div>
        ) : (
          <div className="relative pt-2 pb-4">
            <ScoreSlider
              value={score}
              onChange={onSelect}
              label="1 — 10"
              aria-label={`${question.text}, 1 ile 10 arası puan`}
            />
          </div>
        )}

        <nav
          className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800"
          aria-label="Sorular arası gezinme"
        >
          <button
            type="button"
            onClick={onPrev}
            disabled={!canGoPrev}
            className="font-mono text-sm text-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-3 py-2 transition-colors"
            aria-label="Önceki soru"
          >
            ← Önceki
          </button>
          <button
            type="button"
            onClick={onNext}
            className="font-mono text-sm bg-danger text-white hover:bg-danger/90 px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50"
            aria-label={index < total - 1 ? "Sonraki soru" : "Sonuçları gör"}
          >
            {index < total - 1 ? "Sonraki →" : "Bitir"}
          </button>
        </nav>
      </motion.article>
    </AnimatePresence>
  );
}
