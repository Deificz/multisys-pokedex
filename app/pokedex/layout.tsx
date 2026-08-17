import { ModeToggle } from "@/components/theme-toggle";

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b  bg-gradient-to-b from-white to-[#697ef1]
        dark:bg-gradient-to-b dark:from-[#111827] dark:to-[#4453ac] py-10 px-5"
    >
      {children}
      <div className="fixed bottom-5 right-5 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
