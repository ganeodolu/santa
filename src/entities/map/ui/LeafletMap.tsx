import MapBackButton from "@/entities/map/ui/MapBackButton";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";

type Props = {
  markerNames: string[];
  center: [number, number];
  zoom: number;
  height: string;
  markerPositions: [number, number][];
};

const LeafletMap = ({
  markerNames,
  center,
  height,
  zoom,
  markerPositions
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
      <MarkerClusterGroup>
        {markerPositions.map(([lat, lon], idx) => {
          return (
            <Marker position={[lat, lon]} key={markerNames[idx]}>
              <Popup>
                {markerNames[idx]} <br />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      <MapBackButton />
    </MapContainer>
  );
};

export default LeafletMap;
