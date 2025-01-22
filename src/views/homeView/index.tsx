import SearchHeader from "@/features/Header/ui/SearchHeader";
import { useNavigation } from "@/shared/model/useNavigation";
import MountainList from "@/views/homeView/ui/MountainList";

type Props = {};

const HomeView = (props: Props) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="mx-auto max-w-[500px] bg-white shadow-md">
      <SearchHeader onInputClick={() => navigateTo("/search")} />
      <MountainList />
    </div>
  );
};

export default HomeView;
