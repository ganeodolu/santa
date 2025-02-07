import type { Mountain } from "@/shared/constants";
import { MOUNTAIN_INFORMATION_LIST } from "@/shared/constants";
import { debounce } from "@/shared/lib";
import { useCallback, useEffect, useState } from "react";

export const useSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Mountain[] | null>(null);

  const performSearch = (keyword: string, array: any[]) => {
    const results = array.filter(({ name }) => {
      if (keyword === "") {
        return false;
      }
      if (name.includes(keyword)) {
        return true;
      }
    });
    return results;
  };

  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      const results = performSearch(keyword, MOUNTAIN_INFORMATION_LIST);
      setSearchResults(results);
    }, 500),
    []
  );

  const handleChange = (keyword: string) => {
    setSearchKeyword(keyword);
    debouncedSearch(keyword);
  };

  useEffect(() => {
    if (searchKeyword) {
      debouncedSearch(searchKeyword);
    } else {
      setSearchResults(null);
    }
  }, [searchKeyword, debouncedSearch]);

  return { searchKeyword, searchResults, handleChange };
};
