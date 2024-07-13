import React from 'react'
import dynamic from "next/dynamic";
// import LeafletMap from './leafletMap'

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
