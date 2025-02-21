import { CustomTooltip, CustomizedDot, formatXAxis } from "@/entities/chart/ui";
import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import type { Mountain } from "@/shared/constants";
import {
  extractWeatherData,
  timeTransformWithBufferHour,
  xyConvert
} from "@/shared/model";
import { getWeatherInformation } from "@/views/api/weather";
import { useQuery } from "@tanstack/react-query";
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
  const { name, lat, lon, height, peak, region, pic } = mountainData;
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
              markerPositions={[[lat, lon]]}
              isShowBackButton={true}
            />
          </div>
        )}
      </section>

      <section className="mb-4 flex">
        <div className="w-1/2 pr-4 pl-2">
          <Image
            className="rounded-lg shadow-lg"
            src={pic}
            alt={name}
            width={234}
            height={160}
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
            지역: <span className="font-semibold">{region}</span>
          </p>
          <p className="mb-2">
            최고봉: <span className="font-semibold">{peak}</span>
          </p>
        </div>
      </section>

      <section className="mb-4 rounded-lg bg-white shadow-lg">
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
      </section>
    </article>
  );
};

export default MountainView;
