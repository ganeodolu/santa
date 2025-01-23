import type { Mountain } from '@/shared/constants';
import { MOUNTAIN_INFORMATION_LIST, MOUNTAIN_KEYS } from '@/shared/constants';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';

const LeafletMapWithNoSSR = dynamic(
  () => import("@/entities/map/ui/LeafletMap"),
  {
    ssr: false
  }
);

interface MountainPageProps {
  mountainData: Mountain;
}

const MountainPage: React.FC<MountainPageProps> = ({ mountainData }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mountainData) return <div>Loading...</div>
  
  return (
    <div>
      {isMounted && (
        <div style={{ height: "400px", width: "100%" }}>
          <LeafletMapWithNoSSR
            name={mountainData.name}
            center={[mountainData.lat, mountainData.lon]}
            zoom={13}
          />
        </div>
      )}
      <h1>{mountainData.name}</h1>
      <p>높이: {mountainData.height}m</p>
      <p>위치: {mountainData.region}</p>
      <p>최고봉: {mountainData.peak}</p>
      {/* <p>좌표: {mountainData.lat}, {mountainData.lon}</p> */}
    </div>
  );
};


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = MOUNTAIN_KEYS.map((mountainEnglishName) => ({
    params: { englishName: mountainEnglishName }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{mountainData: Mountain}> = async ({ params }) => {
  // 실제로는 API나 데이터베이스에서 특정 ID의 포스트 데이터를 가져옵니다
  const mountainData = MOUNTAIN_INFORMATION_LIST.find((mountain) => mountain.englishName === params?.englishName);

  if (!mountainData) {
    return { notFound: true };
  }

  return {
    props: { mountainData }
  };
}

export default MountainPage;
