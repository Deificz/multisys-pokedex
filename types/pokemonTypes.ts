export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetails[];
};

export type PokemonDetails = {
  name: string;
  url: string;
  image: string;
  captured?: {
    nickname: string;
    captured_at: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonClassType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";
