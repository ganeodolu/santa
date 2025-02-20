import { useNavigation } from "@/shared/model/useNavigation";
import MapSkeleton from "@/entities/map/ui/MapSkeleton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SearchHeaderWithBackNoFunction from "@/features/Header/ui/SearchHeaderWithBackNoFunction";

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton />
  }
);

type Props = {}

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
              name={"test"}
              center={[36.28, 127.92]}
              height={"90vh"}
              zoom={7}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default MountainMapView
