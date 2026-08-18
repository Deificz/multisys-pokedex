import { Badge } from "@/components/ui/badge";
import { PokemonDetails } from "@/types/pokemonTypes";
import Image from "next/image";

export default function PokedexCard({
  details,
  layout,
  onClick,
}: {
  details: PokemonDetails;
  layout: string;
  onClick: () => void;
}) {
  const gridClassName =
    "h-70 lg:h-100 border-2 border-amber-300 shadow-lg shadow-amber-300 rounded-2xl dark:bg-gray-600 bg-white flex flex-col justify-between cursor-pointer";
  const listClassName =
    "h-35 mb-4 border-2 border-amber-300 shadow-lg shadow-amber-300 rounded-2xl dark:bg-gray-400 bg-white flex justify-between cursor-pointer";

  const imageGridClassName =
    "relative w-full max-w-25 md:max-w[150px] lg:max-w-50 aspect-square self-end";

  return (
    <div
      className={
        layout == "grid"
          ? gridClassName
          : listClassName
      }
      onClick={onClick}
    >
      <div className="p-5">
        <h1 className="text-xs md:text-lg">
          {details?.name}{" "}
        </h1>
        {details?.captured
          ?.captured_at ? (
          <Badges
            layout={layout}
            nickname={
              details?.captured
                ?.nickname
            }
            captured_at={
              details.captured
                .captured_at
            }
          />
        ) : (
          ""
        )}
      </div>
      <div
        className={
          layout == "grid"
            ? imageGridClassName
            : ""
        }
      >
        {layout == "grid" ? (
          <Image
            className="object-contain"
            alt={`${details?.name} Image`}
            src={details?.image}
            fill
          />
        ) : (
          <Image
            width={100}
            height={100}
            alt={`${details?.name} Image`}
            src={details?.image}
            unoptimized
          />
        )}
      </div>
    </div>
  );
}

const Badges = ({
  nickname,
  captured_at,
  layout,
}: BadgeType) => {
  return (
    <div
      className={`${layout == "grid" ? "flex flex-col" : ""} mt-5 `}
    >
      <Badge
        variant="destructive"
        className="mb-2 mr-3  text-[8px]"
      >
        Captured
      </Badge>
      <Badge className="mb-2 bg-blue-400 mr-3  text-[8px]">
        "{nickname}"
      </Badge>
      <Badge className="bg-green-400  text-[8px]">
        {captured_at}
      </Badge>
    </div>
  );
};
