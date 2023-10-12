"use client";
// todo: fix - react doesnt yet declare this ts type
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { PossibleFormStates, toggleSavePokemon } from "./actions";
import { Pokemon } from "@/lib/pokemon-api";

const initialState = {};

interface Props {
  pokemon: Pokemon;
  isSaved: boolean;
}

export default function SaveForm({ pokemon, isSaved }: Props) {
  const [formState, formAction] = useFormState(
    toggleSavePokemon,
    initialState
  ) as [PossibleFormStates, any];

  return (
    <form action={formAction}>
      <input type="hidden" name="pokemon_id" value={pokemon.id} />
      <input type="hidden" name="pokemon_name" value={pokemon.name} />
      {"success" in formState && (
        <>
          {isSaved && <p>Saved!</p>}
          {!isSaved && <p>Unsaved!</p>}
        </>
      )}
      {"unauthorized" in formState && (
        <p>Please log in to save this pokemon.</p>
      )}
      {isSaved && (
        <button className="btn" type="submit" name="action" value="unsave">
          💔 Remove saved pokemon
        </button>
      )}
      {!isSaved && (
        <button className="btn" type="submit" name="action" value="save">
          ❤️ Save pokemon
        </button>
      )}
    </form>
  );
}
