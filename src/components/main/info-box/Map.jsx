import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./Map.css";

// Fix default leaflet marker icon issue with vite/react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map({ location, size = "clamp(160px, 20vw, 220px)" }) {
  const mapRef = useRef();

  const position = [location.lat || 0, location.lon || 0];
  const hasCoords =
    location.lat && location.lon && position[0] !== 0 && position[1] !== 0;

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, hasCoords ? 11 : 2);
    }
  }, [position, hasCoords]);

  if (!hasCoords) {
    return (
      <div
        className="map-placeholder"
        style={{ width: size * 1.33, height: size }}
      >
        <div className="placeholder-content">
          📍
          <br />
          <small>Location unavailable</small>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container" style={{ width: size * 1.5, height: size }}>
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        <Marker position={position}>
          <Popup>
            <b>{location.name}</b>
            <br />
            {location.region && `${location.region}, `}
            {location.country}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
