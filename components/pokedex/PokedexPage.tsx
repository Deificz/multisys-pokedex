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

type Props = {};

export default function PokedexPage({}: Props) {
  //Layout Store
  const selectedLayout =
    useListLayoutStore(
      (state) => state.selectedLayout,
    );
  const captured =
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
  ] = useState({
    pageParams: [0],
    pages: [
      {
        count: 0,
        next: "",
        previous: null,
        results: [],
      },
    ],
  });
  const loadMoreRef =
    useRef<HTMLDivElement>(null);

  //Observer for users when they reach at the bottom to trigger API Fetch
  const observerFunction = () => {
    if (captured) return;
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
            results: pokemons.map(
              (pokemon: any) => {
                const id = pokemon.url
                  .split("/")
                  .filter(Boolean)
                  .pop();
                const is_captured =
                  pokemons.find(
                    (
                      savedPokemon: SavedPokemonType,
                    ) =>
                      savedPokemon.name ===
                      pokemon.name,
                  );
                return {
                  ...pokemon,
                  image: `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${id}.png`,
                  captured:
                    is_captured ?? null,
                };
              },
            ),
          },
        ],
      });
    };

  useEffect(() => {
    return observerFunction();
  }, [
    captured,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    selectedLayout,
  ]);

  useEffect(() => {
    rehydrateCapturedPokemons();
  }, [captured]);

  return (
    <div className="">
      <PokedexFilterBar />
      <div className="mt-20">
        {selectedLayout == "grid" ? (
          <PokedexLayout
            layout="grid"
            loadMoreRef={loadMoreRef}
            data={
              captured
                ? capturedData
                : data
            }
          />
        ) : (
          <PokedexLayout
            layout="list"
            loadMoreRef={loadMoreRef}
            data={
              captured
                ? capturedData
                : data
            }
          />
        )}
      </div>
      <PokemonProfileDialog
        refetch={refetch}
      />
    </div>
  );
}
