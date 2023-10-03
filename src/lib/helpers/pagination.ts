export const getPageNumberFromSearchParams = (
  searchParams: URLSearchParams
): number => {
  const rawPageNumber = searchParams.get("page");
  return rawPageNumber ? parseInt(rawPageNumber, 10) : 1;
};
