import sql from ".";

export interface SavedPokemon {
  id: number;
  pokemon_name: string;
  pokemon_id: number;
  user_id: string;
  created_at: string;
}

export async function getSavedPokemon(
  userId: string
): Promise<Array<SavedPokemon>> {
  const savedPokemon = await sql<SavedPokemon[]>`
    SELECT
      *
    FROM saved_pokemon
    WHERE user_id = ${userId}
  `;
  if (!savedPokemon.length) {
    return [];
  }
  return savedPokemon;
}

export async function savePokemon(
  pokemonId: number,
  pokemonName: string,
  userId: string
): Promise<SavedPokemon> {
  const savedPokemon = await sql<SavedPokemon[]>`
      insert into saved_pokemon
        (pokemon_id, pokemon_name, user_id)
      values
        (${pokemonId}, ${pokemonName}, ${userId})
      returning id, pokemon_id, pokemon_name, user_id
    `;
  if (savedPokemon.length != 1) {
    throw new Error(
      `Unexpected number of saved pokemon inserted: ${savedPokemon.length}`
    );
  }
  return savedPokemon[0];
}

export async function unsavePokemon(
  pokemonId: number,
  userId: string
): Promise<void> {
  const deletePokemonResult = await sql<SavedPokemon[]>`
  DELETE FROM saved_pokemon
  WHERE user_id = ${userId} AND pokemon_id = ${pokemonId}
`;
  if (deletePokemonResult.count < 1) {
    throw new Error(
      `Unexpected number of deleted pokemon: ${deletePokemonResult.count}`
    );
  }
}

export async function isSaved(
  pokemonId: number,
  userId: string
): Promise<boolean> {
  const savedPokemon = await sql<SavedPokemon[]>`
    SELECT
      id
    FROM saved_pokemon
    WHERE user_id = ${userId} AND pokemon_id = ${pokemonId}
  `;
  if (savedPokemon.count > 0) {
    return true;
  }

  return false;
}
