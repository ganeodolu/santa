import { timeTransformWithBufferHour } from "@/shared/model";
import { apiWithWeather } from "./main";

export const getWeatherInformation = async (x: number, y: number) => {
  const [base_date, base_time] = timeTransformWithBufferHour(0.5);
  console.log(base_time)
  const response = await apiWithWeather({
    params: {
      serviceKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      numOfRows: "600",
      pageNo: "1",
      base_date,
      base_time,
      // base_date: "20241205",
      // base_time: "2000",
      nx: x,
      ny: y,
      dataType: "JSON"
    }
  });

  return response.data.response.body.items.item;
};
