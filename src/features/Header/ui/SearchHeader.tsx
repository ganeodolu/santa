import BaseHeader from "@/shared/ui/Header/BaseHeader";
import SearchInput from "@/shared/ui/Header/SearchInput";
import Link from "next/link";

type Props = {
  href: string;
};

const SearchHeader = ({ href }: Props) => (
  <BaseHeader>
    <Link href={href}>
      <SearchInput isAutoFocused={false} />
    </Link>
  </BaseHeader>
);

export default SearchHeader;
