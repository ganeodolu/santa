import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SearchViewLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-[500px] rounded-lg bg-white shadow-md">
      {children}
    </div>
  );
};

export default SearchViewLayout;
