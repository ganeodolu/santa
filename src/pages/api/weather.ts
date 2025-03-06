import { filterAndExtractWeatherData } from "@/shared/model";
import { nextApiWithOpenAPI } from "@/shared/api/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { WEATHER_ENDPOINT } from "@/shared/constants";


export default async function weatherHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { gridX, gridY } = req.query;
    const filteredExtractedWeatherData = await filterAndExtractWeatherData(
      nextApiWithOpenAPI,
      WEATHER_ENDPOINT,
      Number(gridX),
      Number(gridY)
    );

    res.status(200).json(filteredExtractedWeatherData);
  } catch (error) {
    res.status(500).json(null);
  }
}
