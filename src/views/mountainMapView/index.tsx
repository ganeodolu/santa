import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import SearchHeaderWithBackNoFunction from "@/features/Header/ui/SearchHeaderWithBackNoFunction";
import { MOUNTAIN_INFORMATION_LIST, MOUNTAIN_NAMES } from "@/shared/constants";
import { useNavigation } from "@/shared/model/useNavigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton />
  }
);

type Props = {};

const MountainMapView = (props: Props) => {
  const { navigateTo } = useNavigation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mx-auto max-w-[500px] bg-white shadow-md">
      <SearchHeaderWithBackNoFunction
        onInputClick={() => navigateTo("/search")}
      />
      <section className="mb-4">
        {isMounted && (
          <div className="mx-auto">
            <LeafletMapWithNoSSR
              markerNames={MOUNTAIN_NAMES}
              center={[35.8, 127.7]}
              height={"90vh"}
              zoom={7}
              markerPositions={MOUNTAIN_INFORMATION_LIST.map(({ lat, lon }) => [
                lat,
                lon
              ])}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default MountainMapView;
