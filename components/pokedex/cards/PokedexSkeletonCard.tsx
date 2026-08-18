import { assetPath } from "@/lib/utils";
import Image from "next/image";

type Props = {
  layout: string;
};

export default function PokedexSkeletonCard({
  layout,
}: Props) {
  const gridClassName =
    "h-50 lg:h-100 border-2 border-amber-300 shadow-lg shadow-amber-300 rounded-2xl dark:bg-gray-600 bg-white flex justify-center items-center";
  const listClassName =
    "h-25 mb-4 border-2 border-amber-300 shadow-lg shadow-amber-300 rounded-2xl dark:bg-gray-400 bg-white flex justify-center items-center";
  return (
    <div
      className={
        layout == "grid"
          ? gridClassName
          : listClassName
      }
    >
      <div className="p-5">
        <Image
          className="animate-bounce"
          alt="pokeball_loading"
          width={
            layout == "grid" ? 100 : 40
          }
          height={
            layout == "list" ? 100 : 40
          }
          src={assetPath(
            "/images/poke_ball.png",
          )}
        />
      </div>
    </div>
  );
}
