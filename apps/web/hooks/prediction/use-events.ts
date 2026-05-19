"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  getEvent,
  getEventsPaginated,
  searchEvents,
} from "@/lib/prediction/api";
import {
  PAGE_SIZE,
  SORT_OPTIONS,
  type Category,
  type Filter,
  type SortOptionValue,
} from "@/lib/prediction/constants";

export function useEvents(params?: {
  category?: Category;
  filter?: Filter;
  sortOption?: SortOptionValue;
  subcategory?: string;
}) {
  const sort =
    SORT_OPTIONS.find((o) => o.value === params?.sortOption) ?? SORT_OPTIONS[0];

  return useInfiniteQuery({
    queryKey: ["prediction-events", params],
    queryFn: ({ pageParam = 0 }) =>
      getEventsPaginated({
        category: params?.category === "all" ? undefined : params?.category,
        subcategory: params?.subcategory,
        filter: params?.filter,
        sortBy: sort.sortBy,
        sortDirection: sort.sortDirection,
        includeMarkets: true,
        start: pageParam,
        end: pageParam + PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.end : undefined,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useEvent(eventId: string) {
  return useQuery({
    queryKey: ["prediction-event", eventId],
    queryFn: () => getEvent(eventId, true),
    enabled: !!eventId,
    staleTime: 30_000,
  });
}

export function useSearchEvents(query: string) {
  return useQuery({
    queryKey: ["prediction-events", "search", query],
    queryFn: () => searchEvents(query, { limit: 20 }),
    enabled: query.length >= 2,
    staleTime: 30_000,
  });
}
