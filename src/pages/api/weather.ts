import {
  extractWeatherData,
  timeTransformWithBufferHour
} from "@/shared/model";
import { apiWithWeather } from "@/views/mountainView/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function weatherHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { gridX, gridY } = req.query;
    const [base_date, base_time] = timeTransformWithBufferHour(0.5);
    const response = await apiWithWeather({
      params: {
        serviceKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        numOfRows: "300",
        pageNo: "1",
        base_date,
        base_time,
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
    res.status(200).json(filteredExtractedWeatherData);
  } catch (error) {
    res.status(500).json(null);
  }
}
