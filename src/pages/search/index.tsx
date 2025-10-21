import GlobalLayout from "@/app/ui/GlobalLayout";
import SearchView from "@/views/searchView";
import SearchViewLayout from "@/views/searchView/ui/SearchViewLayout";
import { ReactNode } from "react";

const SearchPage = () => {
  return (
    <SearchViewLayout>
      <SearchView />
    </SearchViewLayout>
  );
};

SearchPage.getLayout = (page: ReactNode) => <GlobalLayout>{page}</GlobalLayout>;

export default SearchPage;
