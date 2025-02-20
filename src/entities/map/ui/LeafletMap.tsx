import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import MapBackButton from '@/entities/map/ui/MapBackButton';

type Props = {
  name: string;
  center: [number, number];
  zoom: number;
  height: string;
};

const LeafletMap = ({name, center, height, zoom}: Props) => {
  
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
      <ZoomControl position="bottomright" />
      <Marker position={center}>
        <Popup>
          {name} <br />
        </Popup>
      </Marker>
      <MapBackButton />
    </MapContainer>
  );
};

export default LeafletMap;
