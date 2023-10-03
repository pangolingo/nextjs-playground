export const API_BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonPageInfo {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PokemonList extends PokemonPageInfo {
  results: PokemonListResult[];
}

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  // held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  // past_types: any[];
  species: Species;
  sprites: SpritesWithExtras;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface Sprites {
  back_default?: string;
  back_shiny?: string;
  back_female?: null;
  back_shiny_female?: null;
  back_gray?: string | null;
  back_transparent?: string | null;
  back_shiny_transparent?: string | null;

  front_default?: string;
  front_shiny?: string;
  front_female?: null;
  front_shiny_female?: null;
  front_gray?: string | null;
  front_transparent?: string | null;
  front_shiny_transparent?: string | null;
}

export interface SpritesWithExtras extends Sprites {
  other: {
    dream_world: Sprites;
    home: Sprites;
    "official-artwork": Sprites;
  };
  versions: {
    "generation-i": GenerationI;
    "generation-ii": GenerationII;
    "generation-iii": GenerationIII;
    "generation-iv": GenerationIV;
    "generation-v": GenerationV;
    "generation-vi": GenerationIV;
    "generation-vii": GenerationVII;
    "generation-viii": GenerationVIII;
  };
}

export interface GenerationI {
  "red-blue": Sprites;
  yellow: Sprites;
}

export interface GenerationII {
  crystal: Sprites;
  gold: Sprites;
  silver: Sprites;
}

export interface GenerationIII {
  emerald: Sprites;
  "firered-leafgreen": Sprites;
  "ruby-sapphire": Sprites;
}

export interface GenerationIV {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationVI {
  "omegaruby-alphasapphire": Sprites;
  "x-y": Sprites;
}

export interface GenerationVII {
  icons: Sprites;
  "ultra-sun-ultra-moon": Sprites;
}

export interface GenerationVIII {
  icons: Sprites;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface PokemonType {
  slot: number;
  type: Species;
}

const pageLimit = 20;

const getPageOffset = (pageNumber: number, pageLimit: number): number => {
  return pageLimit * (pageNumber - 1);
};

export async function listPokemonPage(
  pageNumber: number,
  fetchMethod: typeof fetch = fetch
): Promise<{ pokemon: Pokemon[]; page: PokemonPageInfo }> {
  if (pageNumber == null || pageNumber < 1) {
    throw new Error("Unexpected page number");
  }
  const response = await fetchMethod(
    `${API_BASE_URL}/pokemon?offset=${getPageOffset(
      pageNumber,
      pageLimit
    )}&limit=${pageLimit}`
  );
  const pokemonList: PokemonList = await response.json();

  const singlePokemons = await Promise.all(
    pokemonList.results.map((p) => {
      return getSinglePokemon(p.url, fetchMethod);
    })
  );
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       pokemon: singlePokemons,
  //       page: {
  //         next: pokemonList.next,
  //         previous: pokemonList.previous,
  //         count: pokemonList.count,
  //       },
  //     });
  //   }, 3000);
  // });
  return {
    pokemon: singlePokemons,
    page: {
      next: pokemonList.next,
      previous: pokemonList.previous,
      count: pokemonList.count,
    },
  };
}

export async function getSinglePokemon(
  url: string,
  fetchMethod: typeof fetch = fetch
): Promise<Pokemon> {
  const response = await fetchMethod(url);
  return response.json();
}

export async function getSinglePokemonById(
  id: number,
  fetchMethod: typeof fetch = fetch
): Promise<Pokemon> {
  const response = await fetchMethod(`${API_BASE_URL}/pokemon/${id}`);
  return response.json();
}
