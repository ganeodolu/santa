import type { Mountain } from "@/shared/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  mountainInfo: Mountain;
};

const MountainInfoBar = ({
  mountainInfo: { name, englishName, imageSrc, region, height }
}: Props) => {
  return (
    <Link
      className="fixed right-0 bottom-0 left-0 z-[1000] mx-auto flex h-30 max-w-[500px] items-center bg-white p-4 shadow-lg"
      href={`/mountain/${englishName}`}
    >
      <div className="relative mr-4 h-[100px] w-[200px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          layout="fill"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="w-2/3">
        <h2 className="mb-2 text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{region}</p>
        <p className="text-gray-600"> {height.toLocaleString("en-US")}m</p>
      </div>
    </Link>
  );
};

export default MountainInfoBar;
