import {
  clsx,
  type ClassValue,
} from "clsx";
import { json } from "stream/consumers";
import { twMerge } from "tailwind-merge";

export function cn(
  ...inputs: ClassValue[]
) {
  return twMerge(clsx(inputs));
}

const today = new Date();

export const defaultDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(
    2,
    "0",
  ),
  String(today.getDate()).padStart(
    2,
    "0",
  ),
].join("-");

export const savePokemon = ({
  name,
  nickname,
  url,
  captured_at,
}: SavedPokemonType) => {
  const savedPokemons =
    localStorage.getItem(
      "savedPokemons",
    );
  const pokemonList = savedPokemons
    ? JSON.parse(savedPokemons)
    : [];

  pokemonList.push({
    name,
    nickname,
    url,
    captured_at,
  });

  localStorage.setItem(
    "savedPokemons",
    JSON.stringify(pokemonList),
  );
};

export const updatePokemon = (
  data: SavedPokemonType,
) => {
  const savedPokemons =
    localStorage.getItem(
      "savedPokemons",
    );

  const pokemonList = savedPokemons
    ? JSON.parse(savedPokemons)
    : [];
  const updatedList = pokemonList.map(
    (pokemon: SavedPokemonType) =>
      pokemon.name === data.name
        ? data
        : pokemon,
  );

  localStorage.setItem(
    "savedPokemons",
    JSON.stringify(updatedList),
  );
};
