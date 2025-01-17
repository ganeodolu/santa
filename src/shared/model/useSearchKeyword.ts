import { useState, useEffect, useCallback } from "react";
import { debounce } from '@/shared/lib';
import { MOUNTAIN_INFORMATION } from "@/shared/constants";
import type { Mountain } from "@/shared/constants";

export const useSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Mountain[]>([])

  const performSearch = (keyword: string, array: any[]) => {
    const results = array.filter(({ name }) => {
      if (keyword === "") {
        return false;
      }
      if (name.includes(keyword)) {
        return true;
      }
    });
    return results
  } 

  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      console.log("검색어:", keyword);
      const results = performSearch(
        keyword,
        Object.values(MOUNTAIN_INFORMATION)
      );
      setSearchResults(results)

    }, 500),
    []
  );

  const handleChange = (keyword: string) => {
    setSearchKeyword(keyword);
    debouncedSearch(keyword);
  };

  useEffect(() => {
    if (searchKeyword) {
      debouncedSearch(searchKeyword)
    } else {
      setSearchResults([])
    }

  }, [searchKeyword, debouncedSearch])
  

  return { searchKeyword, searchResults, handleChange };
};
