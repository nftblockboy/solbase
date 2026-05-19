/** True when the browse grid should show skeleton (initial load or filter change). */
export function isBrowseGridLoading(
  isPending: boolean,
  isFetching: boolean,
  isFetchingNextPage: boolean,
  hasData: boolean,
  isPlaceholderData: boolean
): boolean {
  if (isFetchingNextPage) return false;
  if (isPending && !hasData) return true;
  if (isFetching && isPlaceholderData) return true;
  if (isFetching && !hasData) return true;
  return false;
}

/** True during background refetch while showing settled (non-placeholder) data. */
export function isBrowseBackgroundFetching(
  isFetching: boolean,
  isFetchingNextPage: boolean,
  hasData: boolean,
  isPlaceholderData: boolean
): boolean {
  return (
    isFetching && !isFetchingNextPage && hasData && !isPlaceholderData
  );
}
