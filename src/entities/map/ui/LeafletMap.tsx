import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Props = {};

const LeafletMap = (props: Props) => {
  return (
    <MapContainer
      center={[37.645175709619025, 126.97477909129488
]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "80vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[37.645175709619025, 126.97477909129488
]}>
        <Popup>
          북한산 <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
