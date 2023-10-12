import Image from "next/image";
import pokeImage from "../../public/images/pokemon-michael-rivera-unsplash.jpg";
import { getSession } from "@auth0/nextjs-auth0";
import { getSavedPokemon } from "@/lib/database/saved-pokemon";
import { Pokemon, getSinglePokemonById } from "@/lib/pokemon-api";
import PokemonPreview from "@/components/PokemonPreview";

export default async function Home() {
  const session = await getSession();
  let favoritePokemon: Pokemon[] = [];
  if (session?.user.sub) {
    const savedPokemon = await getSavedPokemon(session?.user.sub);
    const enhancedSavedPokemon = await Promise.all(
      savedPokemon.map((p) => {
        return getSinglePokemonById(p.pokemon_id, fetch);
      })
    );
    favoritePokemon = enhancedSavedPokemon;
  }

  // TODO: can we do the loading state, error state?

  return (
    <>
      <h2 className="h4">Welcome to Pokeland</h2>
      <p>
        <a className="link" href="/pokemon">
          Check out all the pokemons!
        </a>
      </p>

      <figure className="my-4">
        <Image
          src={pokeImage}
          alt="Pikachu and Squirtle Pokemon toys in the grass"
          width={400}
        />
        <figcaption>
          <small>
            Photo by{" "}
            <a href="https://unsplash.com/@gojomike?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Michael Rivera{" "}
            </a>
            on{" "}
            <a href="https://unsplash.com/photos/DypO_XgAE4Y?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </small>
        </figcaption>
      </figure>

      {session?.user && (
        <>
          <h2 className="h2 mt-4 mb-2">My favorite pokemons</h2>

          {favoritePokemon.length < 1 && (
            <p>You haven&apos;t saved any Pokemon yet.</p>
          )}

          {favoritePokemon.length >= 1 && (
            <ul className="pokegrid">
              {favoritePokemon.map((savedPokemon) => (
                <li key={savedPokemon.id}>
                  <PokemonPreview
                    pokemon={savedPokemon}
                    favorite={true}
                    // --view-transition-name={`pokemon-card-${savedPokemon.id}`}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
