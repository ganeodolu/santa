import SearchHeader from "@/features/Header/ui/SearchHeader";
import { MOUNTAIN_INFORMATION_LIST } from "@/shared/constants";
import MountainList from "@/views/homeView/ui/MountainList";
import ShowMapButton from '@/views/homeView/ui/ShowMapButton';

const HomeView = () => {
  return (
    <div className="mx-auto max-w-[500px] bg-white shadow-md">
      <SearchHeader href={"/search"} />
      <MountainList mountainList={MOUNTAIN_INFORMATION_LIST} />
      <ShowMapButton href={"/mountainMap"} />
    </div>
  );
};

export default HomeView;
