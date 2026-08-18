"use client";

import {
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } =
    useTheme();

  return (
    <Button
    className={"w-10 h-10"}
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark",
        )
      }
    >
      {theme === "dark" ? (
        <Sun />
      ) : (
        <Moon />
      )}

      <span className="sr-only">
        Toggle theme
      </span>
    </Button>
  );
}
