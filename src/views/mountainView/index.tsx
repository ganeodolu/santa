import type { weatherDataProps } from "@/entities/chart/ui";
import {
  CustomTooltip,
  CustomizedDot,
  formatXAxis,
  generateYAxisTicks
} from "@/entities/chart/ui";
import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import SearchHeaderWithBackNoFunction from "@/features/Header/ui/SearchHeaderWithBackNoFunction";
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
import CCTVExternalLink from "@/views/mountainView/ui/CCTVExternalLink";
import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import MountainInformation from "./ui/MountainInformation";

dayjs.extend(utc);

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton height="h-[40vh]" />
  }
);

type Props = {
  mountainData: Mountain;
};

const MountainView = ({ mountainData }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { name, lat, lon, englishName, cctv } = mountainData;
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <article className="container mx-auto max-w-[500px] bg-white shadow-md">
      <SearchHeaderWithBackNoFunction href={"/search"} />
      <section className="mb-4">
        {isMounted && (
          <div className="mx-auto">
            <LeafletMapWithNoSSR
              center={[lat, lon]}
              height={"40vh"}
              zoom={13}
              markerNames={[name]}
              markerEnglishNames={[englishName]}
              markerPositions={[[lat, lon]]}
            />
          </div>
        )}
      </section>
      <MountainInformation mountainData={mountainData} />
      <section className="mb-4 rounded-lg bg-white">
        <h2 className="mb-2 text-center text-2xl font-bold">날씨</h2>
        {isWeatherDataLoading ? (
          <Skeleton height={200} />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={weatherData}>
              <CartesianGrid
                horizontal={true}
                vertical={true}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="timestamp"
                interval={0}
                tickFormatter={formatXAxis}
              />
              <YAxis
                type="number"
                yAxisId="TMP"
                domain={["dataMin - 10", "dataMax + 2"]}
                interval={0}
                ticks={generateYAxisTicks(
                  weatherData as weatherDataProps[],
                  "TMP",
                  -5,
                  2
                )}
                tick={{ fill: "#ee1b1b" }}
                label={{ value: "°C", position: "insideTopLeft" }}
                orientation="left"
              />
              <YAxis
                yAxisId="POP"
                domain={[0, 400]}
                ticks={[0, 100]}
                tick={{ fill: "#3236a8" }}
                label={{ value: "%", position: "insideTopLeft" }}
                orientation="right"
              />
              <Tooltip content={CustomTooltip} />
              <Legend />
              <Line
                yAxisId="TMP"
                type="monotone"
                dataKey="TMP"
                stroke="#ee1b1b"
                name="기온 (°C)"
                dot={CustomizedDot}
                animationDuration={0}
              />
              <Bar
                yAxisId="POP"
                type="monotone"
                dataKey="POP"
                fill="#3236a8"
                name="강수확률 (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </section>
      <AstronomyInfoCard astronomyData={astronomyData} />
      <CCTVExternalLink cctv={cctv} />
    </article>
  );
};

export default MountainView;
