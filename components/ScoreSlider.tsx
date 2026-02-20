"use client";

import { motion } from "framer-motion";

const MIN = 1;
const MAX = 10;
const STEP = 1;

interface ScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  "aria-label": string;
}

export function ScoreSlider({
  value,
  onChange,
  label,
  "aria-label": ariaLabel,
}: ScoreSliderProps) {
  const pct = ((value - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm text-neutral-400 font-mono">{label}</span>
        <span
          className="font-mono text-danger tabular-nums min-w-[2ch]"
          aria-live="polite"
        >
          {value}
        </span>
      </div>
      <div className="relative h-3 rounded-full overflow-visible">
        <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 bg-card rounded-full" />
        <motion.div
          className="absolute inset-y-0 left-0 h-2 top-1/2 -translate-y-1/2 bg-danger rounded-full max-w-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={ariaLabel}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={value}
          aria-valuetext={`${value} puan`}
          className="absolute inset-0 w-full h-6 -top-1 cursor-pointer opacity-0 accent-danger"
        />
      </div>
    </div>
  );
}
