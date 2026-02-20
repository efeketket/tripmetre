import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScoreProvider } from "@/context/ScoreContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tripmetre — Trip seviyeni ölç",
  description: "Partnerinin trip seviyesini 1–10 arası puanla. Eğlenceli kriz yönetimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans antialiased bg-black text-neutral-200">
        <ScoreProvider>{children}</ScoreProvider>
      </body>
    </html>
  );
}
