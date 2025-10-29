import { DEFAULT_URL } from "@/shared/constants";
import MetaTags from "@/shared/ui/MetaTags";
import SearchView from "@/views/searchView";

const SearchPage = () => {
  return (
    <>
      <MetaTags
        title={`산 찾기`}
        description={"전국에 있는 국립공원을 찾아보세요!"}
        keywords={`검색, 국립공원, 산, 날씨, 위치, 지도, CCTV`}
        url={`${DEFAULT_URL}/search`}
      />
      <SearchView />;
    </>
  );
};

export default SearchPage;
