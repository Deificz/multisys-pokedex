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
  layout: string;
};
export default function PokedexLayout({
  data,
  loadMoreRef,
  layout,
}: Props) {
  const gridClassname =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
  const listClassname = "flex flex-col";

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
    <div
      className={`${layout === "grid" ? gridClassname : listClassname}`}
    >
      {data?.pages?.map((page) =>
        page.results.map((pokemon) => (
          <PokedexCard
            layout={layout}
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
      {!captured &&
        Array.from({
          length:
            layout == "grid" ? 5 : 1,
        }).map((_, index) => (
          <PokedexSkeletonCard
            layout={layout}
            key={`skeleton-${index}`}
          />
        ))}
      <div
        ref={loadMoreRef}
        className="h-10"
      />
    </div>
  );
}
