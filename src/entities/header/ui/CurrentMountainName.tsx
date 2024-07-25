import React from 'react'
import { mountainInformation } from '@/shared';
import { useSearchParams } from "next/navigation";

type Props = {}


const CurrentMountainName = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("mountainName");
  
  return <div>{mountainInformation[search]?.name}</div>;
}

export default CurrentMountainName
