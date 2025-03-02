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
      <div className="flex flex-1 items-center justify-center border-r">
        <span className="text-base font-semibold">일출</span>
        <SunriseIcon width={40} height={40} />
        <span className="text-base font-semibold ml-2">
          {dayjs(sunrise, "HHmm").format("A hh:mm")}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span className="text-base font-semibold">일몰</span>
        <SunsetIcon width={40} height={40} />
        <span className="text-base font-semibold ml-2">
          {dayjs(sunset, "HHmm").format("A hh:mm")}
        </span>
      </div>
    </section>
  );
};

export default AstronomyInfoCard;
