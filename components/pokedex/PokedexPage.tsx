"use client";

import PokedexFilterBar from "./PokedexFilterBar";
import {
  useCapturedFilterStore,
  useListLayoutStore,
} from "@/stores/useListLayout";
import PokedexListLayout from "./listing/PokedexListLayout";
import PokedexGridLayout from "./listing/PokedexGridLayout";
import { usePokedexList } from "@/hooks/usePokedex";
import {
  useEffect,
  useRef,
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

  const capturedData = {
    pageParams: [0],
    pages: [
      {
        count: 0,
        next: "",
        previous: null,
        results: JSON.parse(
          localStorage.getItem(
            "savedPokemons",
          ) ?? "[]",
        ),
      },
    ],
  };

  console.log(data);
  const loadMoreRef =
    useRef<HTMLDivElement>(null);

  //Observer for users when they reach at the bottom to trigger API Fetch
  const observerFunction = () => {
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

  useEffect(() => {
    return observerFunction();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    selectedLayout,
  ]);

  return (
    <div className="">
      <PokedexFilterBar />
      <div className="mt-20">
        {selectedLayout == "grid" ? (
          <PokedexGridLayout
            loadMoreRef={loadMoreRef}
            data={
              captured
                ? capturedData
                : data
            }
          />
        ) : (
          <PokedexListLayout
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
