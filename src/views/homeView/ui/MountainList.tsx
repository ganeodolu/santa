import type { Mountain } from "@/shared/constants";
import { useNavigation } from "@/shared/model/useNavigation";
import Image from "next/image";

type Props = {
  mountainList: Mountain[];
};

const MountainList = ({ mountainList }: Props) => {
  const { navigateTo } = useNavigation();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="-mx-2 flex flex-wrap">
        {mountainList.map(({ name, englishName, region, pic }) => (
          <div key={englishName} className="mb-4 w-1/2 px-2">
            <div
              className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
              onClick={() => navigateTo(`/mountain/${englishName}`)}
            >
              <Image
                className="h-[140px] rounded-lg object-cover shadow-lg"
                src={pic}
                alt={name}
                width={234}
                height={140}
              />
              <div className="flex items-center gap-2 p-4">
                <h3 className="text-lg font-bold">{name}</h3>
                <span className="text-gray-600">{region}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MountainList;
