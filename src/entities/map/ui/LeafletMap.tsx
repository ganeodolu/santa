import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Props = {
  name: string;
  center: [number, number];
  zoom: number;
};

const LeafletMap = ({name, center, zoom}: Props) => {
  // FIXME: 지역변경시 지도 적용 안됨 처음에 기본이고 나중에 바뀌었는데 이미 지도에 반영되어서 그런듯
  
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "60vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          {name} <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
