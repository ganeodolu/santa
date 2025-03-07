import BaseStickyHeader from "@/shared/ui/Header/BaseStickyHeader";
import SearchInput from "@/shared/ui/Header/SearchInput";
import Link from "next/link";

type Props = {
  href: string;
};

const SearchStickyHeader = ({ href }: Props) => (
  <BaseStickyHeader>
    <Link href={href} className="w-full">
      <SearchInput isAutoFocused={false} />
    </Link>
  </BaseStickyHeader>
);

export default SearchStickyHeader;
