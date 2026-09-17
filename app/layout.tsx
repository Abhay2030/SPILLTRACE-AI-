import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import CommandPalette from "@/components/navigation/CommandPalette";
import SceneCanvas from "@/components/3d/SceneCanvas";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpillTrace AI — From Space to Candidate",
  description: "Advanced maritime intelligence and spill investigation platform for Smart India Hackathon 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-surface text-ink-primary font-body antialiased">
        <SceneCanvas />
        <Navbar />
        <CommandPalette />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
