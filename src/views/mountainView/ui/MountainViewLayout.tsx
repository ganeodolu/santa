import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MountainViewLayout = ({ children }: Props) => {
  return (
    <article className="container mx-auto max-w-[500px] bg-white shadow-md">
      {children}
    </article>
  );
};

export default MountainViewLayout
