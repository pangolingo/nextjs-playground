import PokemonPreview from "@/components/PokemonPreview";
import { API_BASE_URL, getSinglePokemon } from "@/lib/pokemon-api";
import { Metadata } from "next";
import SaveForm from "./SaveForm";
import { getSession } from "@auth0/nextjs-auth0";
import { isSaved as isSavedInDb } from "@/lib/database/saved-pokemon";

const getPokemonFromPageSlug = async (params: Params) => {
  // TODO: check for id
  if (params.id == null) {
    // TODO: throw 404 guard error - do we need error boundary?
    // throw error(404, 'Not found');
  }
  const id = parseInt(params.id, 10);

  // const { session } = await parent();

  // TODO: no multiple await
  const pokemon = await getSinglePokemon(
    `${API_BASE_URL}/pokemon/${params.id}`,
    fetch
  );
  return pokemon;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pokemon = await getPokemonFromPageSlug(params);

  return {
    title: `${pokemon.name.toUpperCase()} - Pokeland`,
  };
}

interface Params {
  id: string;
}

interface Props {
  params: Params;
}
export default async function PokemonDetail({ params }: Props) {
  // TODO: no multiple await
  const pokemon = await getPokemonFromPageSlug(params);
  const session = await getSession();

  const isSaved: boolean = session?.user?.sub
    ? await isSavedInDb(pokemon.id, session?.user.sub)
    : false;
  // TODO: need a loading state otherwise it uses the parent loading state

  return (
    <div className="grid min-[420px]:grid-cols-2 max-w-2xl gap-4">
      <PokemonPreview
        pokemon={pokemon}
        favorite={isSaved}
        link={false}
        headingLevel="h2"
        // --view-transition-name={`pokemon-card-${pokemon.id}`}
      />
      <div className="flex flex-col">
        <section className="flex-1 mb-2">
          <h3 className="h3 mt-2">Abilities</h3>
          <ul>
            {pokemon.abilities.map((ability) => {
              return <li key={ability.ability.name}>{ability.ability.name}</li>;
            })}
          </ul>
        </section>

        <SaveForm pokemon={pokemon} isSaved={isSaved} />
      </div>
    </div>
  );
}
