import type { Mountain } from "@/shared/constants";
import { MOUNTAIN_INFORMATION_LIST, MOUNTAIN_KEYS } from "@/shared/constants";
import MountainView from "@/views/mountainView";
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

  return {
    props: { mountainData }
  };
};

export default MountainPage;
