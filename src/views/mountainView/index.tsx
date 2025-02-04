import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
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
import {
  xyConvert,
  extractWeatherData,
  timeTransformWithBufferHour
} from "@/shared/model";
import { useQuery } from "@tanstack/react-query";
import { getWeatherInformation } from "@/views/api/weather";
import type { Mountain } from "@/shared/constants";
import { formatXAxis, CustomizedDot, CustomTooltip } from "@/entities/chart/ui";

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
            <CartesianGrid
              horizontal={true}
              vertical={true}
              strokeDasharray="3 3"
            />
            <XAxis dataKey="timestamp"
              interval={1}
              tickFormatter={formatXAxis} />
            <YAxis
              type="number"
              yAxisId="TMP"
              domain={["dataMin - 10", "dataMax + 2"]}
              ticks={[-10, 0, 10]}
              label={{ value: "°C", position: "insideTopLeft" }}
              orientation="left"
            />
            <YAxis
              yAxisId="POP"
              domain={[0, 400]}
              ticks={[0, 100]}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="TMP"
              type="monotone"
              dataKey="TMP"
              stroke="#ee1b1b"
              name="기온 (°C)"
              dot={<CustomizedDot />}
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
      </section>
    </article>
  );
}

export default MountainView
