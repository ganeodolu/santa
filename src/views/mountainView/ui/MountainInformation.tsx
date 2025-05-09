import type { Mountain } from "@/shared/constants";
import { visitedMountainAtom } from "@/shared/lib/visitedStorage";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";

type Props = {
  mountainData: Mountain;
};

const MountainInformation = ({ mountainData }: Props) => {
  const { name, englishName, height, peak, region, imageSrc, introduction } =
    mountainData;
  const visitedMountain = useAtomValue(visitedMountainAtom);
  const toggleVisitedMountain = useSetAtom(visitedMountainAtom);
  const handleCheck = (mountainEnglishName: string) => {
    toggleVisitedMountain((prev) => ({ ...prev, [mountainEnglishName]: !prev[mountainEnglishName] }));
  };

  return (
    <>
      <section className="mb-4 flex">
        <div className="w-[240px] overflow-hidden pr-4 pl-4">
          <Image
            className="h-[150px] rounded-lg object-cover"
            src={imageSrc}
            alt={name}
            width={208}
            height={150}
            quality={50}
          />
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <h1 className="mb-2 text-center text-2xl font-bold">{name}</h1>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-none p-0.5 text-center">높이</div>
            <div className="border-none p-0.5 text-center">
              <span className="font-semibold">
                {height.toLocaleString("en-US")}m
              </span>
            </div>
            <div className="border-none p-0.5 text-center">지역</div>
            <div className="border-none p-0.5 text-center">
              <span className="font-semibold">{region}</span>
            </div>
            <div className="border-none p-0.5 text-center">주요봉</div>
            <div className="border-none p-0.5 text-center">
              <span className="font-semibold">{peak}</span>
            </div>
            <div className="border-none p-0.5 text-center">
              <label htmlFor="visited">등산완료</label>
            </div>
            <div className="border-none p-0.5 text-center">
              <input
                id="visited"
                type="checkbox"
                name="visited"
                className="h-5 w-5 rounded-full"
                checked={visitedMountain[englishName]}
                onChange={() => handleCheck(englishName)}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="m-2">
        <h3 className="pr-2 pl-2 text-justify text-sm">{introduction}</h3>
      </section>
    </>
  );
};

export default MountainInformation;
