"use client";

import React, {
  RefObject,
  useMemo,
  useState,
} from "react";
import {
  PokemonDetails,
  PokemonList,
} from "@/types/pokemonTypes";
import { InfiniteData } from "@tanstack/react-query";
import PokedexSkeletonCard from "../cards/PokedexSkeletonCard";
import PokedexCard from "../cards/PokedexCard";
import { usePokemonStore } from "@/stores/usePokemon";
import {
  useCapturedFilterStore,
  useSearchFilterStore,
} from "@/stores/useListLayout";

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

  const search = useSearchFilterStore(
    (state) => state.search,
  );

  const pokemons = useMemo(() => {
    return (
      data?.pages.flatMap(
        (page) => page.results,
      ) ?? []
    );
  }, [data]);

  const filteredPokemons =
    useMemo(() => {
      return pokemons?.filter(
        (pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ),
      );
    }, [pokemons, search]);

  const captured =
    useCapturedFilterStore(
      (state) => state.captured,
    );

  const setSelectedPokemon =
    usePokemonStore(
      (state) =>
        state.setSelectedPokemon,
    );

  return (
    <div
      className={`${layout === "grid" ? gridClassname : listClassname}`}
    >
      {filteredPokemons.map(
        (pokemon) => (
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
        ),
      )}
      {!captured &&
        !search &&
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
