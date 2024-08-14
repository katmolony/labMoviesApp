import { useState, useMemo } from "react";

type SortOption = "title" | "release_date" | "vote_average";

const useSorting = <T extends Record<string, any>>(initialSortOption: SortOption) => {
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);

  const sortFunction = (a: T, b: T): number => {
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);
      case "release_date":
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      case "vote_average":
        return b.vote_average - a.vote_average;
      default:
        return 0;
    }
  };

  const sortedData = useMemo(() => {
    return (data: T[]) => {
      return [...data].sort(sortFunction);
    };
  }, [sortOption]);

  return {
    sortOption,
    setSortOption,
    sortedData,
  };
};

export default useSorting;