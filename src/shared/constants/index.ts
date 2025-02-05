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

export const MOUNTAIN_KEYS = [
  "gaya",
  "gyeryong",
  "naejang",
  "deogyu",
  "mudeung",
  "bukhan",
  "seorak",
  "sobaek",
  "sokri",
  "odae",
  "worak",
  "wolchul",
  "juwang",
  "jiri",
  "chiak",
  "taebaek",
  "palgong",
  "halla"
];

export interface Mountain {
  name: string;
  englishName: string;
  lat: number;
  lon: number;
  height: number;
  peak: string;
  region: string;
  pic: string;
}

interface MountainInformation {
  [key: string]: Mountain;
}

export const MOUNTAIN_INFORMATION: MountainInformation = {
  gaya: {
    name: "가야산",
    englishName: "gaya",
    lat: 35.8235606,
    lon: 128.12059,
    height: 1433,
    peak: "상왕봉",
    region: "경북",
    pic: "https://upload.wikimedia.org/wikipedia/commons/0/0b/GayaSanghwangbong.jpg"
  },
  gyeryong: {
    name: "계룡산",
    englishName: "gyeryong",
    lat: 36.342348,
    lon: 127.206037,
    height: 845,
    peak: "천황봉",
    region: "충남",
    pic: "https://cdn.pixabay.com/photo/2021/04/30/01/48/mountain-6217756_1280.jpg"
  },
  naejang: {
    name: "내장산",
    englishName: "naejang",
    lat: 35.478333,
    lon: 126.888989,
    height: 763,
    peak: "신선봉",
    region: "전북",
    pic: "https://cdn.pixabay.com/photo/2022/08/09/16/05/reservoir-7375340_1280.jpg"
  },
  deogyu: {
    name: "덕유산",
    englishName: "deogyu",
    lat: 36.808116,
    lon: 127.388765,
    height: 1614,
    peak: "향적봉",
    region: "전북",
    pic: "https://cdn.pixabay.com/photo/2022/01/18/08/10/nature-6946555_1280.jpg"
  },
  mudeung: {
    name: "무등산",
    englishName: "mudeung",
    lat: 35.12439,
    lon: 127.008744,
    height: 1186,
    peak: "천왕봉",
    region: "광주",
    pic: "https://cdn.pixabay.com/photo/2017/06/18/04/43/sunrise-2414538_1280.jpg"
  },
  bukhan: {
    name: "북한산",
    englishName: "bukhan",
    lat: 37.6586301,
    lon: 126.9780032,
    height: 836,
    peak: "백운대",
    region: "서울",
    pic: "https://cdn.pixabay.com/photo/2021/01/09/01/34/bukhansan-5901129_1280.jpg"
  },
  seorak: {
    name: "설악산",
    englishName: "seorak",
    lat: 38.11915,
    lon: 128.465313,
    height: 1708,
    peak: "대청봉",
    region: "강원",
    pic: "https://cdn.pixabay.com/photo/2019/10/30/07/41/mt-seoraksan-4588906_1280.jpg"
  },
  sobaek: {
    name: "소백산",
    englishName: "sobaek",
    lat: 36.957474,
    lon: 128.484781,
    height: 1439,
    peak: "비로봉",
    region: "충북",
    pic: "https://cdn.pixabay.com/photo/2016/02/19/05/53/sobaeksan-1208755_1280.jpg"
  },
  sokri: {
    name: "속리산",
    englishName: "sokri",
    lat: 36.543174,
    lon: 127.870753,
    height: 1058,
    peak: "천왕봉",
    region: "충북",
    pic: "https://cdn.pixabay.com/photo/2020/06/17/11/38/songnisan-5309158_1280.jpg"
  },
  odae: {
    name: "오대산",
    englishName: "odae",
    lat: 37.794454,
    lon: 128.543577,
    height: 1563,
    peak: "비로봉",
    region: "강원",
    pic: "https://cdn.pixabay.com/photo/2019/01/02/04/02/monk-3907972_1280.jpg"
  },
  worak: {
    name: "월악산",
    englishName: "worak",
    lat: 36.885847,
    lon: 128.105988,
    height: 1094,
    peak: "영봉",
    region: "충북",
    pic: "https://cdn.pixabay.com/photo/2018/04/24/03/45/mountain-3346215_1280.jpg"
  },
  wolchul: {
    name: "월출산",
    englishName: "wolchul",
    lat: 34.766733,
    lon: 126.704172,
    height: 809,
    peak: "천황봉",
    region: "전남",
    pic: "https://cdn.pixabay.com/photo/2019/11/22/06/40/mountain-4644223_1280.jpg"
  },
  juwang: {
    name: "주왕산",
    englishName: "juwang",
    lat: 36.389391,
    lon: 129.162375,
    height: 721,
    peak: "가매봉",
    region: "경북",
    pic: "https://cdn.pixabay.com/photo/2021/02/22/12/50/mt-juwang-6040101_1280.jpg"
  },
  jiri: {
    name: "지리산",
    englishName: "jiri",
    lat: 35.337091,
    lon: 127.730695,
    height: 1915,
    peak: "천왕봉",
    region: "전북",
    pic: "https://cdn.pixabay.com/photo/2018/10/20/03/17/mistweaver-3760172_1280.jpg"
  },
  chiak: {
    name: "치악산",
    englishName: "chiak",
    lat: 37.365118,
    lon: 128.055561,
    height: 1288,
    peak: "비로봉",
    region: "강원",
    pic: "https://upload.wikimedia.org/wikipedia/commons/8/80/Chiaksan_as_seen_from_Maldeungbawi_Observatory.jpg"
  },
  taebaek: {
    name: "태백산",
    englishName: "taebaek",
    lat: 37.098885,
    lon: 128.91553,
    height: 1566,
    peak: "장군봉",
    region: "강원",
    pic: "https://cdn.pixabay.com/photo/2017/02/24/07/26/taebaek-2094135_1280.jpg"
  },
  palgong: {
    name: "팔공산",
    englishName: "palgong",
    lat: 36.016555,
    lon: 128.695354,
    height: 1192,
    peak: "비로봉",
    region: "경북",
    pic: "https://upload.wikimedia.org/wikipedia/commons/2/2e/%ED%8C%94%EA%B3%B5%EC%82%B0_%EB%8F%99%EB%B4%89_%EC%84%9D%EB%B6%88%EC%83%81.jpg"
  },
  halla: {
    name: "한라산",
    englishName: "halla",
    lat: 33.361747,
    lon: 126.529195,
    height: 1950,
    peak: "혈망봉",
    region: "제주",
    pic: "https://cdn.pixabay.com/photo/2017/04/22/08/50/winter-2250856_1280.jpg"
  }
};

export const MOUNTAIN_INFORMATION_LIST: Mountain[] = [
  {
    name: "가야산",
    englishName: "gaya",
    lat: 35.8235606,
    lon: 128.12059,
    height: 1433,
    peak: "상왕봉",
    region: "경북",
    pic: "https://upload.wikimedia.org/wikipedia/commons/0/0b/GayaSanghwangbong.jpg"
  },
  {
    name: "계룡산",
    englishName: "gyeryong",
    lat: 36.342348,
    lon: 127.206037,
    height: 845,
    peak: "천황봉",
    region: "충남",
    pic: "https://cdn.pixabay.com/photo/2021/04/30/01/48/mountain-6217756_1280.jpg"
  },
  {
    name: "내장산",
    englishName: "naejang",
    lat: 35.478333,
    lon: 126.888989,
    height: 763,
    peak: "신선봉",
    region: "전북",
    pic: "https://cdn.pixabay.com/photo/2022/08/09/16/05/reservoir-7375340_1280.jpg"
  },
  {
    name: "덕유산",
    englishName: "deogyu",
    lat: 36.808116,
    lon: 127.388765,
    height: 1614,
    peak: "향적봉",
    region: "전북",
    pic: "https://cdn.pixabay.com/photo/2022/01/18/08/10/nature-6946555_1280.jpg"
  },
  {
    name: "무등산",
    englishName: "mudeung",
    lat: 35.12439,
    lon: 127.008744,
    height: 1186,
    peak: "천왕봉",
    region: "광주",
    pic: "https://cdn.pixabay.com/photo/2017/06/18/04/43/sunrise-2414538_1280.jpg"
  },
  {
    name: "북한산",
    englishName: "bukhan",
    lat: 37.6586301,
    lon: 126.9780032,
    height: 836,
    peak: "백운대",
    region: "서울",
    pic: "https://cdn.pixabay.com/photo/2021/01/09/01/34/bukhansan-5901129_1280.jpg"
  },
  {
    name: "설악산",
    englishName: "seorak",
    lat: 38.11915,
    lon: 128.465313,
    height: 1708,
    peak: "대청봉",
    region: "강원",
    pic: "https://cdn.pixabay.com/photo/2019/10/30/07/41/mt-seoraksan-4588906_1280.jpg"
  },
  {
    name: "소백산",
    englishName: "sobaek",
    lat: 36.957474,
    lon: 128.484781,
    height: 1439,
    peak: "비로봉",
    region: "충북",
    pic: "https://cdn.pixabay.com/photo/2016/02/19/05/53/sobaeksan-1208755_1280.jpg"
  },
  {
    name: "속리산",
    englishName: "sokri",
    lat: 36.543174,
    lon: 127.870753,
    height: 1058,
    peak: "천왕봉",
    region: "충북",
    pic: "https://cdn.pixabay.com/photo/2020/06/17/11/38/songnisan-5309158_1280.jpg"
  },
  {
    name: "오대산",
    englishName: "odae",
    lat: 37.794454,
    lon: 128.543577,
    height: 1563,
    peak: "비로봉",
    region: "강원",
    pic: "https://cdn.pixabay.com/photo/2019/01/02/04/02/monk-3907972_1280.jpg"
  },
  {
    name: "월악산",
    englishName: "worak",
    lat: 36.885847,
    lon: 128.105988,
    height: 1094,
    peak: "영봉",
    region: "충북",
    pic: "https://cdn.pixabay.com/photo/2018/04/24/03/45/mountain-3346215_1280.jpg"
  },
  {
    name: "월출산",
    englishName: "wolchul",
    lat: 34.766733,
    lon: 126.704172,
    height: 809,
    peak: "천황봉",
    region: "전남",
    pic: "https://cdn.pixabay.com/photo/2019/11/22/06/40/mountain-4644223_1280.jpg"
  },
  {
    name: "주왕산",
    englishName: "juwang",
    lat: 36.389391,
    lon: 129.162375,
    height: 721,
    peak: "가매봉",
    region: "경북",
    pic: "https://cdn.pixabay.com/photo/2021/02/22/12/50/mt-juwang-6040101_1280.jpg"
  },
  {
    name: "지리산",
    englishName: "jiri",
    lat: 35.337091,
    lon: 127.730695,
    height: 1915,
    peak: "천왕봉",
    region: "전북",
    pic: "https://cdn.pixabay.com/photo/2018/10/20/03/17/mistweaver-3760172_1280.jpg"
  },
  {
    name: "치악산",
    englishName: "chiak",
    lat: 37.365118,
    lon: 128.055561,
    height: 1288,
    peak: "비로봉",
    region: "강원",
    pic: "https://upload.wikimedia.org/wikipedia/commons/8/80/Chiaksan_as_seen_from_Maldeungbawi_Observatory.jpg"
  },
  {
    name: "태백산",
    englishName: "taebaek",
    lat: 37.098885,
    lon: 128.91553,
    height: 1566,
    peak: "장군봉",
    region: "강원",
    pic: "https://cdn.pixabay.com/photo/2017/02/24/07/26/taebaek-2094135_1280.jpg"
  },
  {
    name: "팔공산",
    englishName: "palgong",
    lat: 36.016555,
    lon: 128.695354,
    height: 1192,
    peak: "비로봉",
    region: "경북",
    pic: "https://upload.wikimedia.org/wikipedia/commons/2/2e/%ED%8C%94%EA%B3%B5%EC%82%B0_%EB%8F%99%EB%B4%89_%EC%84%9D%EB%B6%88%EC%83%81.jpg"
  },
  {
    name: "한라산",
    englishName: "halla",
    lat: 33.361747,
    lon: 126.529195,
    height: 1950,
    peak: "혈망봉",
    region: "제주",
    pic: "https://cdn.pixabay.com/photo/2017/04/22/08/50/winter-2250856_1280.jpg"
  }
];

