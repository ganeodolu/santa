export const MOUNTAIN_NAMES = [
  "가야산",
  "계룡산",
  "내장산",
  "덕유산",
  "무등산",
  "북한산",
  "설악산",
  "소백산",
  "속리산",
  "오대산",
  "월악산",
  "월출산",
  "주왕산",
  "지리산",
  "치악산",
  "태백산",
  "팔공산",
  "한라산"
];

export interface Mountain {
  name: string;
  lat: number;
  lon: number;
  height: number;
  peak: string;
  region: string;
}

interface MountainInformation {
  [key: string]: Mountain;
}

export const MOUNTAIN_INFORMATION: MountainInformation = {
  gaya: {
    name: "가야산",
    lat: 35.8235606,
    lon: 128.12059,
    height: 1433,
    peak: "상왕봉",
    region: "경북"
  },
  gyeryong: {
    name: "계룡산",
    lat: 36.342348,
    lon: 127.206037,
    height: 845,
    peak: "천황봉",
    region: "충남"
  },
  naejang: {
    name: "내장산",
    lat: 35.478333,
    lon: 126.888989,
    height: 763,
    peak: "신선봉",
    region: "전북"
  },
  deogyu: {
    name: "덕유산",
    lat: 36.808116,
    lon: 127.388765,
    height: 1614,
    peak: "향적봉",
    region: "전북"
  },
  mudeung: {
    name: "무등산",
    lat: 35.12439,
    lon: 127.008744,
    height: 1186,
    peak: "천왕봉",
    region: "광주"
  },
  bukhan: {
    name: "북한산",
    lat: 37.6586301,
    lon: 126.9780032,
    height: 836,
    peak: "백운대",
    region: "서울"
  },
  seorak: {
    name: "설악산",
    lat: 38.11915,
    lon: 128.465313,
    height: 1708,
    peak: "대청봉",
    region: "강원"
  },
  sobaek: {
    name: "소백산",
    lat: 36.957474,
    lon: 128.484781,
    height: 1439,
    peak: "비로봉",
    region: "충북"
  },
  sokri: {
    name: "속리산",
    lat: 36.543174,
    lon: 127.870753,
    height: 1058,
    peak: "천왕봉",
    region: "충북"
  },
  odae: {
    name: "오대산",
    lat: 37.794454,
    lon: 128.543577,
    height: 1563,
    peak: "비로봉",
    region: "강원"
  },
  worak: {
    name: "월악산",
    lat: 36.885847,
    lon: 128.105988,
    height: 1094,
    peak: "영봉",
    region: "충북"
  },
  wolchul: {
    name: "월출산",
    lat: 34.766733,
    lon: 126.704172,
    height: 809,
    peak: "천황봉",
    region: "전남"
  },
  juwang: {
    name: "주왕산",
    lat: 36.389391,
    lon: 129.162375,
    height: 721,
    peak: "가매봉",
    region: "경북"
  },
  jiri: {
    name: "지리산",
    lat: 35.337091,
    lon: 127.730695,
    height: 1915,
    peak: "천왕봉",
    region: "전북"
  },
  chiak: {
    name: "치악산",
    lat: 37.365118,
    lon: 128.055561,
    height: 1288,
    peak: "비로봉",
    region: "강원"
  },
  taebaek: {
    name: "태백산",
    lat: 37.098885,
    lon: 128.91553,
    height: 1566,
    peak: "장군봉",
    region: "강원"
  },
  palgong: {
    name: "팔공산",
    lat: 36.016555,
    lon: 128.695354,
    height: 1192,
    peak: "비로봉",
    region: "경북"
  },
  halla: {
    name: "한라산",
    lat: 33.361747,
    lon: 126.529195,
    height: 1950,
    peak: "혈망봉",
    region: "제주"
  }
};
