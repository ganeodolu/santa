import {
  ASTRONOMY_ENDPOINT,
  BASE_URL,
  WEATHER_ENDPOINT
} from "@/shared/constants";
import {
  extractAstronomyData,
  filterAndExtractWeatherData
} from "@/shared/model";
import axios from "axios";

export const basicApiWithOpenAPI = axios.create({
  baseURL: BASE_URL
});

export const getBasicWeatherInformation = async (x: number, y: number) => {
  return filterAndExtractWeatherData(
    basicApiWithOpenAPI,
    WEATHER_ENDPOINT,
    x,
    y
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
