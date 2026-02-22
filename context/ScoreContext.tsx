"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type QuestionId = string;

export type QuestionType = "numeric" | "boolean";

export interface Question {
  id: QuestionId;
  text: string;
  weight: number; // 0–1 arası, toplam 1 olacak şekilde normalize edilebilir
  type: QuestionType; // numeric: 1-10, boolean: Evet=10, Hayır=1 (normal); reverse'te hesaplamada tersi
  /** true: puan artınca trip azalır (örn. "Beni ne kadar seviyorsun?"); false: puan artınca trip artar. */
  isReverse?: boolean; // varsayılan false
}

export const BOOLEAN_SCORE = { yes: 10, no: 1 } as const;
//10 trip fazla oluyor
export const QUESTIONS: Question[] = [
  { id: "q1", text: "Beni şu an kaç seviyorsun?", weight: 0.12, type: "numeric", isReverse: true },
  { id: "q2", text: "Özür dilesem beni affeder misin?", weight: 0.14, type: "boolean", isReverse: true },
  { id: "q3", text: "Sarılmak isteseydim beni kaç gücünde iterdin?", weight: 0.18, type: "numeric" },
  { id: "q4", text: "Şu an yemek yapıyor olsaydın beni zehirleme ihtimalin ne kadar?", weight: 0.12, type: "numeric" },
  { id: "q5", text: "Uçurumun kenarında olsam beni aşağıya iter miydin?", weight: 0.1, type: "boolean"},
];

export interface ScoreState {
  answers: Record<QuestionId, number | null>;
  currentIndex: number;
  isComplete: boolean;
}

export type AnswerValue = number | boolean;

interface ScoreContextValue extends ScoreState {
  setAnswer: (questionId: QuestionId, value: AnswerValue) => void;
  goNext: () => void;
  goPrev: () => void;
  reset: () => void;
  tripScore: number | null;
  answeredCount: number;
}

const initialState: ScoreState = {
  answers: QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: null }), {} as Record<QuestionId, number | null>),
  currentIndex: 0,
  isComplete: false,
};

const ScoreContext = createContext<ScoreContextValue | null>(null);

/** Ağırlıklı ortalama. Eğer cevap seçilmemişse varsayılan puan kullanılır (DEFAULT_SCORE). 
   isReverse sorularda (11 - puan) ile trip yönünde normalize edilir; answers değişmez. */
function weightedTripScore(answers: Record<QuestionId, number | null>): number | null {
  const DEFAULT_SCORE = 5;
  let weightedSum = 0;
  let totalWeight = 0;
  for (const q of QUESTIONS) {
    const raw = answers[q.id] ?? DEFAULT_SCORE;
    const normalized = q.isReverse ? 11 - raw : raw; // 1–10 skalasında ters çevirme
    weightedSum += normalized * q.weight;
    totalWeight += q.weight;
  }
  if (totalWeight === 0) return null;
  const raw = weightedSum / totalWeight;
  return Math.round(raw * 10) / 10; // 1 ondalık
}

function toStoredScore(value: AnswerValue): number {
  if (typeof value === "boolean") return value ? BOOLEAN_SCORE.yes : BOOLEAN_SCORE.no;
  return value;
}

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScoreState>(initialState);

  const setAnswer = useCallback((questionId: QuestionId, value: AnswerValue) => {
    const stored = toStoredScore(value);
    setState((prev) => {
      const next = { ...prev, answers: { ...prev.answers, [questionId]: stored } };
      const answered = QUESTIONS.filter((q) => next.answers[q.id] != null).length;
      next.isComplete = answered === QUESTIONS.length;
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, QUESTIONS.length),
    }));
  }, []);

  const goPrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const tripScore = useMemo(
    () => weightedTripScore(state.answers),
    [state.answers]
  );
  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => state.answers[q.id] != null).length,
    [state.answers]
  );

  const value: ScoreContextValue = useMemo(
    () => ({
      ...state,
      setAnswer,
      goNext,
      goPrev,
      reset,
      tripScore,
      answeredCount,
    }),
    [state, setAnswer, goNext, goPrev, reset, tripScore, answeredCount]
  );

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export function useScore(): ScoreContextValue {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error("useScore must be used within ScoreProvider");
  return ctx;
}
