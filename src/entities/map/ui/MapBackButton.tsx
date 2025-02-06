import { useRouter } from "next/router";

const MapBackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="leaflet-top leaflet-left pt-2 pl-1">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleClick}
          style={{
            padding: "5px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer"
          }}
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapBackButton;
