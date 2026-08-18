import { POKEMON_LIST_LIMIT } from "@/lib/constants";
import { restructurePokemonData } from "@/lib/utils";

export const fetchPokemonList = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_LIST_LIMIT}&offset=${pageParam}`,
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch Pokemon list",
    );
  }

  

  const data = await response.json();
  return {
    ...data,
    results: restructurePokemonData(data.results),
  };
};

export const fetchPokemonDetails =
  async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Failed to fetch Pokemon details",
      );
    }
    const data = await response.json();
    return data;
  };
