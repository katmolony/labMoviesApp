import { useState } from "react";

interface SortOption {
  name: string;
  condition: (a: any, b: any) => number;
}

const useSorting = (initialSortOption: SortOption) => {
  const [sortOption, setSortOption] = useState(initialSortOption);

  const sortFunction = (collection: any[]) => {
    return [...collection].sort(sortOption.condition);
  };

  return {
    sortOption,
    setSortOption,
    sortFunction,
  };
};

export default useSorting;