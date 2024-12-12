interface IndexSignatureConvertGrid {
  [i: string]: number;
}

export const xyConvert = (v1: number, v2: number) => {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기1준점 Y좌표(GRID)
  const DEGRAD = Math.PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  let rs: IndexSignatureConvertGrid = {};

  rs["lat"] = v1;
  rs["lon"] = v2;
  let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = v2 * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;
  rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return rs;
};

const FORECAST_TIME_NUMBER_ARRAY = [
  200, 500, 800, 1100, 1400, 1700, 2000, 2300
];

const FORECAST_TIME_STRING_ARRAY = [
  "0200",
  "0500",
  "0800",
  "1100",
  "1400",
  "1700",
  "2000",
  "2300"
];

export const timeTransformWithBufferHour = (beforeHour: number) => {
  let current = new Date(Date.now() - 1000 * 60 * 60 * beforeHour);
  let time: number = current.getHours() * 100;
  let resultTime;
  if (time < 200) {
    current = new Date(current.setDate(current.getDate() - 1));
    resultTime = String(2300);
  } else {
    const closestIndex = FORECAST_TIME_NUMBER_ARRAY.findIndex((val) => {
      return time - 300 <= val;
    });
    resultTime = FORECAST_TIME_STRING_ARRAY[closestIndex];
  }
  let resultDate = current
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")
    .split(".")
    .toString();

  return [resultDate, resultTime];
};

// 600개 날씨정보
export const MOCKING_WEATHER_DATA = [
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "3.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "303",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "3.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "30",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "1500",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "2.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "-1.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "304",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "3.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "35",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "1600",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "-1.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "312",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "2.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "40",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "1700",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "-1.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "322",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "2.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "1800",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "-1.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "326",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "1.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "50",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "1900",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "-1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "315",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "1.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "50",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "2000",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "315",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "50",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "2100",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "-0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "315",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "55",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "2200",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "315",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "60",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241208",
    fcstTime: "2300",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "311",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "60",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0000",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "310",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "65",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0100",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "321",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0200",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "0.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "333",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0300",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "-3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "0.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "342",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0400",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "-3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "0.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "338",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0500",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "-3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "0.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "349",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMN",
    fcstDate: "20241209",
    fcstTime: "0600",
    fcstValue: "-3.0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "-3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "360",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0700",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "-3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "-0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "14",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0800",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "-0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "14",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "60",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "0900",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "0.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "342",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "50",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1000",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "320",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1100",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "-0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "311",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1200",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "-0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "305",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1300",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "294",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1400",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "-0.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "274",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "50",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMX",
    fcstDate: "20241209",
    fcstTime: "1500",
    fcstValue: "6.0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "-0.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "288",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "55",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1600",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "306",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "60",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1700",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "326",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "65",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1800",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "0.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "342",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "1900",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "11",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "70",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "2000",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "360",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "2100",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "0.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "-0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "339",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "2200",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "329",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241209",
    fcstTime: "2300",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "-1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "328",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0000",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "321",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0100",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "325",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0200",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "-1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "331",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0300",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "-1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "336",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0400",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "333",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0500",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "0.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "343",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "80",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMN",
    fcstDate: "20241210",
    fcstTime: "0600",
    fcstValue: "-2.0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "0.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "-0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "354",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "80",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0700",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "-2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "-0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "80",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0800",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "-1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "-0.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "-0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "22",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "75",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "0900",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "60",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "1000",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "-0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "326",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "50",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "1100",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "-0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "315",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "1200",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "-0.9",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "312",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "1.3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "3",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "20",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "1300",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "1.1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "-0.8",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "306",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "1.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "30",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "1400",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "1",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "-0.7",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "305",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "1.2",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "30",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WAV",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "-999",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PCP",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "강수없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "REH",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "45",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SNO",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "적설없음",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMX",
    fcstDate: "20241210",
    fcstTime: "1500",
    fcstValue: "7.0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "TMP",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "UUU",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "0.5",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VVV",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "-0.4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "VEC",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "309",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "WSD",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "0.6",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "SKY",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "4",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "PTY",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "0",
    nx: 60,
    ny: 127
  },
  {
    baseDate: "20241208",
    baseTime: "1400",
    category: "POP",
    fcstDate: "20241210",
    fcstTime: "1600",
    fcstValue: "30",
    nx: 60,
    ny: 127
  }
];
