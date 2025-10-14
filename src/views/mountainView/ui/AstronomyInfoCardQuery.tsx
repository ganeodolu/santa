import SunriseIcon from "@/shared/ui/icons/sunrise.svg";
import SunsetIcon from "@/shared/ui/icons/sunset.svg";
import Skeleton from "react-loading-skeleton";
import { getClientAstronomyInformation } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { MountainData } from "@/shared/model";

dayjs.extend(utc);

const AstronomyInfoCardQuery = ({ mountainData }: MountainData ) => {
  const { lat, lon } = mountainData;
  const {
    data: astronomyData,
    isError: isAstronomyDataError,
    isLoading: isAstronomyDataLoading,
    error: astronomyDataError
  } = useQuery({
    queryKey: [
      "getAstronomy",
      lon,
      lat,
      dayjs().utc().utcOffset(9).format("YYYYMMDD")
    ],
    queryFn: () => getClientAstronomyInformation(lat, lon)
  });

  if (isAstronomyDataError) {
    throw astronomyDataError;
  }

  return (
    <section className="flex w-full">
      <div className="flex flex-1 items-center justify-center border-r">
        <span className="text-base font-semibold">일출</span>
        <SunriseIcon width={40} height={40} />
        <span className="ml-2 text-base font-semibold">
          {isAstronomyDataLoading ? (
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
          {isAstronomyDataLoading ? (
            <Skeleton width={74} />
          ) : (
            astronomyData.sunset
          )}
        </span>
      </div>
    </section>
  );
};

export default AstronomyInfoCardQuery;
