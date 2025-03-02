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
import CCTVExternalLink from "@/views/mountainView/ui/CCTVExternalLink";
import AstronomyInfoCard from "@/views/mountainView/ui/AstronomyInfoCard";
import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
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
    loading: () => <MapSkeleton />
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
        queryFn: () => getWeatherInformation(x, y),
        retry: 1
      },
      {
        queryKey: ["getAstronomy", lon, lat, dayjs().format("YYYYMMDD")],
        queryFn: () => getAstronomyInformation(lat, lon),
        retry: 1
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

      <section className="mb-2 flex">
        <div className="h-[140px] w-[220px] overflow-hidden pr-4 pl-2">
          <Image
            className="rounded-lg"
            src={imageSrc}
            alt={name}
            width={200}
            height={140}
          />
        </div>
        <div className="w-1/2 pl-4">
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
      <section className="mr-2 ml-2">
        <h3 className="text-justify text-sm">{introduction}</h3>
      </section>

      {weatherData && (
        <section className="mb-4 rounded-lg bg-white">
          <h2 className="mb-2 text-center text-2xl font-bold">날씨</h2>
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
          {/* <ResponsiveContainer width="100%" height={100}>
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
                yAxisId="POP"
                domain={[0, 100]}
                ticks={[0, 50, 100]}
                tick={{ fill: "#3236a8" }}
                label={{ value: "%", position: "outsideTopLeft" }}
                orientation="left"
              />
              <YAxis yAxisId="right" orientation="right" />
              <Legend />
              <Bar
                yAxisId="POP"
                type="monotone"
                dataKey="POP"
                fill="#3236a8"
                name="강수확률 (%)"
              />
            </ComposedChart>
          </ResponsiveContainer> */}
        </section>
      )}  
      {astronomyData && <AstronomyInfoCard astronomyData={astronomyData} />}

      <CCTVExternalLink cctv={cctv} />
    </article>
  );
};

export default MountainView;
