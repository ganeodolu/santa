import { MOUNTAIN_KEYS } from "@/shared/constants";
import {
  recentKeywordListManagerAtom,
  removeKeywordAtom
} from "@/shared/lib/listStorage";
import { useNavigation } from "@/shared/model/useNavigation";
import { useAtomValue, useSetAtom } from "jotai";
import { MouseEvent } from "react";
import { MOUNTAIN_NAMES } from "./../../../shared/constants/index";

type Props = {};

const RecentKeyword = (props: Props) => {
  const recentKeywordList = useAtomValue(recentKeywordListManagerAtom);
  const removeKeyword = useSetAtom(removeKeywordAtom);
  const { navigateTo } = useNavigation();

  const handleMountainNameClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.textContent) {
      const mountainName = target.textContent.slice(0, 3);
      const mountainEnglishName =
        MOUNTAIN_KEYS[MOUNTAIN_NAMES.indexOf(mountainName)];
      navigateTo(`/mountain/${mountainEnglishName}`);
    }
  };

  return (
    <div className="h-24 border-b border-gray-300 p-4">
      <h2 className="mb-2 text-lg font-semibold">최근 검색어</h2>
      <div className="flex flex-wrap gap-2">
        {recentKeywordList.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <span
              className="cursor-pointer px-3 py-1 text-sm"
              onClick={handleMountainNameClick}
            >
              {keyword}
            </span>
            <button
              className="mr-2 text-lg font-bold text-gray-400 hover:text-gray-800"
              aria-label="검색어 삭제"
              onClick={() => removeKeyword(keyword)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentKeyword;
