import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
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
      <body className="min-h-screen">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center blur-sm"
            style={{
              backgroundImage:
                "url('/images/background.jpg')",
            }}
          />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
