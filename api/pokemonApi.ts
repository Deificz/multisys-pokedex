import { POKEMONT_LIST_LIMIT } from "@/lib/constants";

export const fetchPokemonList = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMONT_LIST_LIMIT}&offset=${pageParam}`,
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch Pokemon list",
    );
  }

  const savedPokemons = JSON.parse(
    localStorage.getItem(
      "savedPokemons",
    ) || "[]",
  );

  const data = await response.json();
  return {
    ...data,
    results: data.results.map(
      (pokemon: any) => {
        const id = pokemon.url
          .split("/")
          .filter(Boolean)
          .pop();
        const is_captured =
          savedPokemons.find(
            (
              savedPokemon: SavedPokemonType,
            ) =>
              savedPokemon.name ===
              pokemon.name,
          );
        return {
          ...pokemon,
          image: `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${id}.png`,
          captured: is_captured ?? null,
        };
      },
    ),
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
