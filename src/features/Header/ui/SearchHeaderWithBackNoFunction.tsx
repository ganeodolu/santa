import BackButton from "@/shared/ui/Header/BackButton";
import BaseHeader from "@/shared/ui/Header/BaseHeader";
import SearchInput from "@/shared/ui/Header/SearchInput";
import Link from "next/link";
import HomeButton from "@/shared/ui/Header/HomeButton";

type Props = {
  href: string;
};

const SearchHeaderWithBackNoFunction = ({ href }: Props) => (
  <BaseHeader>
    <BackButton />
    <HomeButton href={"/"} />
    <Link href={href} className="w-full">
      <SearchInput isAutoFocused={false} />
    </Link>
  </BaseHeader>
);

export default SearchHeaderWithBackNoFunction;
