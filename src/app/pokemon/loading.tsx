import PokemonPreviewSkeleton from "@/components/PokemonPreviewSkeleton";
import { getPageNumberFromSearchParams } from "@/lib/helpers/pagination";
// import { useSearchParams } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | string[] | string[][] | undefined };
}
export default function Loading({ searchParams: searchParamsObj }: Props) {
  const searchParams = new URLSearchParams(
    // we cast for simplicity, even though this will ignore array values
    searchParamsObj as Record<string, string>
  );
  // const searchParams = useSearchParams();
  const pageNumber = getPageNumberFromSearchParams(searchParams);

  return (
    <>
      <h2>20 pokemon (page {pageNumber})</h2>

      <ul className="pokegrid">
        {[...Array(20)].map((i) => {
          return (
            <li key={i}>
              <PokemonPreviewSkeleton />
            </li>
          );
        })}
      </ul>
    </>
  );
}
