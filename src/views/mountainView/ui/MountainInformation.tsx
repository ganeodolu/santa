import type { Mountain } from "@/shared/constants";
import Image from "next/image";

type Props = {
  mountainData: Mountain;
};

const MountainInformation = ({ mountainData }: Props) => {
  const { name, height, peak, region, imageSrc, introduction } = mountainData;

  return (
    <>
      <section className="mb-4 flex">
        <div className="w-[240px] overflow-hidden pr-4 pl-4">
          <Image
            className="h-[140px] rounded-lg object-cover"
            src={imageSrc}
            alt={name}
            width={196}
            height={140}
          />
        </div>
        <div className="flex w-1/3 flex-col justify-center pl-4">
          <h1 className="mb-2 text-2xl font-bold">{name}</h1>
          <p className="mb-1">
            높이:{" "}
            <span className="font-semibold">
              {height.toLocaleString("en-US")}m
            </span>
          </p>
          <p className="mb-1">
            지역: <span className="font-semibold">{region}</span>
          </p>
          <p className="mb-1">
            주요봉: <span className="font-semibold">{peak}</span>
          </p>
        </div>
      </section>
      <section className="m-2">
        <h3 className="pr-2 pl-2 text-justify text-sm">{introduction}</h3>
      </section>
    </>
  );
};

export default MountainInformation;
