import { assetPath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Image
        src={assetPath("/images/logo.png")}
        width={"700"}
        height={"700"}
        alt="logo"
      />
      <Link href={"/pokedex"}>
        <Image
        className="mt-30 animate-bounce"
          src={assetPath("/images/poke_ball.png")}
          width={"200"}
          height={"200"}
          alt="logo"
        />
      </Link>
    </main>
  );
}
