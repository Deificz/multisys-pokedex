"use client";
import {
  Grid,
  List,
} from "lucide-react";
import {
  useCapturedFilterStore,
  useListLayoutStore,
  useSearchFilterStore,
} from "@/stores/useListLayout";
import { Button } from "@/components/ui/button";
import { LayoutButtonType } from "@/types/buttonTypes";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { assetPath } from "@/lib/utils";

type Props = {};

export default function PokedexFilterBar({}: Props) {
  return (
    <div className="flex flex-col">
      <Link
        href={"/"}
        className="flex justify-center items-center"
      >
        <Image
          className=""
          src={assetPath(
            "/images/logo.png",
          )}
          width={"300"}
          height={"300"}
          alt="logo"
        />
      </Link>
      <LayoutOptions />

      <SearchFilterBar />
    </div>
  );
}

const LayoutOptions = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <LayoutButton type="grid" />
      <LayoutButton type="list" />
      <CapturedFilterSwitch />
    </div>
  );
};

const LayoutButton = ({
  type,
}: LayoutButtonType) => {
  const selectedLayout =
    useListLayoutStore(
      (state) => state.selectedLayout,
    );

  const setSelectedLayout =
    useListLayoutStore(
      (state) =>
        state.setSelectedLayout,
    );
  return (
    <Button
      onClick={() =>
        setSelectedLayout(type)
      }
      className="mr-3 h-12 w-12"
    >
      {type == "grid" ? (
        <Grid
          className={`${selectedLayout == type ? "text-yellow-500" : ""}`}
        />
      ) : (
        <List
          className={`${selectedLayout == type ? "text-yellow-500" : ""}`}
        />
      )}
    </Button>
  );
};

const CapturedFilterSwitch = () => {
  const captured =
    useCapturedFilterStore(
      (state) => state.captured,
    );
  const setCaptured =
    useCapturedFilterStore(
      (state) => state.setCaptured,
    );
  return (
    <div className="flex flex-col justify-center items-center">
      <Tooltip>
        <TooltipTrigger>
          <Image
            className="mb-2"
            src={assetPath(
              "/images/poke_ball.png",
            )}
            width={"30"}
            height={"30"}
            alt="logo"
          />
          <Switch
            checked={captured}
            onCheckedChange={(value) =>
              setCaptured(value)
            }
            className={"cursor-pointer"}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter Captured</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const SearchFilterBar = () => {
  const setSearch =
    useSearchFilterStore(
      (state) => state.setSearch,
    );
  return (
    <input
      defaultValue={""}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="mb-3 py-2 border border-solid mt-10 px-3 rounded-2xl"
      placeholder="Search"
    />
  );
};
