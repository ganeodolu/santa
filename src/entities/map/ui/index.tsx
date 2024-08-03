import React from 'react'
import dynamic from "next/dynamic";

type Props = {}

const LeafletMapWithNoSSR = dynamic(() => import("./LeafletMap"), {
  ssr: false
});

const Map = (props: Props) => {
  return (
    <div>
      <LeafletMapWithNoSSR />
    </div>
  )
}

export default Map
