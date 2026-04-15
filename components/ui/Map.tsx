"use client";

import React from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [L, setL] = React.useState<any>(null);

  React.useEffect(() => {
    import("leaflet").then((mod) => {
      setL(mod.default);
    });
  }, []);

  if (!L) return (
    <div className="w-full h-full rounded-2xl bg-brand-dark/5 animate-pulse min-h-[400px]" />
  );

  const position: [number, number] = [0.3476, 32.5825]; // Kampala, Uganda

  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass shadow-2xl min-h-[400px]">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            Loko Harvest Limited <br /> Plot 45, Industrial Area.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
