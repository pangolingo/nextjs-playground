import Loading from "./Loading";
import colors from "tailwindcss/colors";

export default function PokemonPreviewSkeleton() {
  return (
    <div className="rounded-m bg-slate-100 flex flex-col p-2 aspect-[5/7] text-center relative">
      <span className="flex-1 flex justify-center items-center">
        <div className="p-8">
          <Loading
            style={
              {
                "--primary-color": colors["slate"][50],
                "--secondary-color": colors["slate"][200],
              } as React.CSSProperties
            }
          />
        </div>
      </span>
      <div className="mb-4 h-6 w-5/6 bg-slate-200 m-auto" />
    </div>
  );
}
