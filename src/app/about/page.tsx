import PikaDialog from "@/components/PikaDialog";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Pokeland",
};

export default function About() {
  return (
    <>
      <h2 className="h2">About Pokeland</h2>

      <h3 className="h3 my-4">I love pokemons!</h3>
      <div className="space-y-4">
        <p>
          This website was made to share my love of pokemons with the world.
          Take a look at ALL the pokemon, and save your favorites.
        </p>

        <p>If you like this site, let me know.</p>

        <p>
          <Link className="btn inline-block" href="/contact">
            Tell me you like this site
          </Link>
        </p>

        <p>
          <PikaDialog />
        </p>
      </div>
    </>
  );
}
