import {
  filterAndExtractWeatherData,
  forecastUTC9TimeTransformWithBufferHour
} from "@/shared/model";
import { nextApiWithOpenAPI } from "@/shared/api/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { WEATHER_ENDPOINT } from "@/shared/constants";


export default async function weatherHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { gridX, gridY } = req.query;
    const [baseDate, baseTime] = forecastUTC9TimeTransformWithBufferHour(0.5);
    const filteredExtractedWeatherData = await filterAndExtractWeatherData(
      nextApiWithOpenAPI,
      WEATHER_ENDPOINT,
      Number(gridX),
      Number(gridY),
      baseDate,
      baseTime
    );

    res.status(200).json(filteredExtractedWeatherData);
  } catch (error) {
    res.status(500).json(null);
  }
}
