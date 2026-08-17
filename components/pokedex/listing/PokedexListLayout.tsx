"use client";
import {
  PokemonDetails,
  PokemonList,
} from "@/types/pokemonTypes";
import React, {
  RefObject,
} from "react";
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

export default function ({
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
    <div>
      <div className="flex flex-col">
        {data?.pages?.map((page) =>
          page.results.map(
            (pokemon) => (
              <PokedexCard
                onClick={() =>
                  setSelectedPokemon(
                    pokemon,
                  )
                }
                layout="list"
                key={pokemon.name}
                details={pokemon}
              />
            ),
          ),
        )}
        {!captured && (
          <PokedexSkeletonCard
            layout="list"
            key={`skeleton-list`}
          />
        )}
      </div>
      <div
        ref={loadMoreRef}
        className="h-10"
      />
    </div>
  );
}
