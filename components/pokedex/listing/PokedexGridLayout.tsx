"use client";

import React, {
  RefObject,
} from "react";
import {
  PokemonDetails,
  PokemonList,
} from "@/types/pokemonTypes";
import { InfiniteData } from "@tanstack/react-query";
import PokedexSkeletonCard from "../cards/PokedexSkeletonCard";
import PokedexCard from "../cards/PokedexCard";
import { usePokemonStore } from "@/stores/usePokemon";
import { useCapturedFilterStore } from "@/stores/useListLayout";

type Props = {
  data?: InfiniteData<
    PokemonList,
    number
  >;
  loadMoreRef: RefObject<HTMLDivElement | null>;
};
export default function PokedexGridLayout({
  data,
  loadMoreRef,
}: Props) {
  const setSelectedPokemon =
    usePokemonStore(
      (state) =>
        state.setSelectedPokemon,
    );
  const captured =
    useCapturedFilterStore(
      (state) => state.captured,
    );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data?.pages?.map((page) =>
        page.results.map((pokemon) => (
          <PokedexCard
            layout="grid"
            key={pokemon.name}
            details={pokemon}
            onClick={() =>
              setSelectedPokemon(
                pokemon,
              )
            }
          />
        )),
      )}
      {!captured && Array.from({ length: 5 }).map(
        (_, index) => (
          <PokedexSkeletonCard
            layout="grid"
            key={`skeleton-${index}`}
          />
        ),
      )}
      <div
        ref={loadMoreRef}
        className="h-10"
      />
    </div>
  );
}
