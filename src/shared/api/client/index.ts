import {
  NEXT_ASTRONOMY_ENDPOINT,
  NEXT_BASE_URL,
  NEXT_WEATHER_ENDPOINT
} from "@/shared/constants";
import axios from "axios";

const apiWithOpenAPI = axios.create({
  baseURL: NEXT_BASE_URL
});

export const getWeatherInformation = async (x: number, y: number) => {
  const response = await apiWithOpenAPI(NEXT_WEATHER_ENDPOINT, {
    params: {
      gridX: x,
      gridY: y
    }
  });

  return response.data;
};

export const getAstronomyInformation = async (lat: number, lon: number) => {
  const response = await apiWithOpenAPI(NEXT_ASTRONOMY_ENDPOINT, {
    params: {
      lat,
      lon
    }
  });

  return response.data;
};
