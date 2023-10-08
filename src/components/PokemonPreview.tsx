import { Pokemon } from "@/lib/pokemon-api";
import Image from "next/image";
import styles from "./PokemonPreview.module.css";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  link?: boolean;
  favorite?: boolean;
  pokemon: Pokemon;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function PokemonPreview({
  link = true,
  favorite = false,
  headingLevel = "h3",
  pokemon,
}: Props) {
  const El = link ? Link : "section";
  const HeadingEl = headingLevel;
  return (
    <El
      className={clsx([
        "rounded-md bg-amber-200 flex flex-col p-2 aspect-[5/7] text-center relative pokecard",
        styles.pokecard,
      ])}
      href={`/pokemon/${pokemon.id}`}
    >
      {favorite && <span className="uppercase absolute left-2 top-2">❤️</span>}
      <span className="flex-1 flex justify-center items-center relative">
        {pokemon.sprites?.front_default && (
          <Image
            src={pokemon.sprites.front_default}
            alt=""
            className={clsx(["w-full object-contain", styles.img])}
            fill={true}
          />
        )}
      </span>
      <HeadingEl className="h3 uppercase pb-4">
        #{pokemon.id} {pokemon.name}
      </HeadingEl>
    </El>
  );
}
