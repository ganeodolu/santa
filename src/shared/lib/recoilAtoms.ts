import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const mountainIndexState = atom({
  key: "mountainIndex",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});
