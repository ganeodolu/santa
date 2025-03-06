import {
  getAstronomyInformation,
  getWeatherInformation
} from "@/shared/api/client";
import type { Mountain } from "@/shared/constants";
import { MOUNTAIN_INFORMATION_LIST, MOUNTAIN_KEYS } from "@/shared/constants";
import { timeTransformWithBufferHour, xyConvert } from "@/shared/model";
import MountainView from "@/views/mountainView";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";

interface MountainPageProps {
  mountainData: Mountain;
}

const MountainPage: React.FC<MountainPageProps> = ({ mountainData }) => {
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

export const getStaticProps: GetStaticProps<{
  mountainData: Mountain;
}> = async ({ params }) => {
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
      queryKey: ["getWeather", x, y, timeTransformWithBufferHour(0.5)],
      queryFn: () => getWeatherInformation(x, y)
    }),
    queryClient.prefetchQuery({
      queryKey: [
        "getAstronomy",
        mountainData.lon,
        mountainData.lat,
        dayjs().format("YYYYMMDD")
      ],
      queryFn: () => getAstronomyInformation(mountainData.lat, mountainData.lon)
    })
  ]);

  return {
    props: {
      mountainData,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default MountainPage;
