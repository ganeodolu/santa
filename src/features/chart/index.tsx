import { formatXAxis, generateYAxisTicks } from "@/features/chart/lib";
import type { weatherDataProps } from "@/features/chart/model";
import { CustomTooltip, CustomizedDot } from "@/features/chart/ui";
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

type Props = {
  weatherData: weatherDataProps[];
};

const Chart = ({ weatherData }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={weatherData}>
        <CartesianGrid
          horizontal={true}
          vertical={true}
          strokeDasharray="3 3"
        />
        <XAxis dataKey="timestamp" interval={0} tickFormatter={formatXAxis} />
        <YAxis
          type="number"
          yAxisId="TMP"
          domain={["dataMin - 10", "dataMax + 2"]}
          interval={0}
          ticks={generateYAxisTicks(weatherData, "TMP", -5, 2)}
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
  );
};

export default Chart;
