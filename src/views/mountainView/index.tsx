import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import {
  LineChart,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";
import {
  xyConvert,
  extractWeatherData,
  timeTransformWithBufferHour
} from "@/shared/model";
import { useQuery } from "@tanstack/react-query";
import { getWeatherInformation } from "@/views/api/weather";
import type { Mountain } from "@/shared/constants";

import CloudyIcon from "@/shared/ui/icons/cloudy.svg";
import SunnyIcon from "@/shared/ui/icons/sunny.svg";
import PartlyCloudyIcon from "@/shared/ui/icons/partlyCloudy.svg";

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false
  }
);
type Props = {
  mountainData: Mountain;
};

const MountainView = ({mountainData}: Props) => {
const [isMounted, setIsMounted] = useState(false);
const { name, lat, lon, height, peak, region } = mountainData;
const { x, y } = xyConvert(lat, lon);
console.log(x, y, typeof x, typeof y);
const { data: weatherData } = useQuery({
  queryKey: ["weather", x, y, timeTransformWithBufferHour(0.5)],
  queryFn: async () =>
    extractWeatherData(await getWeatherInformation(x, y), [
      "TMP",
      "SKY",
      "POP",
      "WSD",
      "PTY"
    ]).filter((_, idx) => idx % 3 === 0)
});
console.log(weatherData);

const formatXAxis = (tickItem: number) => {
  const time = dayjs(tickItem, "HH").format("HH시");
  return time;
};

const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;
  const weatherType = payload["SKY"];
  const size = 25;

  // 값에 따라 다른 SVG 패스 반환
  const renderWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 1: // 맑음
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <SunnyIcon width={size} height={size} />
          </g>
        );

      case 3: // 구름 많음
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <PartlyCloudyIcon width={size} height={size} />
          </g>
        );

      case 4: // 흐림
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <CloudyIcon width={size} height={size} />
          </g>
        );

      default:
        return null;
    }
  };

  return renderWeatherIcon(weatherType);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const formatTime = dayjs(payload[0].payload.timestamp, "MM-DD-HH").format(
      "MM월 DD일 HH시"
    );
    return (
      <div className="rounded border bg-white p-2 shadow">
        {/* <p>{`시간 : ${payload[0].payload.timestamp}시`}</p> */}
        <p>{`시간 : ${formatTime}`}</p>
        <p>{`기온 : ${payload[0].value}°C`}</p>
      </div>
    );
  }
  return null;
};

useEffect(() => {
  setIsMounted(true);
}, []);

// if (!mountainData) return <div>Loading...</div>;


  return (
    <article className="container mx-auto max-w-[500px] bg-white shadow-md">
      <section className="mb-8">
        {isMounted && (
          <div className="mx-auto">
            <LeafletMapWithNoSSR name={name} center={[lat, lon]} zoom={13} />
          </div>
        )}
      </section>

      <section className="mb-8 flex">
        <div className="w-1/2 pr-4">
          <img
            src="https://picsum.photos/200/200.webp"
            alt={name}
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-1/2 pl-4">
          <h1 className="mb-4 text-3xl font-bold">{name}</h1>
          <p className="mb-2">
            높이:{" "}
            <span className="font-semibold">
              {height.toLocaleString("en-US")}m
            </span>
          </p>
          <p className="mb-2">
            위치: <span className="font-semibold">{region}</span>
          </p>
          <p className="mb-2">
            최고봉: <span className="font-semibold">{peak}</span>
          </p>
        </div>
      </section>

      <section className="overflow-x-scroll rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">날씨</h2>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
            <YAxis
              type="number"
              yAxisId="TMP"
              domain={["dataMin - 15", "dataMax + 5"]}
              unit="°C"
              orientation="left"
            />
            <YAxis yAxisId="POP" domain={[0, 400]} orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="TMP"
              type="monotone"
              dataKey="TMP"
              stroke="#8884d8"
              name="기온 (°C)"
              dot={<CustomizedDot />}
            />
            <Bar
              yAxisId="POP"
              type="monotone"
              dataKey="POP"
              stroke="#82ca9d"
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
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
            {/* <YAxis
              yAxisId="TMP"
              domain={["dataMin - 2", "dataMax + 2"]}
              orientation="left"
            /> */}
            <YAxis yAxisId="POP" domain={[0, 100]} orientation="right" />
            <YAxis yAxisId="WSD" orientation="left" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* <Line
              yAxisId="TMP"
              type="monotone"
              dataKey="TMP"
              stroke="#8884d8"
              name="기온 (°C)"
            /> */}
            <Bar
              yAxisId="POP"
              type="monotone"
              dataKey="POP"
              stroke="#82ca9d"
              name="강수확률 (%)"
            />
            {/* <Bar
              yAxisId="right"
              dataKey="precipitation"
              fill="#ffc658"
              name="강수량 (mm)"
            /> */}
            <Line
              yAxisId="WSD"
              type="monotone"
              dataKey="WSD"
              stroke="#ff7300"
              name="풍속 (m/s)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </section>
    </article>
  );
}

export default MountainView
