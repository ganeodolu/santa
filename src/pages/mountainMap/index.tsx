import MetaTags from "@/shared/ui/MetaTags";
import MountainMapView from "@/views/mountainMapView";
import { DEFAULT_URL } from "@/shared/constants";

const MountainMapPage = () => {
  return (
    <>
      <MetaTags
        title={`국립공원 지도`}
        description={"전국에 있는 국립공원을 지도로 찾아보세요!"}
        keywords={`국립공원, 산, 날씨, 위치, 지도, CCTV`}
        url={`${DEFAULT_URL}/mountainMap`}
      />
      <MountainMapView />;
    </>
  );
};

export default MountainMapPage;