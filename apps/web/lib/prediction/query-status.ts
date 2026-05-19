/** True when the browse grid should show skeleton (initial load or filter change). */
export function isBrowseGridLoading(
  isLoading: boolean,
  isPending: boolean,
  isFetching: boolean,
  isFetchingNextPage: boolean,
  hasData: boolean,
  isPlaceholderData: boolean
): boolean {
  if (isFetchingNextPage) return false;
  if (isLoading) return true;
  if (isPending && !hasData) return true;
  if (isFetching && isPlaceholderData) return true;
  if (isFetching && !hasData) return true;
  return false;
}

/** True during background refetch while showing settled (non-placeholder) data. */
export function isBrowseBackgroundFetching(
  isLoading: boolean,
  isPending: boolean,
  isFetching: boolean,
  isFetchingNextPage: boolean,
  hasData: boolean,
  isPlaceholderData: boolean
): boolean {
  return (
    isFetching &&
    !isLoading &&
    !isPending &&
    !isFetchingNextPage &&
    hasData &&
    !isPlaceholderData
  );
}
