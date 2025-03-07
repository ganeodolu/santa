import { ReactNode } from "react";

type BaseFixedHeaderProps = {
  children: ReactNode;
};

const BaseHeader = ({ children }: BaseFixedHeaderProps) => {
  return (
    <header className={`bg-white shadow-md`}>
      <div className="container mx-auto p-2">
        <div className="relative flex items-center">{children}</div>
      </div>
    </header>
  );
};

export default BaseHeader;
