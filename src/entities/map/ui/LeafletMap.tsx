import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { mountainInformation } from "@/shared";
import { useSearchParams } from "next/navigation";

type Props = {};

const LeafletMap = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("mountainName");

  let {name, lat, lon } = mountainInformation['bukhan']
  if (search) {
    name = mountainInformation[search].name
    lat = mountainInformation[search].lat
    lon = mountainInformation[search].lon
  } 
  
  return (
    <MapContainer
      center={[lat, lon
]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "80vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon
]}>
        <Popup>
          {name} <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
