import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import SearchHeaderWithBackNoFunction from "@/features/Header/ui/SearchHeaderWithBackNoFunction";
import type { Mountain } from "@/shared/constants";
import type { MountainData } from "@/shared/model";
import AstronomyInfoCardQuery from "@/views/mountainView/ui/AstronomyInfoCardQuery";
import CCTVExternalLink from "@/views/mountainView/ui/CCTVExternalLink";
import MountainInformation from "@/views/mountainView/ui/MountainInformation";
import WeatherChartQuery from "@/views/mountainView/ui/WeatherChartQuery";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import "react-loading-skeleton/dist/skeleton.css";

dayjs.extend(utc);

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton height="h-[40vh]" />
  }
);

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="flex h-[200px] w-full flex-col items-center justify-center rounded bg-red-100 p-5 font-bold text-red-700"
    >
      <p>차트 렌더링 중 오류가 발생했습니다.</p>
      <pre className="whitespace-normal">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 cursor-pointer rounded bg-red-700 px-3 py-1.5 text-white transition hover:bg-red-800"
      >
        재시도
      </button>
    </div>
  );
};

const MountainView = ({ mountainData }: MountainData) => {
  const [isMounted, setIsMounted] = useState(false);
  const { name, lat, lon, englishName, cctv } = mountainData;

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
      <section className="mb-4 rounded-lg bg-white">
        <h2 className="mb-2 text-center text-2xl font-bold">날씨</h2>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <WeatherChartQuery mountainData={mountainData} />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p></p>}>
          <AstronomyInfoCardQuery mountainData={mountainData} />
        </ErrorBoundary>
      </section>
      <CCTVExternalLink cctv={cctv} />
    </article>
  );
};

export default MountainView;
