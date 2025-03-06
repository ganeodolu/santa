import type { weatherDataProps } from "@/entities/chart/ui";
import {
  CustomTooltip,
  CustomizedDot,
  formatXAxis,
  generateYAxisTicks
} from "@/entities/chart/ui";
import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import {
  getAstronomyInformation,
  getWeatherInformation
} from "@/shared/api/client";
import type { Mountain } from "@/shared/constants";
import { timeTransformWithBufferHour, xyConvert } from "@/shared/model";
import AstronomyInfoCard from "@/views/mountainView/ui/AstronomyInfoCard";
import CCTVExternalLink from "@/views/mountainView/ui/CCTVExternalLink";
import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
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
  const {
    name,
    lat,
    lon,
    height,
    peak,
    region,
    imageSrc,
    englishName,
    cctv,
    introduction
  } = mountainData;
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
        queryKey: ["getWeather", x, y, timeTransformWithBufferHour(0.5)],
        queryFn: () => getWeatherInformation(x, y)
      },
      {
        queryKey: ["getAstronomy", lon, lat, dayjs().format("YYYYMMDD")],
        queryFn: () => getAstronomyInformation(lat, lon)
      }
    ]
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <article className="container mx-auto max-w-[500px] bg-white shadow-md">
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
              isShowBackButton={true}
            />
          </div>
        )}
      </section>
      <section className="mb-4 flex">
        <div className="w-[240px] overflow-hidden pr-4 pl-4">
          <Image
            className="h-[140px] rounded-lg object-cover"
            src={imageSrc}
            alt={name}
            width={196}
            height={140}
          />
        </div>

        <div className="flex w-1/3 flex-col justify-center pl-4">
          <h1 className="mb-2 text-2xl font-bold">{name}</h1>
          <p className="mb-1">
            높이:{" "}
            <span className="font-semibold">
              {height.toLocaleString("en-US")}m
            </span>
          </p>
          <p className="mb-1">
            지역: <span className="font-semibold">{region}</span>
          </p>
          <p className="mb-1">
            주요봉: <span className="font-semibold">{peak}</span>
          </p>
        </div>
      </section>
      <section className="m-2">
        <h3 className="pr-2 pl-2 text-justify text-sm">{introduction}</h3>
      </section>
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
              {/* <Bar
              yAxisId="right"
              dataKey="precipitation"
              fill="#ffc658"
              name="강수량 (mm)"
            /> */}
              {/* <Line
              yAxisId="left"
              type="monotone"
              dataKey="WSD"
              stroke="#ff7300"
              name="풍속 (m/s)"
            /> */}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </section>
      {isAstronomyDataLoading ? (
        <Skeleton height={56} />
      ) : (
        <AstronomyInfoCard astronomyData={astronomyData} />
      )}
      <CCTVExternalLink cctv={cctv} />
    </article>
  );
};

export default MountainView;
