import dayjs from "dayjs";
import CloudyIcon from "@/shared/ui/icons/cloudy.svg";
import SunnyIcon from "@/shared/ui/icons/sunny.svg";
import PartlyCloudyIcon from "@/shared/ui/icons/partlyCloudy.svg";
import RainyIcon from "@/shared/ui/icons/rainy.svg";
import SnowyIcon from "@/shared/ui/icons/snowy.svg";
import ShowerIcon from "@/shared/ui/icons/shower.svg";

export const formatXAxis = (tickItem: string) => {
  const min = tickItem.slice(-4);
  let time = dayjs(tickItem).format("H시");
  if (min === "0000") {
    time = dayjs(tickItem).format("M/D");
  }
  
  return time;
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
  const weatherType = payload["SKY"];
  const precipitationType = payload["PTY"];
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
          return null;
      }
    }

    switch (precipitationType) {
      case 1: // 비
        return (
          <g transform={`translate(${cx - size / 2},${cy - size / 2})`}>
            <RainyIcon width={size} height={size} />
          </g>
        );
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
        return null;
    }
  };

  return renderWeatherIcon(weatherType, precipitationType);
};

export const CustomTooltip = ({
  active,
  payload
}: {
  active: boolean;
  payload: any;
}) => {
  console.log(active, payload);
  if (active && payload && payload.length) {
    const formatTime = dayjs(payload[0].payload.timestamp, "MM-DD-HH").format(
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
  return null;
};
