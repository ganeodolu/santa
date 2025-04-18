import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import SearchStickyHeaderWithBackNoFunction from "@/features/Header/ui/SearchStickyHeaderWithBackNoFunction";
import type { Mountain } from "@/shared/constants";
import {
  MOUNTAIN_INFORMATION,
  MOUNTAIN_INFORMATION_LIST,
  MOUNTAIN_KEYS,
  MOUNTAIN_NAMES
} from "@/shared/constants";
import dynamic from "next/dynamic";
import { MouseEvent, useEffect, useState } from "react";
import MountainInfoBar from "./ui/MountainInfoBar";

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton height="h-[90vh]" />
  }
);

const MountainMapView = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [mountainInfo, setMountainInfo] = useState<Mountain | null>(null);

  const handleTooltipClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const mountainName = target.closest(".mountain-name") as HTMLElement;
    if (mountainName) {
      const mountainEnglishName = mountainName.dataset.mountainEnglishName;
      if (mountainEnglishName) {
        setMountainInfo(MOUNTAIN_INFORMATION[mountainEnglishName]);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mx-auto max-w-[500px] bg-white shadow-md">
      <SearchStickyHeaderWithBackNoFunction href={"/search"} />
      <section className="mb-4">
        {isMounted && (
          <div className="mx-auto">
            <LeafletMapWithNoSSR
              markerNames={MOUNTAIN_NAMES}
              markerEnglishNames={MOUNTAIN_KEYS}
              center={[35.8, 127.7]}
              height={"90vh"}
              zoom={7}
              markerPositions={MOUNTAIN_INFORMATION_LIST.map(({ lat, lon }) => [
                lat,
                lon
              ])}
              handleTooltipClick={handleTooltipClick}
            />
          </div>
        )}
      </section>
      {mountainInfo && <MountainInfoBar mountainInfo={mountainInfo} />}
    </div>
  );
};

export default MountainMapView;
