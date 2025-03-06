import { nextApiWithOpenAPI } from "@/shared/api/next";
import { ASTRONOMY_ENDPOINT } from "@/shared/constants";
import { extractAstronomyData } from "@/shared/model";
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
    const extractedAstronomyData = await extractAstronomyData(
      nextApiWithOpenAPI,
      ASTRONOMY_ENDPOINT,
      Number(lat),
      Number(lon)
    );

    res.status(200).json(extractedAstronomyData);
  } catch (error) {
    res.status(500).json({ sunrise: "데이터 없음", sunset: "데이터 없음" });
  }
}
