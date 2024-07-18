import React from 'react'
import { atom, useAtom } from 'jotai';
import { parkNames } from '@/shared';

type Props = {}

const mountainIndexAtom = atom(0)

const CurrentMountainName = (props: Props) => {
  const [mountainIndex, setMountainIndex] = useAtom(mountainIndexAtom) 
  
  return <div>{parkNames[mountainIndex]}</div>;
}

export default CurrentMountainName
