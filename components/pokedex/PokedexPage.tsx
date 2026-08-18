"use client";

import PokedexFilterBar from "./PokedexFilterBar";
import {
  useCapturedFilterStore,
  useListLayoutStore,
} from "@/stores/useListLayout";
import PokedexLayout from "./listing/PokedexLayout";
import { usePokedexList } from "@/hooks/usePokedex";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog } from "../ui/dialog";
import PokemonProfileDialog from "../pokemon-profile/PokemonProfileDialog";
import { restructurePokemonData } from "@/lib/utils";
import { InfiniteData } from "@tanstack/react-query";
import { PokemonList } from "@/types/pokemonTypes";

type Props = {};

export default function PokedexPage({}: Props) {
  //Layout Store
  const selectedLayout =
    useListLayoutStore(
      (state) => state.selectedLayout,
    );
  const filterCaptured =
    useCapturedFilterStore(
      (state) => state.captured,
    );

  //Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = usePokedexList();

  const [
    capturedData,
    setCapturedData,
  ] =
    useState<
      InfiniteData<PokemonList, number>
    >();
  const loadMoreRef =
    useRef<HTMLDivElement>(null);

  //Observer for users when they reach at the bottom to trigger API Fetch
  const observerFunction = () => {
    if (filterCaptured) return;
    let timeout: ReturnType<
      typeof setTimeout
    > | null = null;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            //I Added a timeout for API Loading simulation
            timeout = setTimeout(() => {
              fetchNextPage();
            }, 1000);
          } else {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
          }
        },
        {
          threshold: 1,
        },
      );

    const element = loadMoreRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  };

  const rehydrateCapturedPokemons =
    () => {
      const saved =
        localStorage.getItem(
          "savedPokemons",
        );

      const pokemons = saved
        ? JSON.parse(saved)
        : [];

      setCapturedData({
        pageParams: [0],
        pages: [
          {
            count: pokemons.length,
            next: "",
            previous: null,
            results:
              restructurePokemonData(
                pokemons,
              ),
          },
        ],
      });
    };

  useEffect(() => {
    return observerFunction();
  }, [
    filterCaptured,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    selectedLayout,
  ]);

  useEffect(() => {
    rehydrateCapturedPokemons();
  }, [filterCaptured]);

  return (
    <div className="">
      <PokedexFilterBar />
      <div className="mt-10">
        {selectedLayout == "grid" ? (
          <PokedexLayout
            layout="grid"
            loadMoreRef={loadMoreRef}
            data={
              filterCaptured
                ? capturedData
                : data
            }
          />
        ) : (
          <PokedexLayout
            layout="list"
            loadMoreRef={loadMoreRef}
            data={
              filterCaptured
                ? capturedData
                : data
            }
          />
        )}
      </div>
      <PokemonProfileDialog
        refetch={refetch}
        filterCaptured={filterCaptured}
        rehydrateCapturedPokemons={rehydrateCapturedPokemons}
      />
    </div>
  );
}
