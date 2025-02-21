import Image from "next/image";
import type { Mountain } from "@/shared/constants";

type Props = {
  mountainInfo: Mountain;
};

const MountainInfoBar = ({ mountainInfo: { name, imageSrc, region, height } }: Props) => {
  return (
    <section className="fixed right-0 bottom-0 left-0 z-[1000] mx-auto flex h-30 max-w-[500px] items-center bg-white p-4 shadow-lg">
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
    </section>
  );
}

export default MountainInfoBar
