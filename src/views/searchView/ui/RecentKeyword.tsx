import { MOUNTAIN_KEYS, MOUNTAIN_NAMES } from "@/shared/constants";
import {
  recentKeywordListManagerAtom,
  removeKeywordAtom
} from "@/shared/lib/listStorage";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";

const RecentKeyword = () => {
  const recentKeywordList = useAtomValue(recentKeywordListManagerAtom);
  const removeKeyword = useSetAtom(removeKeywordAtom);

  return (
    <div className="h-24 border-b border-gray-300 p-4">
      <h2 className="mb-2 text-lg font-semibold">최근 검색어</h2>
      <div className="flex flex-wrap gap-2">
        {recentKeywordList.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Link
              className="px-3 py-1 text-sm"
              href={`/mountain/${MOUNTAIN_KEYS[MOUNTAIN_NAMES.indexOf(keyword)]}`}
            >
              {keyword}
            </Link>
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
