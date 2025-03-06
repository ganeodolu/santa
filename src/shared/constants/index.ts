export const BASE_URL = "https://apis.data.go.kr";

export const WEATHER_ENDPOINT =
  "/1360000/VilageFcstInfoService_2.0/getVilageFcst";

export const ASTRONOMY_ENDPOINT =
  "/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo";

export const CLIENT_BASE_URL = "/api";

export const CLIENT_WEATHER_ENDPOINT = "/weather";

export const CLIENT_ASTRONOMY_ENDPOINT = "/astronomy";

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
  imageSrc: string;
  cctv: {
    place: string | null;
    url: string | null;
  };
  introduction: string;
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
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/GayaSanghwangbong.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "경상남도와 경상북도에 걸친 산악형 국립공원으로, 1972년에 지정되었습니다. 상왕봉(1,430m)이 주봉이며, 해인사와 팔만대장경으로 유명합니다. 웅장한 바위 능선과 깊은 계곡이 어우러진 독특한 산세를 자랑하며, 수달, 삵, 담비 등 멸종위기종이 서식합니다. 노각나무, 단풍나무 등 다양한 식물군이 있어 사계절 아름다운 경관을 제공합니다."
  },
  gyeryong: {
    name: "계룡산",
    englishName: "gyeryong",
    lat: 36.342348,
    lon: 127.206037,
    height: 845,
    peak: "천황봉",
    region: "충남",
    imageSrc:
      "https://cdn.pixabay.com/photo/2021/04/30/01/48/mountain-6217756_1280.jpg",
    cctv: {
      place: "천황봉",
      url: "https://m.knps.or.kr/live/cctv16.do"
    },
    introduction:
      "1968년 우리나라에서 두 번째로 지정된 국립공원으로, 충청남도에 위치합니다. 면적은 65.335km²이며, 천황봉(847m)이 정상입니다. 동학사, 갑사 등 유서 깊은 사찰들이 있으며, 기암괴석과 계곡이 어우러진 아름다운 경관을 자랑합니다. 등산로가 잘 정비되어 있어 많은 등산객들이 찾는 명소입니다."
  },
  naejang: {
    name: "내장산",
    englishName: "naejang",
    lat: 35.478333,
    lon: 126.888989,
    height: 763,
    peak: "신선봉",
    region: "전북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2022/08/09/16/05/reservoir-7375340_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "전라북도에 위치한 산악형 국립공원으로, 가을 단풍으로 유명합니다. 내장사를 중심으로 형성된 국립공원으로, 단풍나무와 신갈나무 등이 울창한 숲을 이루고 있습니다. 백양사, 용굴암 등의 사찰과 함께 내장호, 금선계곡 등 다양한 자연 명소가 있어 사계절 관광객들의 발길이 끊이지 않습니다."
  },
  deogyu: {
    name: "덕유산",
    englishName: "deogyu",
    lat: 36.808116,
    lon: 127.388765,
    height: 1614,
    peak: "향적봉",
    region: "전북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2022/01/18/08/10/nature-6946555_1280.jpg",
    cctv: {
      place: "설천봉",
      url: "https://m.knps.or.kr/live/cctv10.do"
    },
    introduction:
      "전라북도와 경상남도에 걸친 산악형 국립공원입니다. 향적봉(1,614m)이 주봉으로, 무주리조트 스키장이 있어 겨울 레저 명소로 유명합니다. 구천동 계곡의 아름다운 풍경과 함께 다양한 야생 동식물의 서식지로 알려져 있습니다. 봄철 철쭉제가 유명하며, 사계절 내내 등산객들과 자연 애호가들이 찾는 곳입니다."
  },
  mudeung: {
    name: "무등산",
    englishName: "mudeung",
    lat: 35.12439,
    lon: 127.008744,
    height: 1186,
    peak: "천왕봉",
    region: "광주",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/06/18/04/43/sunrise-2414538_1280.jpg",
    cctv: {
      place: "장불재",
      url: "https://m.knps.or.kr/live/cctv15.do"
    },
    introduction:
      "광주광역시와 전라남도에 걸친 산악형 국립공원입니다. 도심과 가까워 접근성이 좋으며, 천왕봉(1,187m)이 주봉입니다. 입석대, 서석대 등 독특한 주상절리 지형이 특징이며, 충효동 계곡, 증심사 등 다양한 명소가 있습니다. 도시민들의 휴식처로 사랑받고 있으며, 역사적으로도 의미 있는 장소들이 많아 문화와 자연을 동시에 즐길 수 있는 곳입니다."
  },
  bukhan: {
    name: "북한산",
    englishName: "bukhan",
    lat: 37.6586301,
    lon: 126.9780032,
    height: 836,
    peak: "백운대",
    region: "서울",
    imageSrc:
      "https://cdn.pixabay.com/photo/2021/01/09/01/34/bukhansan-5901129_1280.jpg",
    cctv: {
      place: "백운대",
      url: "https://m.knps.or.kr/live/bukhan.do"
    },
    introduction:
      "서울특별시에 위치한 산악형 국립공원으로, 도심 속 자연을 즐길 수 있는 곳입니다. 백운대, 인수봉, 만경대 등 주요 봉우리들이 있으며, 북한산성의 역사적 유적과 함께 다양한 등산로가 조성되어 있습니다. 도시 생활에 지친 시민들에게 휴식과 힐링의 공간을 제공하며, 사계절 내내 많은 등산객들이 찾는 인기 있는 국립공원입니다."
  },
  seorak: {
    name: "설악산",
    englishName: "seorak",
    lat: 38.11915,
    lon: 128.465313,
    height: 1708,
    peak: "대청봉",
    region: "강원",
    imageSrc:
      "https://cdn.pixabay.com/photo/2019/10/30/07/41/mt-seoraksan-4588906_1280.jpg",
    cctv: {
      place: "울산바위",
      url: "https://m.knps.or.kr/live/seorak.do"
    },
    introduction:
      "강원도에 위치한 산악형 국립공원으로, 빼어난 경관으로 유명합니다. 대청봉(1,708m)을 중심으로 울산바위, 신흥사, 권금성, 비룡폭포 등 다양한 명소가 있습니다. 화강암 봉우리와 깊은 계곡, 울창한 숲이 어우러져 장엄한 자연 경관을 자랑합니다. 가을 단풍과 겨울 설경이 특히 아름다워 연중 많은 관광객들이 찾는 국립공원입니다."
  },
  sobaek: {
    name: "소백산",
    englishName: "sobaek",
    lat: 36.957474,
    lon: 128.484781,
    height: 1439,
    peak: "비로봉",
    region: "충북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2016/02/19/05/53/sobaeksan-1208755_1280.jpg",
    cctv: {
      place: "연화봉",
      url: "https://m.knps.or.kr/live/sobaek.do"
    },
    introduction:
      "경상북도와 충청북도에 걸친 산악형 국립공원입니다. 비로봉(1,439m)을 주봉으로 하며, 고산 식물과 야생화가 풍부하여 생태학적 가치가 높습니다. 죽령 고개, 희방사 등 역사적 명소와 함께 다양한 등산로가 조성되어 있어 등산객들에게 인기가 많습니다. 특히 겨울철 상고대 풍경이 유명하여 많은 사진작가들이 찾는 곳이기도 합니다."
  },
  sokri: {
    name: "속리산",
    englishName: "sokri",
    lat: 36.543174,
    lon: 127.870753,
    height: 1058,
    peak: "천왕봉",
    region: "충북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2020/06/17/11/38/songnisan-5309158_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "충청북도에 위치한 산악형 국립공원으로, 법주사 등 문화유적이 많습니다. 천왕봉(1,058m)을 중심으로 화양계곡, 문장대 등 아름다운 자연 경관을 자랑합니다. 법주사의 팔상전과 같은 불교 문화재와 함께 다양한 동식물이 서식하고 있어 자연과 문화를 동시에 체험할 수 있는 곳입니다."
  },
  odae: {
    name: "오대산",
    englishName: "odae",
    lat: 37.794454,
    lon: 128.543577,
    height: 1563,
    peak: "비로봉",
    region: "강원",
    imageSrc:
      "https://cdn.pixabay.com/photo/2019/01/02/04/02/monk-3907972_1280.jpg",
    cctv: {
      place: "두로령",
      url: "https://m.knps.or.kr/live/cctv11.do"
    },
    introduction:
      "강원도에 위치한 산악형 국립공원으로, 월정사 등 사찰과 생태계 보존으로 유명합니다. 비로봉(1,563m)을 중심으로 다섯 개의 봉우리가 있어 오대산이라 불립니다. 월정사 전나무 숲길, 상원사 등 불교 문화유산과 함께 다양한 야생동물과 식물이 서식하고 있어 생태 관광지로도 인기가 높습니다."
  },
  worak: {
    name: "월악산",
    englishName: "worak",
    lat: 36.885847,
    lon: 128.105988,
    height: 1094,
    peak: "영봉",
    region: "충북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2018/04/24/03/45/mountain-3346215_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "충청북도와 경상북도에 걸친 산악형 국립공원으로, 기암괴석과 계곡이 아름답습니다. 영봉(1,097m)을 중심으로 송계계곡, 단양 8경 등 수려한 자연 경관을 자랑합니다. 단양 쌍둥이 동굴, 고수동굴 등 독특한 지형과 함께 다양한 문화재가 있어 자연과 문화를 동시에 즐길 수 있는 곳입니다."
  },
  wolchul: {
    name: "월출산",
    englishName: "wolchul",
    lat: 34.766733,
    lon: 126.704172,
    height: 809,
    peak: "천황봉",
    region: "전남",
    imageSrc:
      "https://cdn.pixabay.com/photo/2019/11/22/06/40/mountain-4644223_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "전라남도에 위치한 산악형 국립공원으로, 기암절벽과 바위 능선이 특징적입니다. 천황봉(809m)을 중심으로 구정봉, 장군봉 등 독특한 형태의 봉우리들이 있습니다. 도갑사, 천황사 등 불교 문화유산과 함께 다도해의 아름다운 전망을 감상할 수 있어 많은 관광객들이 찾는 명소입니다."
  },
  juwang: {
    name: "주왕산",
    englishName: "juwang",
    lat: 36.389391,
    lon: 129.162375,
    height: 721,
    peak: "가매봉",
    region: "경북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2021/02/22/12/50/mt-juwang-6040101_1280.jpg",
    cctv: {
      place: "기암",
      url: "https://m.knps.or.kr/live/cctv9.do"
    },
    introduction:
      "경상북도에 위치한 산악형 국립공원으로, 깊은 계곡과 폭포가 유명합니다. 주왕봉(720m)을 중심으로 절벽과 계곡이 어우러진 아름다운 경관을 자랑합니다. 대전사, 주왕계곡, 주왕굴 등 다양한 명소가 있으며, 가을 단풍이 특히 아름다워 많은 관광객들이 찾는 곳입니다."
  },
  jiri: {
    name: "지리산",
    englishName: "jiri",
    lat: 35.337091,
    lon: 127.730695,
    height: 1915,
    peak: "천왕봉",
    region: "전북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2018/10/20/03/17/mistweaver-3760172_1280.jpg",
    cctv: {
      place: "장터목",
      url: "https://m.knps.or.kr/live/jiri.do"
    },
    introduction:
      "1967년 우리나라 최초로 지정된 국립공원으로, 전라남도, 전라북도, 경상남도에 걸쳐 있습니다. 천왕봉(1,915m)을 주봉으로 하는 한반도 남부의 최고봉으로, 다양한 생태계와 문화유산을 품고 있습니다. 화엄사, 쌍계사 등 유서 깊은 사찰들과 함께 반달가슴곰 등 멸종위기 동물들의 서식지로도 유명합니다."
  },
  chiak: {
    name: "치악산",
    englishName: "chiak",
    lat: 37.365118,
    lon: 128.055561,
    height: 1288,
    peak: "비로봉",
    region: "강원",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Chiaksan_as_seen_from_Maldeungbawi_Observatory.jpg",
    cctv: {
      place: "상원사",
      url: "https://m.knps.or.kr/live/cctv17.do"
    },
    introduction:
      "강원도에 위치한 산악형 국립공원으로, 구룡사와 비로봉이 유명합니다. 비로봉(1,288m)을 중심으로 다양한 등산로가 조성되어 있으며, 구룡폭포, 사고대 등 아름다운 자연 경관을 자랑합니다. 원주 지역의 대표적인 산으로, 사계절 내내 등산객들과 관광객들이 찾는 인기 있는 국립공원입니다."
  },
  taebaek: {
    name: "태백산",
    englishName: "taebaek",
    lat: 37.098885,
    lon: 128.91553,
    height: 1566,
    peak: "장군봉",
    region: "강원",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/02/24/07/26/taebaek-2094135_1280.jpg",
    cctv: {
      place: "천제단",
      url: "https://m.knps.or.kr/live/cctv6.do"
    },
    introduction:
      "강원도와 경상북도에 걸친 산악형 국립공원으로, 고산 식물과 눈꽃이 아름답습니다. 천제봉(1,567m)을 주봉으로 하며, 태백산 천제단, 구문소 등 역사적 명소와 함께 다양한 고산 식물들이 서식하고 있습니다. 겨울철 설경이 특히 아름다워 많은 관광객들이 찾으며, 태백산 눈축제로도 유명합니다."
  },
  palgong: {
    name: "팔공산",
    englishName: "palgong",
    lat: 36.016555,
    lon: 128.695354,
    height: 1192,
    peak: "비로봉",
    region: "경북",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/%ED%8C%94%EA%B3%B5%EC%82%B0_%EB%8F%99%EB%B4%89_%EC%84%9D%EB%B6%88%EC%83%81.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "2023년 12월 31일에 지정된 가장 최근의 국립공원으로, 대구광역시와 경상북도에 걸쳐 있습니다. 비로봉(1,192m)을 중심으로 동화사, 파계사 등 유서 깊은 사찰들과 함께 다양한 등산로가 조성되어 있습니다. 대구 시민들의 휴식처로 사랑받고 있으며, 역사적으로도 중요한 의미를 지닌 산으로 알려져 있습니다."
  },
  halla: {
    name: "한라산",
    englishName: "halla",
    lat: 33.361747,
    lon: 126.529195,
    height: 1950,
    peak: "혈망봉",
    region: "제주",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/04/22/08/50/winter-2250856_1280.jpg",
    cctv: {
      place: "백록담",
      url: "https://www.jeju.go.kr/tool/halla/cctv_01.html"
    },
    introduction:
      "제주특별자치도에 위치한 산악형 국립공원으로, 대한민국 최고봉(1,950m)입니다. 화산활동으로 형성된 독특한 지형과 다양한 식생대가 특징이며, 백록담, 영실기암 등 아름다운 자연 경관을 자랑합니다. 제주도의 상징적인 존재로, 유네스코 세계자연유산으로 지정되어 있어 전 세계적으로 주목받는 국립공원입니다."
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
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/GayaSanghwangbong.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "경상남도와 경상북도에 걸친 산악형 국립공원으로, 1972년에 지정되었습니다. 상왕봉(1,430m)이 주봉이며, 해인사와 팔만대장경으로 유명합니다. 웅장한 바위 능선과 깊은 계곡이 어우러진 독특한 산세를 자랑하며, 수달, 삵, 담비 등 멸종위기종이 서식합니다. 노각나무, 단풍나무 등 다양한 식물군이 있어 사계절 아름다운 경관을 제공합니다."
  },
  {
    name: "계룡산",
    englishName: "gyeryong",
    lat: 36.342348,
    lon: 127.206037,
    height: 845,
    peak: "천황봉",
    region: "충남",
    imageSrc:
      "https://cdn.pixabay.com/photo/2021/04/30/01/48/mountain-6217756_1280.jpg",
    cctv: {
      place: "천황봉",
      url: "https://m.knps.or.kr/live/cctv16.do"
    },
    introduction:
      "1968년 우리나라에서 두 번째로 지정된 국립공원으로, 충청남도에 위치합니다. 면적은 65.335km²이며, 천황봉(847m)이 정상입니다. 동학사, 갑사 등 유서 깊은 사찰들이 있으며, 기암괴석과 계곡이 어우러진 아름다운 경관을 자랑합니다. 등산로가 잘 정비되어 있어 많은 등산객들이 찾는 명소입니다."
  },
  {
    name: "내장산",
    englishName: "naejang",
    lat: 35.478333,
    lon: 126.888989,
    height: 763,
    peak: "신선봉",
    region: "전북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2022/08/09/16/05/reservoir-7375340_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "전라북도에 위치한 산악형 국립공원으로, 가을 단풍으로 유명합니다. 내장사를 중심으로 형성된 국립공원으로, 단풍나무와 신갈나무 등이 울창한 숲을 이루고 있습니다. 백양사, 용굴암 등의 사찰과 함께 내장호, 금선계곡 등 다양한 자연 명소가 있어 사계절 관광객들의 발길이 끊이지 않습니다."
  },
  {
    name: "덕유산",
    englishName: "deogyu",
    lat: 36.808116,
    lon: 127.388765,
    height: 1614,
    peak: "향적봉",
    region: "전북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2022/01/18/08/10/nature-6946555_1280.jpg",
    cctv: {
      place: "설천봉",
      url: "https://m.knps.or.kr/live/cctv10.do"
    },
    introduction:
      "전라북도와 경상남도에 걸친 산악형 국립공원입니다. 향적봉(1,614m)이 주봉으로, 무주리조트 스키장이 있어 겨울 레저 명소로 유명합니다. 구천동 계곡의 아름다운 풍경과 함께 다양한 야생 동식물의 서식지로 알려져 있습니다. 봄철 철쭉제가 유명하며, 사계절 내내 등산객들과 자연 애호가들이 찾는 곳입니다."
  },
  {
    name: "무등산",
    englishName: "mudeung",
    lat: 35.12439,
    lon: 127.008744,
    height: 1186,
    peak: "천왕봉",
    region: "광주",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/06/18/04/43/sunrise-2414538_1280.jpg",
    cctv: {
      place: "장불재",
      url: "https://m.knps.or.kr/live/cctv15.do"
    },
    introduction:
      "광주광역시와 전라남도에 걸친 산악형 국립공원입니다. 도심과 가까워 접근성이 좋으며, 천왕봉(1,187m)이 주봉입니다. 입석대, 서석대 등 독특한 주상절리 지형이 특징이며, 충효동 계곡, 증심사 등 다양한 명소가 있습니다. 도시민들의 휴식처로 사랑받고 있으며, 역사적으로도 의미 있는 장소들이 많아 문화와 자연을 동시에 즐길 수 있는 곳입니다."
  },
  {
    name: "북한산",
    englishName: "bukhan",
    lat: 37.6586301,
    lon: 126.9780032,
    height: 836,
    peak: "백운대",
    region: "서울",
    imageSrc:
      "https://cdn.pixabay.com/photo/2021/01/09/01/34/bukhansan-5901129_1280.jpg",
    cctv: {
      place: "백운대",
      url: "https://m.knps.or.kr/live/bukhan.do"
    },
    introduction:
      "서울특별시에 위치한 산악형 국립공원으로, 도심 속 자연을 즐길 수 있는 곳입니다. 백운대, 인수봉, 만경대 등 주요 봉우리들이 있으며, 북한산성의 역사적 유적과 함께 다양한 등산로가 조성되어 있습니다. 도시 생활에 지친 시민들에게 휴식과 힐링의 공간을 제공하며, 사계절 내내 많은 등산객들이 찾는 인기 있는 국립공원입니다."
  },
  {
    name: "설악산",
    englishName: "seorak",
    lat: 38.11915,
    lon: 128.465313,
    height: 1708,
    peak: "대청봉",
    region: "강원",
    imageSrc:
      "https://cdn.pixabay.com/photo/2019/10/30/07/41/mt-seoraksan-4588906_1280.jpg",
    cctv: {
      place: "울산바위",
      url: "https://m.knps.or.kr/live/seorak.do"
    },
    introduction:
      "강원도에 위치한 산악형 국립공원으로, 빼어난 경관으로 유명합니다. 대청봉(1,708m)을 중심으로 울산바위, 신흥사, 권금성, 비룡폭포 등 다양한 명소가 있습니다. 화강암 봉우리와 깊은 계곡, 울창한 숲이 어우러져 장엄한 자연 경관을 자랑합니다. 가을 단풍과 겨울 설경이 특히 아름다워 연중 많은 관광객들이 찾는 국립공원입니다."
  },
  {
    name: "소백산",
    englishName: "sobaek",
    lat: 36.957474,
    lon: 128.484781,
    height: 1439,
    peak: "비로봉",
    region: "충북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2016/02/19/05/53/sobaeksan-1208755_1280.jpg",
    cctv: {
      place: "연화봉",
      url: "https://m.knps.or.kr/live/sobaek.do"
    },
    introduction:
      "경상북도와 충청북도에 걸친 산악형 국립공원입니다. 비로봉(1,439m)을 주봉으로 하며, 고산 식물과 야생화가 풍부하여 생태학적 가치가 높습니다. 죽령 고개, 희방사 등 역사적 명소와 함께 다양한 등산로가 조성되어 있어 등산객들에게 인기가 많습니다. 특히 겨울철 상고대 풍경이 유명하여 많은 사진작가들이 찾는 곳이기도 합니다."
  },
  {
    name: "속리산",
    englishName: "sokri",
    lat: 36.543174,
    lon: 127.870753,
    height: 1058,
    peak: "천왕봉",
    region: "충북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2020/06/17/11/38/songnisan-5309158_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "충청북도에 위치한 산악형 국립공원으로, 법주사 등 문화유적이 많습니다. 천왕봉(1,058m)을 중심으로 화양계곡, 문장대 등 아름다운 자연 경관을 자랑합니다. 법주사의 팔상전과 같은 불교 문화재와 함께 다양한 동식물이 서식하고 있어 자연과 문화를 동시에 체험할 수 있는 곳입니다."
  },
  {
    name: "오대산",
    englishName: "odae",
    lat: 37.794454,
    lon: 128.543577,
    height: 1563,
    peak: "비로봉",
    region: "강원",
    imageSrc:
      "https://cdn.pixabay.com/photo/2019/01/02/04/02/monk-3907972_1280.jpg",
    cctv: {
      place: "두로령",
      url: "https://m.knps.or.kr/live/cctv11.do"
    },
    introduction:
      "강원도에 위치한 산악형 국립공원으로, 월정사 등 사찰과 생태계 보존으로 유명합니다. 비로봉(1,563m)을 중심으로 다섯 개의 봉우리가 있어 오대산이라 불립니다. 월정사 전나무 숲길, 상원사 등 불교 문화유산과 함께 다양한 야생동물과 식물이 서식하고 있어 생태 관광지로도 인기가 높습니다."
  },
  {
    name: "월악산",
    englishName: "worak",
    lat: 36.885847,
    lon: 128.105988,
    height: 1094,
    peak: "영봉",
    region: "충북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2018/04/24/03/45/mountain-3346215_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "충청북도와 경상북도에 걸친 산악형 국립공원으로, 기암괴석과 계곡이 아름답습니다. 영봉(1,097m)을 중심으로 송계계곡, 단양 8경 등 수려한 자연 경관을 자랑합니다. 단양 쌍둥이 동굴, 고수동굴 등 독특한 지형과 함께 다양한 문화재가 있어 자연과 문화를 동시에 즐길 수 있는 곳입니다."
  },
  {
    name: "월출산",
    englishName: "wolchul",
    lat: 34.766733,
    lon: 126.704172,
    height: 809,
    peak: "천황봉",
    region: "전남",
    imageSrc:
      "https://cdn.pixabay.com/photo/2019/11/22/06/40/mountain-4644223_1280.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "전라남도에 위치한 산악형 국립공원으로, 기암절벽과 바위 능선이 특징적입니다. 천황봉(809m)을 중심으로 구정봉, 장군봉 등 독특한 형태의 봉우리들이 있습니다. 도갑사, 천황사 등 불교 문화유산과 함께 다도해의 아름다운 전망을 감상할 수 있어 많은 관광객들이 찾는 명소입니다."
  },
  {
    name: "주왕산",
    englishName: "juwang",
    lat: 36.389391,
    lon: 129.162375,
    height: 721,
    peak: "가매봉",
    region: "경북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2021/02/22/12/50/mt-juwang-6040101_1280.jpg",
    cctv: {
      place: "기암",
      url: "https://m.knps.or.kr/live/cctv9.do"
    },
    introduction:
      "경상북도에 위치한 산악형 국립공원으로, 깊은 계곡과 폭포가 유명합니다. 주왕봉(720m)을 중심으로 절벽과 계곡이 어우러진 아름다운 경관을 자랑합니다. 대전사, 주왕계곡, 주왕굴 등 다양한 명소가 있으며, 가을 단풍이 특히 아름다워 많은 관광객들이 찾는 곳입니다."
  },
  {
    name: "지리산",
    englishName: "jiri",
    lat: 35.337091,
    lon: 127.730695,
    height: 1915,
    peak: "천왕봉",
    region: "전북",
    imageSrc:
      "https://cdn.pixabay.com/photo/2018/10/20/03/17/mistweaver-3760172_1280.jpg",
    cctv: {
      place: "장터목",
      url: "https://m.knps.or.kr/live/jiri.do"
    },
    introduction:
      "1967년 우리나라 최초로 지정된 국립공원으로, 전라남도, 전라북도, 경상남도에 걸쳐 있습니다. 천왕봉(1,915m)을 주봉으로 하는 한반도 남부의 최고봉으로, 다양한 생태계와 문화유산을 품고 있습니다. 화엄사, 쌍계사 등 유서 깊은 사찰들과 함께 반달가슴곰 등 멸종위기 동물들의 서식지로도 유명합니다."
  },
  {
    name: "치악산",
    englishName: "chiak",
    lat: 37.365118,
    lon: 128.055561,
    height: 1288,
    peak: "비로봉",
    region: "강원",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Chiaksan_as_seen_from_Maldeungbawi_Observatory.jpg",
    cctv: {
      place: "상원사",
      url: "https://m.knps.or.kr/live/cctv17.do"
    },
    introduction:
      "강원도에 위치한 산악형 국립공원으로, 구룡사와 비로봉이 유명합니다. 비로봉(1,288m)을 중심으로 다양한 등산로가 조성되어 있으며, 구룡폭포, 사고대 등 아름다운 자연 경관을 자랑합니다. 원주 지역의 대표적인 산으로, 사계절 내내 등산객들과 관광객들이 찾는 인기 있는 국립공원입니다."
  },
  {
    name: "태백산",
    englishName: "taebaek",
    lat: 37.098885,
    lon: 128.91553,
    height: 1566,
    peak: "장군봉",
    region: "강원",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/02/24/07/26/taebaek-2094135_1280.jpg",
    cctv: {
      place: "천제단",
      url: "https://m.knps.or.kr/live/cctv6.do"
    },
    introduction:
      "강원도와 경상북도에 걸친 산악형 국립공원으로, 고산 식물과 눈꽃이 아름답습니다. 천제봉(1,567m)을 주봉으로 하며, 태백산 천제단, 구문소 등 역사적 명소와 함께 다양한 고산 식물들이 서식하고 있습니다. 겨울철 설경이 특히 아름다워 많은 관광객들이 찾으며, 태백산 눈축제로도 유명합니다."
  },
  {
    name: "팔공산",
    englishName: "palgong",
    lat: 36.016555,
    lon: 128.695354,
    height: 1192,
    peak: "비로봉",
    region: "경북",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/%ED%8C%94%EA%B3%B5%EC%82%B0_%EB%8F%99%EB%B4%89_%EC%84%9D%EB%B6%88%EC%83%81.jpg",
    cctv: {
      place: null,
      url: null
    },
    introduction:
      "2023년 12월 31일에 지정된 가장 최근의 국립공원으로, 대구광역시와 경상북도에 걸쳐 있습니다. 비로봉(1,192m)을 중심으로 동화사, 파계사 등 유서 깊은 사찰들과 함께 다양한 등산로가 조성되어 있습니다. 대구 시민들의 휴식처로 사랑받고 있으며, 역사적으로도 중요한 의미를 지닌 산으로 알려져 있습니다."
  },
  {
    name: "한라산",
    englishName: "halla",
    lat: 33.361747,
    lon: 126.529195,
    height: 1950,
    peak: "혈망봉",
    region: "제주",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/04/22/08/50/winter-2250856_1280.jpg",
    cctv: {
      place: "백록담",
      url: "https://www.jeju.go.kr/tool/halla/cctv_01.html"
    },
    introduction:
      "제주특별자치도에 위치한 산악형 국립공원으로, 대한민국 최고봉(1,950m)입니다. 화산활동으로 형성된 독특한 지형과 다양한 식생대가 특징이며, 백록담, 영실기암 등 아름다운 자연 경관을 자랑합니다. 제주도의 상징적인 존재로, 유네스코 세계자연유산으로 지정되어 있어 전 세계적으로 주목받는 국립공원입니다."
  }
];
