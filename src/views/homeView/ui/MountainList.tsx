import React from 'react'
import Image from "next/image";
import type { Mountain } from "@/shared/constants";

type Props = {
  mountainList: Mountain[];
}

const MountainList = ({ mountainList }: Props) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="-mx-2 flex flex-wrap">
        {mountainList.map(({ name, englishName, region, pic }) => (
          <div key={englishName} className="mb-4 w-1/2 px-2">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <Image
                className="h-[160px] rounded-lg object-cover shadow-lg"
                src={pic}
                alt={name}
                width={234}
                height={160}
              />
              <div className="p-4 flex items-center gap-2">
                <h3 className="text-lg font-bold">{name}</h3>
                <span className="text-gray-600">{region}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MountainList
