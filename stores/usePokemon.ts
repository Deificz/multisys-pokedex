import { PokemonDetails } from "@/types/pokemonTypes";
import { create } from "zustand";

type PokemonStore = {
  selectedPokemon: PokemonDetails | null;
  setSelectedPokemon: (
    pokemon: PokemonDetails | null,
  ) => void;
};

export const usePokemonStore =
  create<PokemonStore>((set) => ({
    selectedPokemon: null,

    setSelectedPokemon: (pokemon) =>
      set({
        selectedPokemon: pokemon,
      }),
  }));
