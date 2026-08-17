import {
  fetchPokemonDetails,
  fetchPokemonList,
} from "@/api/pokemonApi";
import { PokemonList } from "@/types/pokemonTypes";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export const usePokedexList = () => {
  return useInfiniteQuery<
    PokemonList,
    Error,
    InfiniteData<PokemonList, number>,
    readonly ["pokemon"],
    number
  >({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam }) =>
      fetchPokemonList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return undefined;
      }
      const url = new URL(
        lastPage.next,
      );
      return Number(
        url.searchParams.get("offset"),
      );
    },
  });
};

export const usePokedexDetails = (
  url: string,
) => {
  return useQuery({
    queryKey: [
      "pokemon",
      "details",
      url,
    ],
    queryFn: () =>
      fetchPokemonDetails(url),
  });
};
