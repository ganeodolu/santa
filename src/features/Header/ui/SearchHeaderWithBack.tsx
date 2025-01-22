import BackButton from "@/shared/ui/Header/BackButton";
import BaseHeader from "@/shared/ui/Header/BaseHeader";
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
    <SearchInput
      value={searchKeyword}
      onChange={onChange}
    />
  </BaseHeader>
);

export default SearchHeaderWithBack;
