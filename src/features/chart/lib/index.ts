import type { weatherDataProps } from "@/features/chart/model";
import dayjs from "dayjs";

export const generateYAxisTicks = (
  data: weatherDataProps[],
  dataType: keyof weatherDataProps,
  offsetMin: number,
  offsetMax: number
) => {
  const max = Math.max(...data.map((item) => item[dataType] as number));
  const min = Math.min(...data.map((item) => item[dataType] as number));
  const ticks = [];
  for (let i = min + offsetMin; i <= max + offsetMax; i++) {
    if (i % 5 === 0) {
      ticks.push(i);
    }
  }

  return ticks;
};

export const formatXAxis = (tickItem: string) => {
  const hour = tickItem.slice(-4, -2);
  if (hour === "00") {
    return dayjs(tickItem).format("M/D");
  }
  if (hour === "06" || hour === "12" || hour === "18") {
    return dayjs(tickItem).format("H시");
  }

  return "";
};