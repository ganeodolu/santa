import GlobalLayout from "@/app/ui/GlobalLayout";
import SearchView from "@/views/searchView";
import { ReactNode } from "react";

const SearchPage = () => {
  return <SearchView />;
};

SearchPage.getLayout = (page: ReactNode) => <GlobalLayout>{page}</GlobalLayout>;

export default SearchPage;
