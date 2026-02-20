"use client";

import { motion } from "framer-motion";

const MIN = 1;
const MAX = 10;
const STEP = 1;

const TRACK_HEIGHT = 4;
const HIT_HEIGHT = 44;
const THUMB_VISUAL_SIZE = 20;

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

      {/* Kapsayıcı: min 44px yükseklik, dokunma/sürükleme bu alanda; sayfa kaymasıyla çakışmasın */}
      <div
        className="relative w-full flex items-center select-none"
        style={{ minHeight: HIT_HEIGHT, touchAction: "none" }}
      >
        {/* Görsel katman: ince çubuk (4px) + dolgu + thumb */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
          style={{ height: HIT_HEIGHT }}
        >
          {/* Track — 4px, tech görünüm, dikey ortada */}
          <div
            className="absolute w-full top-1/2 -translate-y-1/2 rounded-full bg-card"
            style={{ height: TRACK_HEIGHT }}
          />
          {/* Dolgu — danger red, neon parıltı */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full max-w-full flex items-center"
            style={{ height: TRACK_HEIGHT }}
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="w-full rounded-full min-w-0"
              style={{
                height: TRACK_HEIGHT,
                backgroundColor: "#FF003C",
                boxShadow: "0 0 12px rgba(255, 0, 60, 0.5)",
              }}
            />
          </motion.div>
          {/* Thumb — görsel boyut sabit, Framer ile smooth hareket; tap/sürükle bitince buraya zıplar */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-danger flex items-center justify-center"
            style={{
              width: THUMB_VISUAL_SIZE,
              height: THUMB_VISUAL_SIZE,
              left: `calc(${pct}% - ${THUMB_VISUAL_SIZE / 2}px)`,
              boxShadow: "0 0 14px rgba(255, 0, 60, 0.7)",
            }}
            initial={false}
            animate={{ left: `calc(${pct}% - ${THUMB_VISUAL_SIZE / 2}px)` }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          />
        </div>

        {/* Dokunmayı algılayan input: şeffaf, tam alan — native davranış (tıkla/sürükle) korunur */}
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
          className="absolute inset-0 w-full h-full min-h-[44px] cursor-pointer opacity-0 disabled:pointer-events-none z-10"
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}
