import BaseHeader from "@/shared/ui/Header/BaseHeader";
import SearchInput from "@/shared/ui/Header/SearchInput";
import BackButton from "@/shared/ui/Header/BackButton";

type SearchHeaderProps = {
  onInputClick: () => void;
};

const SearchHeaderWithBackNoFunction = ({ onInputClick }: SearchHeaderProps) => (
  <BaseHeader>
    <BackButton />
    <SearchInput
      value=""
      onChange={() => {}}
      onClick={onInputClick}
      isAutoFocused={false}
    />
  </BaseHeader>
);

export default SearchHeaderWithBackNoFunction;
