import type { Mountain } from "@/shared/constants";
import { recentKeywordListManagerAtom } from "@/shared/lib/listStorage";
import { useSetAtom } from "jotai";
import { MouseEvent } from "react";

type Props = {
  searchResults: Mountain[];
};

const SearchResult = ({ searchResults }: Props) => {
  const addRecentKeywordList = useSetAtom(recentKeywordListManagerAtom);
  const handleResultClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const mountainInformation = target.closest(
      ".mountain-information"
    ) as HTMLElement;
    console.log(mountainInformation);
    if (mountainInformation) {
      const mountainName = mountainInformation.dataset.mountainName;
      console.log(mountainName);
      if (mountainName) {
        addRecentKeywordList(mountainName);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-semibold">검색 결과</h2>
      <ul className="space-y-2" onClick={handleResultClick}>
        {searchResults.map(({ name, height, peak, region }) => (
          <li
            key={peak}
            className="mountain-information flex items-center rounded p-2 hover:bg-gray-100"
            data-mountain-name={name}
          >
            <img
              src={`https://picsum.photos/40/40`}
              alt="결과 이미지"
              className="mr-3 h-10 w-10 rounded"
            />
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-600">{`지역:` + region}</p>
              {/* <p className="text-sm text-gray-600">{"높이:" + height + "m"}</p>
              <p className="text-sm text-gray-600">{"최고봉:" + peak}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
