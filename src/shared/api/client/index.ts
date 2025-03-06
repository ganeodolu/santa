import {
  CLIENT_ASTRONOMY_ENDPOINT,
  CLIENT_BASE_URL,
  CLIENT_WEATHER_ENDPOINT
} from "@/shared/constants";
import axios from "axios";

const apiWithOpenAPI = axios.create({
  baseURL: CLIENT_BASE_URL
});

export const getClientWeatherInformation = async (x: number, y: number) => {
  const response = await apiWithOpenAPI(CLIENT_WEATHER_ENDPOINT, {
    params: {
      gridX: x,
      gridY: y
    }
  });

  return response.data;
};

export const getClientAstronomyInformation = async (
  lat: number,
  lon: number
) => {
  const response = await apiWithOpenAPI(CLIENT_ASTRONOMY_ENDPOINT, {
    params: {
      lat,
      lon
    }
  });

  return response.data;
};
