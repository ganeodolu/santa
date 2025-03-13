import SunriseIcon from "@/shared/ui/icons/sunrise.svg";
import SunsetIcon from "@/shared/ui/icons/sunset.svg";
import Skeleton from "react-loading-skeleton";

type Props = {
  astronomyData: {
    sunrise: string;
    sunset: string;
  }
}

const AstronomyInfoCard = ({ astronomyData }: Props) => {
  

  return (
    <section className="flex w-full">
      <div className="flex flex-1 items-center justify-center border-r">
        <span className="text-base font-semibold">일출</span>
        <SunriseIcon width={40} height={40} />
        <span className="ml-2 text-base font-semibold">
          {!astronomyData?.sunrise ? (
            <Skeleton width={74} />
          ) : (
            astronomyData.sunrise
          )}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span className="text-base font-semibold">일몰</span>
        <SunsetIcon width={40} height={40} />
        <span className="ml-2 text-base font-semibold">
          {!astronomyData.sunset ? (
            <Skeleton width={74} />
          ) : (
            astronomyData.sunset
          )}
        </span>
      </div>
    </section>
  );
};

export default AstronomyInfoCard;
