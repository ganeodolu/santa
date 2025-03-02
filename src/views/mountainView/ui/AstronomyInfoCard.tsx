import SunriseIcon from "@/shared/ui/icons/sunrise.svg";
import SunsetIcon from "@/shared/ui/icons/sunset.svg";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

type Props = {
  astronomyData: {
    sunrise: string;
    sunset: string;
  }
}

const AstronomyInfoCard = ({astronomyData: {sunrise, sunset}}: Props) => {
  return (
    <section className="flex w-full">
      <div className="flex flex-1 items-center justify-center border-r p-2">
        <SunriseIcon width={50} height={50} />
        <span className="text-lg font-semibold">
          {dayjs(sunrise, "HHmm").format("A hh:mm")}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center p-2">
        <SunsetIcon width={50} height={50} />
        <span className="text-lg font-semibold">{dayjs(sunset, "HHmm").format("A hh:mm")}</span>
      </div>
    </section>
  );
};

export default AstronomyInfoCard;
