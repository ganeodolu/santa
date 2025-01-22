import SearchHeaderWithBack from "@/features/Header/ui/SearchHeaderWithBack";
import { useSearch } from "@/shared/model/useSearchKeyword";
import RecentKeyword from "@/views/searchView/ui/RecentKeyword";
import SearchResult from "@/views/searchView/ui/SearchResult";

type Props = {};

const SearchView = (props: Props) => {
  const { searchKeyword, searchResults, handleChange } = useSearch();

  return (
    <div className="mx-auto max-w-[500px] rounded-lg bg-white shadow-md">
      <SearchHeaderWithBack
        searchKeyword={searchKeyword}
        onChange={handleChange}
      />
      <section className="min-h-screen">
        <RecentKeyword />
        <SearchResult searchResults={searchResults} />
      </section>
    </div>
  );
};

export default SearchView;
