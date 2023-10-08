import PokemonPreview from "@/components/PokemonPreview";
import { SavedPokemon, getSavedPokemon } from "@/lib/database/saved-pokemon";
import { getPageNumberFromSearchParams } from "@/lib/helpers/pagination";
import { listPokemonPage } from "@/lib/pokemon-api";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  searchParams: { [key: string]: string | string[] | string[][] | undefined };
}

export const metadata: Metadata = {
  title: "All Pokemon - Pokeland",
};

export default async function Pokemon({
  searchParams: searchParamsObj,
}: Props) {
  // TODO: can we make an error boundary with <p>Error loading pokemon: {error.message}</p>
  const searchParams = new URLSearchParams(
    // we cast for simplicity, even though this will ignore array values
    searchParamsObj as Record<string, string>
  );

  // BUG: pagenumber can become NaN - need a check in this method
  const pageNumber = getPageNumberFromSearchParams(searchParams);

  // TODO: don't await, user check for favorites
  const pokemonPage = await listPokemonPage(pageNumber, fetch);
  let favoritePokemonIds: number[] = [];
  // if (session?.user) {
  //   favoritePokemonIds = await getSavedPokemon(session.user.sub).then((f) =>
  //     f.map((p) => p.pokemon_id)
  //   );
  // }

  // TODO: view transition

  return (
    <>
      <h2>
        {pokemonPage.page.count} pokemon (page {pageNumber})
      </h2>

      <ul className="pokegrid">
        {pokemonPage.pokemon.map((pokemon) => {
          return (
            <li key={pokemon.id}>
              <PokemonPreview
                pokemon={pokemon}
                favorite={favoritePokemonIds.includes(pokemon.id)}
                // --view-transition-name={`pokemon-card-${pokemon.id}`}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex mt-2 space-x-2">
        {pokemonPage.page.previous && (
          <Link href={`?page=${pageNumber - 1}`} className="btn">
            Previous page
          </Link>
        )}
        {pokemonPage.page.next && (
          <Link href={`?page=${pageNumber + 1}`} className="btn">
            Next page
          </Link>
        )}
      </div>
    </>
  );
}
