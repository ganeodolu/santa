import BackButton from "@/shared/ui/Header/BackButton";
import BaseStickyHeader from "@/shared/ui/Header/BaseStickyHeader";
import HomeButton from "@/shared/ui/Header/HomeButton";
import SearchInput from "@/shared/ui/Header/SearchInput";
import Link from "next/link";

type Props = {
  href: string;
};

const SearchStickyHeaderWithBackNoFunction = ({ href }: Props) => (
  <BaseStickyHeader>
    <BackButton />
    <HomeButton href={"/"} />
    <Link href={href} className="w-full">
      <SearchInput isAutoFocused={false} />
    </Link>
  </BaseStickyHeader>
);

export default SearchStickyHeaderWithBackNoFunction;
