"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export interface DashboardCard {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultCards: DashboardCard[] = [
  {
    href: "/test",
    title: "Tripmetre",
    description: "Partnerinin trip seviyesini öğren.",
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    href: "/sevgimetre",
    title: "Sevgimetre",
    description: "Bugün kimin daha çok sevdiğini öğren.",
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-danger" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12.001 20.2s-7.5-4.746-9.2-7.02C1.1 10.8 3.1 6.9 6.6 6.9c1.8 0 3.1.9 4.4 2.1 1.3-1.2 2.6-2.1 4.4-2.1 3.5 0 5.5 3.9 3.8 6.28-1.7 2.275-9.2 7.02-9.2 7.02z" />
      </svg>
    ),
  },
];

interface DashboardProps {
  cards?: DashboardCard[];
}

export function Dashboard({ cards = defaultCards }: DashboardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Tripmetre
        </h1>
        <p className="font-mono text-xs text-neutral-500 mt-1">
          Ana menü · Kübra ❤︎ Efe
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.href + index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
          >
            <Link href={card.href} className="block h-full group">
              <motion.article
                whileHover={{ y: -5 }}
                className="h-full rounded-xl border border-white/10 bg-[#1a1a1a] p-6 sm:p-7 transition-[box-shadow] duration-300 group-hover:shadow-[0_0_28px_rgba(255,0,60,0.35)]"
              >
                <div className="mb-4 flex justify-center sm:justify-start">
                  {card.icon}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {card.title}
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
