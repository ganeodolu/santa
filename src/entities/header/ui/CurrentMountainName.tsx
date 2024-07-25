import { mountainInformation } from "@/shared";
import { useSearchParams } from "next/navigation";

type Props = {};

const CurrentMountainName = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("mountainName");

  if (search) {
    return <div>{mountainInformation[search].name}</div>;
  } else {
    return <></>;
  }
};

export default CurrentMountainName;
