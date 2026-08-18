import { PokemonClassType } from "@/types/pokemonTypes";

export const POKEMON_LIST_LIMIT = 150;

export const POKEMON_TYPE_COLORS: Record<
  PokemonClassType,
  {
    bg: string;
    shadow: string;
  }
> = {
  normal: {
    bg: "bg-gray-400",
    shadow: "shadow-gray-400",
  },
  fire: {
    bg: "bg-orange-500",
    shadow: "shadow-orange-500",
  },
  water: {
    bg: "bg-blue-500",
    shadow: "shadow-blue-500",
  },
  electric: {
    bg: "bg-yellow-400",
    shadow: "shadow-yellow-400",
  },
  grass: {
    bg: "bg-green-500",
    shadow: "shadow-green-500",
  },
  ice: {
    bg: "bg-cyan-300",
    shadow: "shadow-cyan-300",
  },
  fighting: {
    bg: "bg-red-700",
    shadow: "shadow-red-700",
  },
  poison: {
    bg: "bg-purple-500",
    shadow: "shadow-purple-500",
  },
  ground: {
    bg: "bg-amber-600",
    shadow: "shadow-amber-600",
  },
  flying: {
    bg: "bg-indigo-400",
    shadow: "shadow-indigo-400",
  },
  psychic: {
    bg: "bg-pink-500",
    shadow: "shadow-pink-500",
  },
  bug: {
    bg: "bg-lime-500",
    shadow: "shadow-lime-500",
  },
  rock: {
    bg: "bg-stone-500",
    shadow: "shadow-stone-500",
  },
  ghost: {
    bg: "bg-indigo-700",
    shadow: "shadow-indigo-700",
  },
  dragon: {
    bg: "bg-violet-700",
    shadow: "shadow-violet-700",
  },
  dark: {
    bg: "bg-gray-800",
    shadow: "shadow-gray-800",
  },
  steel: {
    bg: "bg-slate-500",
    shadow: "shadow-slate-500",
  },
  fairy: {
    bg: "bg-pink-300",
    shadow: "shadow-pink-300",
  },
};