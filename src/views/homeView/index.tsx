import SearchHeader from "@/features/Header/ui/SearchHeader";
import { MOUNTAIN_INFORMATION_LIST } from "@/shared/constants";
import { useNavigation } from "@/shared/model/useNavigation";
import MountainList from "@/views/homeView/ui/MountainList";
import ShowMapButton from '@/views/homeView/ui/ShowMapButton';

type Props = {};

const HomeView = (props: Props) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="mx-auto max-w-[500px] bg-white shadow-md">
      <SearchHeader onInputClick={() => navigateTo("/search")} />
      <MountainList mountainList={MOUNTAIN_INFORMATION_LIST} />
      <ShowMapButton onButtonClick={() => navigateTo("/mountainMap")} />
    </div>
  );
};

export default HomeView;
