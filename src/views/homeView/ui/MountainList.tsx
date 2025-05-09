import type { Mountain } from "@/shared/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  mountainList: Mountain[];
};

const MountainList = ({ mountainList }: Props) => {
  return (
    <section className="container mx-auto px-4 pt-4 pb-12">
      <div className="-mx-2 flex flex-wrap">
        {mountainList.map(({ name, englishName, region, imageSrc }) => (
          <div key={englishName} className="mb-4 w-1/2 px-2">
            <Link href={`/mountain/${englishName}`}>
              <figure className="overflow-hidden rounded-lg bg-white shadow-md">
                <Image
                  className="h-[140px] w-[226px] rounded-lg object-cover"
                  src={imageSrc}
                  alt={name}
                  width={226}
                  height={140}
                  quality={50}
                />
                <div className="flex items-center gap-2 p-3">
                  <h3 className="text-lg font-bold">{name}</h3>
                  <span className="text-gray-600">{region}</span>
                </div>
              </figure>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MountainList;
