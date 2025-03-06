import CloudyIcon from "@/shared/ui/icons/cloudy.svg";
import PartlyCloudyIcon from "@/shared/ui/icons/partlyCloudy.svg";
import RainyIcon from "@/shared/ui/icons/rainy.svg";
import ShowerIcon from "@/shared/ui/icons/shower.svg";
import SnowyIcon from "@/shared/ui/icons/snowy.svg";
import SunnyIcon from "@/shared/ui/icons/sunny.svg";
import TemperatureIcon from "@/shared/ui/icons/temperature.svg";
import dayjs from "dayjs";
import { TooltipProps } from "recharts";

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

type PayloadProps = {
  timestamp: string;
  TMP: number;
  SKY: number;
  POP: number;
  WSD: number;
  PTY: number;
};

type CustomizedDotProps = {
  cx: number;
  cy: number;
  dataKey: string;
  fill: string;
  height: number;
  index: number;
  name: string;
  payload: PayloadProps;
  r: number;
  stroke: string;
  strokeWidth: number;
  value: number;
  width: number;
};

export const CustomizedDot = (props: CustomizedDotProps) => {
  const { cx, cy, payload } = props;
  const weatherType = payload?.["SKY"];
  const precipitationType = payload?.["PTY"];
  const size = 30;

  const renderWeatherIcon = (
    weatherType: number,
    precipitationType: number
  ) => {
    if (precipitationType === 0) {
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
          return (
            <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
              <TemperatureIcon width={size} height={size} />
            </g>
          );
      }
    }

    switch (precipitationType) {
      case 1: // 비
      // return (
      //   <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
      //     <RainyIcon width={size} height={size} />
      //   </g>
      // );
      case 2: // 비/눈
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <RainyIcon width={size} height={size} />
          </g>
        );
      case 3: // 눈
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <SnowyIcon width={size} height={size} />
          </g>
        );
      case 4: // 소나기
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <ShowerIcon width={size} height={size} />
          </g>
        );
      default:
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <TemperatureIcon width={size} height={size} />
          </g>
        );
    }
  };

  return renderWeatherIcon(weatherType, precipitationType);
};

export const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props;
  if (active && payload?.length) {
    const formatTime = dayjs(payload[0].payload.timestamp, "YYYYMMDDHHmm").format(
      "MM월 DD일 HH시"
    );
    return (
      <div className="rounded border bg-white p-2 shadow">
        <p>{`시간 : ${formatTime}`}</p>
        <p>{`기온 : ${payload[0].value}°C`}</p>
        <p>{`강수확률 : ${payload[1].value}%`}</p>
      </div>
    );
  }
  return <></>;
};

export type weatherDataProps = {
  timestamp: string;
  TMP: number;
  SKY: number;
  POP: number;
  PTY: number;
};

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
