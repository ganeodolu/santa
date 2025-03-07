import {
  ASTRONOMY_ENDPOINT,
  BASE_URL,
  WEATHER_ENDPOINT
} from "@/shared/constants";
import {
  extractAstronomyData,
  filterAndExtractWeatherData,
  forecastUTC9TimeTransformWithBufferHour
} from "@/shared/model";
import axios from "axios";

export const basicApiWithOpenAPI = axios.create({
  baseURL: BASE_URL
});

export const getBasicWeatherInformation = async (x: number, y: number) => {
  const [baseDate, baseTime] = forecastUTC9TimeTransformWithBufferHour(0.5);

  return filterAndExtractWeatherData(
    basicApiWithOpenAPI,
    WEATHER_ENDPOINT,
    x,
    y,
    baseDate,
    baseTime
  );
};

export const getBasicAstronomyInformation = async (
  lat: number,
  lon: number
) => {
  return extractAstronomyData(
    basicApiWithOpenAPI,
    ASTRONOMY_ENDPOINT,
    lat,
    lon
  );
};
