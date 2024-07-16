import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Props = {};

const LeafletMap = (props: Props) => {
  return (
    <MapContainer
      center={[37.65933150575183, 126.9778332895154]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "80vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[37.65933150575183, 126.9778332895154]}>
        <Popup>
          북한산 <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
