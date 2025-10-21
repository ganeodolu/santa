import SearchStickyHeaderWithBack from "@/features/Header/ui/SearchStickyHeaderWithBack";
import { useSearch } from "@/shared/model/useSearchKeyword";
import RecentKeyword from "@/views/searchView/ui/RecentKeyword";
import SearchResult from "@/views/searchView/ui/SearchResult";

const SearchView = () => {
  const { searchKeyword, searchResults, handleChange } = useSearch();

  return (
    <>
      <SearchStickyHeaderWithBack
        searchKeyword={searchKeyword}
        onChange={handleChange}
      />
      <section className="min-h-screen">
        <RecentKeyword />
        <SearchResult searchResults={searchResults} />
      </section>
    </>
  );
};

export default SearchView;
