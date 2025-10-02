import Chart from "@/features/chart";
import {
  getClientAstronomyInformation,
  getClientWeatherInformation
} from "@/shared/api/client";
import type { Mountain } from "@/shared/constants";
import {
  forecastUTC9TimeTransformWithBufferHour,
  xyConvert
} from "@/shared/model";
import AstronomyInfoCard from "@/views/mountainView/ui/AstronomyInfoCard";
import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

dayjs.extend(utc);

const WeatherAndAstronomyData = ({
  mountainData
}: {
  mountainData: Mountain;
}) => {
  const { lat, lon } = mountainData;
  const { x, y } = xyConvert(lat, lon);
  const [
    {
      data: weatherData,
      isError: isWeatherDataError,
      isLoading: isWeatherDataLoading,
      error: weatherDataError
    },
    {
      data: astronomyData,
      isError: isAstronomyDataError,
      isLoading: isAstronomyDataLoading,
      error: astronomyDataError
    }
  ] = useQueries({
    queries: [
      {
        queryKey: [
          "getWeather",
          x,
          y,
          forecastUTC9TimeTransformWithBufferHour(0.5)
        ],
        queryFn: () => getClientWeatherInformation(x, y)
      },
      {
        queryKey: [
          "getAstronomy",
          lon,
          lat,
          dayjs().utc().utcOffset(9).format("YYYYMMDD")
        ],
        queryFn: () => getClientAstronomyInformation(lat, lon)
      }
    ]
  });

  if (isWeatherDataError) {
    throw weatherDataError;
  }
  if (isAstronomyDataError) {
    throw astronomyDataError;
  }

  return (
    <>
      <section className="mb-4 rounded-lg bg-white">
        <h2 className="mb-2 text-center text-2xl font-bold">날씨</h2>
        {isWeatherDataLoading ? (
          <Skeleton height={200} />
        ) : (
          <Chart
            weatherData={weatherData}
          />
        )}
      </section>
      <AstronomyInfoCard astronomyData={astronomyData} isAstronomyDataLoading={isAstronomyDataLoading} />
    </>
  );
};

export default WeatherAndAstronomyData;
