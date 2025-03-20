import type { Mountain } from "@/shared/constants";
import { recentKeywordListManagerAtom } from "@/shared/lib/listStorage";
import { useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

type Props = {
  searchResults: Mountain[] | null;
};

const SearchResult = ({ searchResults }: Props) => {
  const addRecentKeywordList = useSetAtom(recentKeywordListManagerAtom);
  const handleResultClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const mountainInformation = target.closest(
      ".mountain-information"
    ) as HTMLElement;
    if (mountainInformation) {
      const mountainName = mountainInformation.dataset.mountainName;
      if (mountainName) {
        addRecentKeywordList(mountainName);
      }
    }
  };

  if (searchResults === null) return null;

  if (searchResults.length === 0) {
    return (
      <div className="p-4">
        <h2 className="mb-2 text-lg font-semibold">검색 결과</h2>
        <p>산을 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-semibold">검색 결과</h2>
      <ul className="flex flex-col gap-y-2" onClick={handleResultClick}>
        {searchResults.map(
          ({ name, englishName, height, peak, region, imageSrc }) => (
            <Link
              key={englishName}
              className="mountain-information rounded"
              data-mountain-name={name}
              href={`/mountain/${englishName}`}
            >
              <figure className="flex items-center rounded-lg p-2 shadow-md hover:bg-gray-100">
                <Image
                  className="mr-4 h-[60px] w-[60px] rounded-lg object-cover shadow-lg"
                  src={imageSrc}
                  alt={name}
                  width={60}
                  height={60}
                  quality={30}
                />
                <span>
                  <h3 className="font-medium">{name}</h3>
                  <p className="flex gap-x-6 text-sm text-gray-600">
                    <span>{`지역 : ` + region}</span>
                    <span>
                      {"높이 : " + height.toLocaleString("en-US") + "m"}
                    </span>
                  </p>
                  {/* <p className="text-sm text-gray-600">{"최고봉:" + peak}</p> */}
                </span>
              </figure>
            </Link>
          )
        )}
      </ul>
    </div>
  );
};

export default SearchResult;
