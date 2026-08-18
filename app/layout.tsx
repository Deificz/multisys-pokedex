import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { assetPath } from "@/lib/utils";
const pokeFont = Press_Start_2P({
  variable: "--font-pokemon",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Multisys Pokedex",
  description: "Pokedex",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pokeFont.variable} font-pokemon h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen"
        style={{
          background: `var(--background) url("${assetPath(
            "/images/background.jpg",
          )}") center / cover no-repeat fixed`,
        }}
      >
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 scale-105 bg-cover bg-center blur-sm" />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
