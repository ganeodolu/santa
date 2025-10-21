import MountainMapView from "@/views/mountainMapView";
import GlobalLayout from "@/app/ui/GlobalLayout";
import { ReactNode } from "react";
import MountainMapViewLayout from "@/views/mountainMapView/ui/MountainMapViewLayout";

const MountainMapPage = () => {
  return (
    <MountainMapViewLayout>
      <MountainMapView />
    </MountainMapViewLayout>
  );
};

MountainMapPage.getLayout = (page: ReactNode) => (
  <GlobalLayout>{page}</GlobalLayout>
);

export default MountainMapPage;
