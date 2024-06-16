import React from 'react'
import { useRecoilState } from "recoil";
import { mountainIndexState, parkNames } from '@/shared';

type Props = {}

const CurrentMountainName = (props: Props) => {
  const [currentMountainIndexState, setCurrentMountainIndexState] =
    useRecoilState(mountainIndexState);
  
  return <div>{parkNames[currentMountainIndexState]}</div>;
}

export default CurrentMountainName
