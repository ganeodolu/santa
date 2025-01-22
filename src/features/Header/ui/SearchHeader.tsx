import BaseHeader from "@/shared/ui/Header/BaseHeader";
import SearchInput from "@/shared/ui/Header/SearchInput";

type SearchHeaderProps = {
  onInputClick: () => void;
};

const SearchHeader = ({ onInputClick }: SearchHeaderProps) => (
  <BaseHeader>
    <SearchInput value="" onChange={() => {}} onClick={onInputClick} />
  </BaseHeader>
);

export default SearchHeader;
