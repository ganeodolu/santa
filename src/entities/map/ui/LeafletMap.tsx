import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MouseEvent } from "react";
import {
  MapContainer,
  Marker,
  Tooltip,
  TileLayer,
  ZoomControl
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";

type Props = {
  markerNames: string[];
  markerEnglishNames: string[];
  center: [number, number];
  zoom: number;
  height: string;
  markerPositions: [number, number][];
  handleTooltipClick?: (e: MouseEvent<HTMLElement>) => void;
};

const LeafletMap = ({
  markerNames,
  markerEnglishNames,
  center,
  height,
  zoom,
  markerPositions,
  handleTooltipClick
}: Props) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ width: "100%", height }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      <MarkerClusterGroup maxClusterRadius={60}>
        {markerPositions.map(([lat, lon], idx) => {
          return (
            <Marker position={[lat, lon]} key={markerEnglishNames[idx]}>
              <Tooltip
                opacity={1}
                offset={[-15, 28]}
                direction="top"
                permanent
                interactive
                className="rounded-lg border-0 bg-white p-2 shadow-lg"
              >
                <div className="text-gray-800" onClick={handleTooltipClick}>
                  <h3
                    className="mountain-name text-lg font-semibold"
                    data-mountain-english-name={markerEnglishNames[idx]}
                  >
                    {markerNames[idx]}
                  </h3>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default LeafletMap;
