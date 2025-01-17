import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const recentKeywordListAtom = atomWithStorage<string[]>('recentKeywordList', []);

export const recentKeywordListManagerAtom = atom(
  (get) => get(recentKeywordListAtom),
  (get, set, newKeyword: string) => {
    const currentKeywordList = get(recentKeywordListAtom);
    const updatedKeywordList = [
      newKeyword,
      ...currentKeywordList.filter((search) => search !== newKeyword),
    ].slice(0, 5);
    set(recentKeywordListAtom, updatedKeywordList);
  }
);

export const removeKeywordAtom = atom(null, (get, set, keywordToRemove: string) => {
  const currentKeywordList = get(recentKeywordListAtom);
  const updatedKeywordList = currentKeywordList.filter((keyword) => keyword !== keywordToRemove);
  set(recentKeywordListAtom, updatedKeywordList);
});
