import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const HomeViewLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-[500px] bg-white shadow-md">{children}</div>
  );
};

export default HomeViewLayout;
