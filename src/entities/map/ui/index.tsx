import React from 'react'
import dynamic from "next/dynamic";
// import LeafletMap from './leafletMap'

type Props = {}

const Map = (props: Props) => {
  const LeafletMapWithNoSSR = dynamic(() => import("./leafletMap"));
  return (
    <div>
      <LeafletMapWithNoSSR />
    </div>
  )
}

export default Map
