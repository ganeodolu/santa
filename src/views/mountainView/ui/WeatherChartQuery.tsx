import Chart from "@/features/chart";
import { getClientWeatherInformation } from "@/shared/api/client";
import type { MountainData } from "@/shared/model";
import {
  forecastUTC9TimeTransformWithBufferHour,
  xyConvert
} from "@/shared/model";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

dayjs.extend(utc);

const WeatherChartQuery = ({ mountainData }: MountainData ) => {
  const { lat, lon } = mountainData;
  const { x, y } = xyConvert(lat, lon);
  const {
    data: weatherData,
    isError: isWeatherDataError,
    isLoading: isWeatherDataLoading,
    error: weatherDataError
  } = useQuery({
    queryKey: [
      "getWeather",
      x,
      y,
      forecastUTC9TimeTransformWithBufferHour(0.5)
    ],
    queryFn: () => getClientWeatherInformation(x, y)
  });

  if (isWeatherDataError) {
    throw weatherDataError;
  }

  return (
    <>
      {isWeatherDataLoading ? (
        <Skeleton height={200} />
      ) : (
        <Chart weatherData={weatherData} />
      )}
    </>
  );
};

export default WeatherChartQuery;
