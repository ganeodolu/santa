import {
  getBasicWeatherInformation,
  getBasicAstronomyInformation
} from "@/shared/api/basic";
import { MOUNTAIN_INFORMATION_LIST, MOUNTAIN_KEYS } from "@/shared/constants";
import { forecastUTC9TimeTransformWithBufferHour, xyConvert } from "@/shared/model";
import MountainView from "@/views/mountainView";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import utc from "dayjs/plugin/utc";
import type { MountainData } from "@/shared/model";

dayjs.extend(utc);

const MountainPage: React.FC<MountainData> = ({ mountainData }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MountainView mountainData={mountainData} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = MOUNTAIN_KEYS.map((mountainEnglishName) => ({
    params: { englishName: mountainEnglishName }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<MountainData> = async ({ params }) => {
  const mountainData = MOUNTAIN_INFORMATION_LIST.find(
    (mountain) => mountain.englishName === params?.englishName
  );

  if (!mountainData) {
    return { notFound: true };
  }

  const { x, y } = xyConvert(mountainData?.lat, mountainData?.lon);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [
        "getWeather",
        x,
        y,
        forecastUTC9TimeTransformWithBufferHour(0.5)
      ],
      queryFn: () => getBasicWeatherInformation(x, y)
    }),
    queryClient.prefetchQuery({
      queryKey: [
        "getAstronomy",
        mountainData.lon,
        mountainData.lat,
        dayjs().utc().utcOffset(9).format("YYYYMMDD")
      ],
      queryFn: () =>
        getBasicAstronomyInformation(mountainData.lat, mountainData.lon)
    })
  ]);

  return {
    props: {
      mountainData,
      dehydratedState: dehydrate(queryClient),
      revalidate: 10800
    }
  };
};

export default MountainPage;
