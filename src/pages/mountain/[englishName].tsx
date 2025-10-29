import {
  getBasicAstronomyInformation,
  getBasicWeatherInformation
} from "@/shared/api/basic";
import { DEFAULT_URL, MOUNTAIN_INFORMATION_LIST, MOUNTAIN_KEYS, Mountain } from "@/shared/constants";
import type { MountainData } from "@/shared/model";
import {
  forecastUTC9TimeTransformWithBufferHour,
  xyConvert
} from "@/shared/model";
import MountainView from "@/views/mountainView";
import { QueryClient, dehydrate, DehydratedState } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement } from "react";
import MetaTags from "@/shared/ui/MetaTags";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};

dayjs.extend(utc);

type MountainPageProps = {
  mountainData: Mountain;
  dehydratedState: DehydratedState;
};


const MountainPage: NextPageWithLayout<MountainPageProps> = ({
  mountainData
}) => {
  return (
    <>
      <MetaTags
        title={`${mountainData?.name} 국립공원`}
        description={`${mountainData?.name}의 지도, 날씨, 일출, 일몰, CCTV 정보`}
        keywords={`${mountainData?.name}, 국립공원, 산, 날씨, 위치, 지도, CCTV`}
        url={`${DEFAULT_URL}/mountain/${mountainData?.englishName}`}
      />
      <MountainView mountainData={mountainData} />;
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = MOUNTAIN_KEYS.map((mountainEnglishName) => ({
    params: { englishName: mountainEnglishName }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<MountainPageProps> = async ({
  params
}) => {
  const mountainData = MOUNTAIN_INFORMATION_LIST.find(
    (mountain) => mountain.englishName === params?.englishName
  );

  if (!mountainData) {
    return { notFound: true };
  }

  const { x, y } = xyConvert(mountainData?.lat, mountainData?.lon);
  const queryClient = new QueryClient();

  try {
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
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      mountainData,
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 10800
  };
};

export default MountainPage;
