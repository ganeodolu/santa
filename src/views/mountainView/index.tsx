import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import SearchHeaderWithBackNoFunction from "@/features/Header/ui/SearchHeaderWithBackNoFunction";
import type { Mountain } from "@/shared/constants";
import { xyConvert } from "@/shared/model";
import CCTVExternalLink from "@/views/mountainView/ui/CCTVExternalLink";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "react-loading-skeleton/dist/skeleton.css";
import WeatherAndAstronomyData from "./ui/WeatherAndAstronomyData";
import MountainInformation from "@/views/mountainView/ui/MountainInformation";

dayjs.extend(utc);

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton height="h-[40vh]" />
  }
);

type Props = {
  mountainData: Mountain;
};

const MountainView = ({ mountainData }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { name, lat, lon, englishName, cctv } = mountainData;
  const { x, y } = xyConvert(lat, lon);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <article className="container mx-auto max-w-[500px] bg-white shadow-md">
      <SearchHeaderWithBackNoFunction href={"/search"} />
      <section className="mb-4">
        {isMounted && (
          <div className="mx-auto">
            <LeafletMapWithNoSSR
              center={[lat, lon]}
              height={"40vh"}
              zoom={13}
              markerNames={[name]}
              markerEnglishNames={[englishName]}
              markerPositions={[[lat, lon]]}
            />
          </div>
        )}
      </section>
      <MountainInformation mountainData={mountainData} />
      <ErrorBoundary fallback={<p>에러가 발생</p>}>
        <WeatherAndAstronomyData mountainData={mountainData} />
      </ErrorBoundary>
      <CCTVExternalLink cctv={cctv} />
    </article>
  );
};

export default MountainView;
