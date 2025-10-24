import GlobalLayout from "@/app/ui/GlobalLayout";
import MountainMapView from "@/views/mountainMapView";
import { ReactNode } from "react";

const MountainMapPage = () => {
  return <MountainMapView />;
};

MountainMapPage.getLayout = (page: ReactNode) => (
  <GlobalLayout>{page}</GlobalLayout>
);

export default MountainMapPage;
