import { ASTRONOMY_ENDPOINT } from "@/shared/constants";
import { nextApiWithOpenAPI } from "@/shared/api/next";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

type SunTime = {
  sunrise: string;
  sunset: string;
};

export default async function astronomyHandler(
  req: NextApiRequest,
  res: NextApiResponse<SunTime>
) {
  try {
    const { lat, lon } = req.query;
    const response = await nextApiWithOpenAPI(ASTRONOMY_ENDPOINT,{
      params: {
        ServiceKey: process.env.NEXT_PUBLIC_ASTRONOMY_API_KEY,
        latitude: lat,
        longitude: lon,
        dnYn: "Y",
        locdate: dayjs().format("YYYYMMDD")
      }
    });
    const { sunrise, sunset } = response.data.response.body.items.item;
    res.status(200).json({ sunrise: sunrise.trim(), sunset: sunset.trim() });
  } catch (error) {
    res.status(500).json({ sunrise: "데이터 없음", sunset: "데이터 없음" });
  }
}
