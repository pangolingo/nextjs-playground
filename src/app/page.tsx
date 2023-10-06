import Image from "next/image";
import pokeImage from "../../public/images/pokemon-michael-rivera-unsplash.jpg";

export default function Home() {
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
    </>
  );
}
