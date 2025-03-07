import { ReactNode } from "react";

type BaseHeaderProps = {
  children: ReactNode;
};

const BaseStickyHeader = ({ children }: BaseHeaderProps) => (
  <header className="sticky top-0 bg-white shadow-md">
    <div className="container mx-auto px-4 py-4">
      <div className="relative flex items-center">{children}</div>
    </div>
  </header>
);

export default BaseStickyHeader;
