type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  isAutoFocused: boolean;
};

const SearchInput = ({
  value = "",
  onChange = () => {},
  isAutoFocused
}: SearchInputProps) => (
  <search className="relative flex-grow">
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-text rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="산 찾기"
      autoFocus={isAutoFocused}
    />
    <div className="absolute top-2 left-3">
      <svg
        className="h-6 w-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </search>
);

export default SearchInput;
