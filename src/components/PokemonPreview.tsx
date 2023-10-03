import { Pokemon } from "@/lib/pokemon-api";
import Image from "next/image";
import styles from "./PokemonPreview.module.css";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  link?: boolean;
  favorite?: boolean;
  pokemon: Pokemon;
}

export default function PokemonPreview({
  link = true,
  favorite = false,
  pokemon,
}: Props) {
  const El = link ? Link : "section";
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
      <h3 className="h3 uppercase pb-4">
        #{pokemon.id} {pokemon.name}
      </h3>
    </El>
  );
}
