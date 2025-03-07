import BackButton from "@/shared/ui/Header/BackButton";
import BaseStickyHeader from "@/shared/ui/Header/BaseStickyHeader";
import HomeButton from "@/shared/ui/Header/HomeButton";
import SearchInput from "@/shared/ui/Header/SearchInput";

type SearchHeaderWithBackProps = {
  searchKeyword: string;
  onChange: (value: string) => void;
};

const SearchStickyHeaderWithBack = ({
  searchKeyword,
  onChange
}: SearchHeaderWithBackProps) => (
  <BaseStickyHeader>
    <BackButton />
    <HomeButton href={"/"} />
    <SearchInput
      value={searchKeyword}
      onChange={onChange}
      isAutoFocused={true}
    />
  </BaseStickyHeader>
);

export default SearchStickyHeaderWithBack;
