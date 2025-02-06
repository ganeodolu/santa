import type { Mountain } from "@/shared/constants";
import { recentKeywordListManagerAtom } from "@/shared/lib/listStorage";
import { useNavigation } from "@/shared/model/useNavigation";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { MouseEvent } from "react";

type Props = {
  searchResults: Mountain[] | null;
};

const SearchResult = ({ searchResults }: Props) => {
  const { navigateTo } = useNavigation();

  const addRecentKeywordList = useSetAtom(recentKeywordListManagerAtom);
  const handleResultClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const mountainInformation = target.closest(
      ".mountain-information"
    ) as HTMLElement;
    if (mountainInformation) {
      const mountainName = mountainInformation.dataset.mountainName;
      const mountainEnglishName =
        mountainInformation.dataset.mountainEnglishName;
      if (mountainName) {
        addRecentKeywordList(mountainName);
      }
      if (mountainEnglishName) {
        navigateTo(`/mountain/${mountainEnglishName}`);
      }
    }
  };

  if(searchResults === null) return null

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
      <ul className="space-y-2" onClick={handleResultClick}>
        {searchResults.map(
          ({ name, englishName, height, peak, region, pic }) => (
            <li
              key={peak}
              className="mountain-information flex cursor-pointer items-center rounded p-2 hover:bg-gray-100"
              data-mountain-name={name}
              data-mountain-english-name={englishName}
            >
              <Image
                className="mr-4 h-[60px] w-[60px] rounded-lg object-cover shadow-lg"
                src={pic}
                alt={name}
                width={60}
                height={60}
              />
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-gray-600">{`지역:` + region}</p>
                {/* <p className="text-sm text-gray-600">{"높이:" + height + "m"}</p>
              <p className="text-sm text-gray-600">{"최고봉:" + peak}</p> */}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SearchResult;
