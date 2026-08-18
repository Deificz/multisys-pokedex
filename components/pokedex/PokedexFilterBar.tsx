"use client";
import {
  Grid,
  List,
} from "lucide-react";
import {
  useCapturedFilterStore,
  useListLayoutStore,
} from "@/stores/useListLayout";
import { Button } from "@/components/ui/button";
import { LayoutButtonType } from "@/types/buttonTypes";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "../ui/switch";

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
          src={"/images/logo.png"}
          width={"300"}
          height={"300"}
          alt="logo"
        />
      </Link>
      <LayoutOptions />
      <CapturedFilterSwitch />
    </div>
  );
}

const LayoutOptions = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <LayoutButton type="grid" />
      <LayoutButton type="list" />
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
    <div className="flex justify-center items-center mt-5">
      <p className="mr-2">Captured</p>
      <Switch
        checked={captured}
        onCheckedChange={(value) =>
          setCaptured(value)
        }
        className={"cursor-pointer"}
      />
    </div>
  );
};
