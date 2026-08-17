import { create } from "zustand";

type ListLayoutStore = {
  selectedLayout: string | null;
  setSelectedLayout: (
    layout: string,
  ) => void;
};

type CapturedFilterStore = {
  captured: boolean;
  setCaptured: (
    captured: boolean,
  ) => void;
};

export const useListLayoutStore =
  create<ListLayoutStore>((set) => ({
    selectedLayout: "grid",

    setSelectedLayout: (layout) =>
      set({ selectedLayout: layout }),
  }));

export const useCapturedFilterStore =
  create<CapturedFilterStore>(
    (set) => ({
      captured: false,
      setCaptured: (captured) =>
        set({ captured: captured }),
    }),
  );
