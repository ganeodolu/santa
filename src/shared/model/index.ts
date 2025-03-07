import { AxiosInstance } from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

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

const FORECAST_HOUR_NUMBER_ARRAY = [2, 5, 8, 11, 14, 17, 20, 23];

export const forecastUTC9TimeTransformWithBufferHour = (beforeHour: number) => {
  const currentUTC9withBuffer = dayjs()
    .utc()
    .utcOffset(9)
    .subtract(beforeHour, "hour");
  const currentUTC9withBufferHour = currentUTC9withBuffer.hour();

  if (currentUTC9withBufferHour < 2) {
    // 현재 시간이 첫 예보시간인 2시 이전
    const forecastDate = currentUTC9withBuffer
      .subtract(1, "day")
      .hour(23)
      .minute(0);

    return [forecastDate.format("YYYYMMDD"), forecastDate.format("HHmm")];
  }
  if (currentUTC9withBufferHour >= 2) {
    // 현재 시간이 첫 예보시간인 2시 이후
    const forecastHour = FORECAST_HOUR_NUMBER_ARRAY.find(
      (FORECAST_HOUR) => currentUTC9withBufferHour < FORECAST_HOUR + 3
    );
    if (forecastHour !== undefined) {
      const forecastDate = currentUTC9withBuffer.hour(forecastHour).minute(0);

      return [forecastDate.format("YYYYMMDD"), forecastDate.format("HHmm")];
    }
  }
  console.log("error");

  return ["", ""];
};

type Weather = {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
};

type ExtractedWeather = {
  timestamp: string;
  [key: string]: string | number;
};

type ExtractWeatherData = (
  data: Weather[],
  weatherTypeArray: string[]
) => ExtractedWeather[];

export const extractWeatherData: ExtractWeatherData = (
  data,
  weatherTypeArray
) => {
  const extractedWeatherData: ExtractedWeather[] = [];

  const lastWeatherData = data.reduce(
    (
      acc: ExtractedWeather | null,
      { category, fcstDate, fcstTime, fcstValue }
    ) => {
      const currentDateTime = fcstDate + fcstTime;

      if (!acc || acc.timestamp !== currentDateTime) {
        if (acc) extractedWeatherData.push(acc);
        acc = { timestamp: currentDateTime };
      }

      if (weatherTypeArray.includes(category)) {
        acc[category] = Number(fcstValue);
      }

      return acc;
    },
    null
  );

  if (lastWeatherData) {
    extractedWeatherData.push(lastWeatherData);
  }

  return extractedWeatherData;
};

export const filterAndExtractWeatherData = async (
  axiosInstance: AxiosInstance,
  endPoint: string,
  gridX: number,
  gridY: number,
  baseDate: string,
  baseTime: string
) => {
  const response = await axiosInstance(endPoint, {
    params: {
      serviceKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      numOfRows: "300",
      pageNo: "1",
      base_date: baseDate,
      base_time: baseTime,
      nx: gridX,
      ny: gridY,
      dataType: "JSON"
    }
  });
  const extractedWeatherData = extractWeatherData(
    response.data.response.body.items.item,
    [
      "TMP",
      "SKY",
      "POP",
      "PTY"
      // "WSD",
      // "PCP"
    ]
  );
  const filteredExtractedWeatherData = extractedWeatherData.filter(
    (_, idx) => idx % 3 === 0
  );

  return filteredExtractedWeatherData;
};

export const extractAstronomyData = async (
  axiosInstance: AxiosInstance,
  endPoint: string,
  lat: number,
  lon: number
) => {
  const response = await axiosInstance(endPoint, {
    params: {
      ServiceKey: process.env.NEXT_PUBLIC_ASTRONOMY_API_KEY,
      latitude: lat,
      longitude: lon,
      dnYn: "Y",
      locdate: dayjs().utc().utcOffset(9).format("YYYYMMDD")
    }
  });
  const { sunrise, sunset } = response.data.response.body.items.item;

  return {
    sunrise: dayjs(sunrise.trim(), "HHmm").format("A hh:mm"),
    sunset: dayjs(sunset.trim(), "HHmm").format("A hh:mm")
  };
};
