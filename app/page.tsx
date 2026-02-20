"use client";

import { motion } from "framer-motion";
import { useScore } from "@/context/ScoreContext";
import { QUESTIONS } from "@/context/ScoreContext";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultScreen } from "@/components/ResultScreen";

export default function Home() {
  const {
    answers,
    currentIndex,
    setAnswer,
    goNext,
    goPrev,
    isComplete,
    answeredCount,
  } = useScore();

  const question = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;
  const showResult = isComplete || currentIndex >= total;

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Tripmetre
          </h1>
          <p className="font-mono text-xs text-neutral-500 mt-1">
            Trip seviyesini ölç · {answeredCount}/{total} yanıt
          </p>
        </motion.header>

        {showResult ? (
          <ResultScreen />
        ) : question ? (
          <QuestionCard
            question={question}
            value={answers[question.id]}
            onSelect={(v) => setAnswer(question.id, v)}
            index={currentIndex}
            total={total}
            onNext={goNext}
            onPrev={goPrev}
            canGoNext={true}
            canGoPrev={currentIndex > 0}
          />
        ) : null}
      </div>

      <footer className="mt-12 text-center">
        <p className="font-mono text-xs text-neutral-600">
          1–10 arası puan · Ağırlıklı ortalama
        </p>
      </footer>
    </main>
  );
}
