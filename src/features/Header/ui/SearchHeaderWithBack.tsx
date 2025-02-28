import BackButton from "@/shared/ui/Header/BackButton";
import BaseHeader from "@/shared/ui/Header/BaseHeader";
import HomeButton from "@/shared/ui/Header/HomeButton";
import SearchInput from "@/shared/ui/Header/SearchInput";

type SearchHeaderWithBackProps = {
  searchKeyword: string;
  onChange: (value: string) => void;
};

const SearchHeaderWithBack = ({
  searchKeyword,
  onChange,
}: SearchHeaderWithBackProps) => (
  <BaseHeader>
    <BackButton />
    <HomeButton href={"/"} />
    <SearchInput
      value={searchKeyword}
      onChange={onChange}
      isAutoFocused={true}
    />
  </BaseHeader>
);

export default SearchHeaderWithBack;
