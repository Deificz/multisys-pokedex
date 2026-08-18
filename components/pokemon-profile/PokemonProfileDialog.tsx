"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { usePokedexDetails } from "@/hooks/usePokedex";
import { usePokemonStore } from "@/stores/usePokemon";
import {
  PokemonClassType,
  PokemonType,
} from "@/types/pokemonTypes";
import { POKEMON_TYPE_COLORS } from "@/lib/constants";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  defaultDate,
  removePokemon,
  savePokemon,
  updatePokemon,
} from "@/lib/utils";
import {
  useEffect,
  useState,
} from "react";

type Props = {
  refetch: () => void;
  filterCaptured: boolean;
  rehydrateCapturedPokemons: () => void;
};
export default function PokemonProfileDialog({
  refetch,
  filterCaptured,
  rehydrateCapturedPokemons,
}: Props) {
  // Store
  const selectedPokemon =
    usePokemonStore(
      (state) => state.selectedPokemon,
    );
  const setSelectedPokemon =
    usePokemonStore(
      (state) =>
        state.setSelectedPokemon,
    );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SavedPokemonType>();

  const [isDeleting, setIsDeleting] =
    useState(false);

  // Query
  const { data, isLoading, isError } =
    usePokedexDetails(
      selectedPokemon?.url ?? "",
    );

  // Dynamic Profile Theme Color
  const typeName = data?.types[0].type
    .name as PokemonClassType;

  const color =
    POKEMON_TYPE_COLORS[typeName];
  // Submit Function
  const onSubmit = (
    data: SavedPokemonType,
  ) => {
    if (!selectedPokemon) return;
    if (
      !selectedPokemon?.captured
        ?.captured_at
    ) {
      savePokemon({
        ...data,
        name: selectedPokemon?.name,
        url: selectedPokemon?.url,
      });
    } else if (isDeleting) {
      removePokemon({
        ...data,
        name: selectedPokemon?.name,
        url: selectedPokemon?.url,
      });
      setIsDeleting(false)
    } else {
      updatePokemon({
        ...data,
        name: selectedPokemon?.name,
        url: selectedPokemon?.url,
      });
    }
    setSelectedPokemon(null);
    refetch();
    if (filterCaptured) {
      rehydrateCapturedPokemons();
    }
  };

  useEffect(() => {
    if (!selectedPokemon) return;

    reset({
      nickname:
        selectedPokemon.captured
          ?.nickname ?? "",
      captured_at:
        selectedPokemon.captured
          ?.captured_at ?? defaultDate,
    });
  }, [selectedPokemon, reset]);

  return (
    <Dialog
      open={!!selectedPokemon}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedPokemon(null);
        }
      }}
    >
      <DialogContent
        className={`${color?.bg} shadow-2xl ${color?.shadow}`}
      >
        {/* Fallback Values*/}
        {isLoading && (
          <div className="flex justify-center py-10">
            Loading...
          </div>
        )}

        {isError && (
          <div>
            Failed to load Pokémon
            details.
          </div>
        )}

        {/* Pokemon Details */}
        {data && (
          <div
            className={`flex flex-col items-center gap-4 py-5 rounded-2xl `}
          >
            <div className="bg-white dark:bg-gray-400 rounded-full">
              {" "}
              <Image
                src={`https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${data.id}.png`}
                alt={data.name}
                width={200}
                height={200}
              />
            </div>

            <h2
              className={`text-2xl capitalize font-bold`}
            >
              {data.name}
            </h2>

            <div className="flex gap-2">
              {data.types?.map(
                (type: PokemonType) => (
                  <span
                    key={type.type.name}
                    className="rounded-full bg-gray-200 px-3 py-1 capitalize"
                  >
                    {type.type.name}
                  </span>
                ),
              )}
            </div>
          </div>
        )}

        {/* Form for Saving Captured Pokemon */}
        <div className="bg-white dark:bg-gray-400 rounded-2xl p-5">
          <form
            id="pokemon-form"
            onSubmit={handleSubmit(
              onSubmit,
            )}
          >
            <input
              defaultValue={
                selectedPokemon
                  ?.captured
                  ?.nickname ?? ""
              }
              required
              className="mb-3 py-2"
              {...register("nickname")}
              placeholder="Nickname"
            />

            <input
              type="date"
              required
              defaultValue={
                selectedPokemon
                  ?.captured
                  ?.captured_at ??
                defaultDate
              }
              {...register(
                "captured_at",
              )}
            />
          </form>
        </div>

        <DialogFooter className="flex justify-between">
          {selectedPokemon?.captured
            ?.captured_at && (
            <Button
              variant="destructive"
              form={"pokemon-form"}
              type="submit"
              onClick={() =>
                setIsDeleting(true)
              }
            >
              RELEASE
            </Button>
          )}
          <Button
            form={"pokemon-form"}
            type="submit"
          >
            {selectedPokemon?.captured
              ?.captured_at
              ? "UPDATE"
              : "CAPTURE"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
