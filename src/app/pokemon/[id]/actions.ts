"use server";

import {
  savePokemon as savePokemonInDb,
  unsavePokemon as unsavePokemonInDb,
} from "@/lib/database/saved-pokemon";
import { getSession } from "@auth0/nextjs-auth0";

export interface FormErrorState {
  unauthorized: true;
}
export interface FormSuccessstate {
  success: true;
}

export type PossibleFormStates = FormErrorState | FormSuccessstate;

export async function toggleSavePokemon(
  prevState: PossibleFormStates,
  formData: FormData
): Promise<PossibleFormStates> {
  if (formData.get("action") === "save") {
    return savePokemon(prevState, formData);
  }
  return unSavePokemon(prevState, formData);
}

export async function savePokemon(
  prevState: PossibleFormStates,
  formData: FormData
): Promise<PossibleFormStates> {
  const session = await getSession();
  if (!session?.user?.sub) {
    return { unauthorized: true };
  }

  const id = formData.get("pokemon_id");
  const name = formData.get("pokemon_name");
  if (typeof id !== "string" || typeof name !== "string") {
    throw new Error("Id or name is not set");
  }
  await savePokemonInDb(parseInt(id, 10), name, session.user.sub);

  return { success: true };
}

export async function unSavePokemon(
  prevState: PossibleFormStates,
  formData: FormData
): Promise<PossibleFormStates> {
  const session = await getSession();
  if (!session?.user?.sub) {
    return { unauthorized: true };
  }

  const id = formData.get("pokemon_id");
  if (typeof id !== "string") {
    throw new Error("Id is not set");
  }
  await unsavePokemonInDb(parseInt(id, 10), session.user.sub);

  return { success: true };
}
