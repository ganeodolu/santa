import { atomWithStorage } from "jotai/utils";

export const visitedMountainAtom = atomWithStorage<Record<string, boolean>>('visitedMountain', {
  "gaya": false,
  "gyeryong": false,
  "naejang": false,
  "deogyu": false,
  "mudeung": false,
  "bukhan": false,
  "seorak": false,
  "sobaek": false,
  "sokri": false,
  "odae": false,
  "worak": false,
  "wolchul": false,
  "juwang": false,
  "jiri": false,
  "chiak": false,
  "taebaek": false,
  "palgong": false,
  "halla": false,
});
