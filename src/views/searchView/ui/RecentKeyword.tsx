import { recentKeywordListManagerAtom } from "@/shared/lib/listStorage";
import { useAtomValue } from "jotai";

type Props = {};

const RecentKeyword = (props: Props) => {
  const recentKeywordList = useAtomValue(recentKeywordListManagerAtom);

  return (
    <div className="border-b p-4">
      <h2 className="mb-2 text-lg font-semibold">최근 검색어</h2>
      <div className="flex flex-wrap gap-2">
        {recentKeywordList.map((keyword) => (
          <span
            className="rounded-full bg-gray-200 px-3 py-1 text-sm"
            key={keyword}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentKeyword;
