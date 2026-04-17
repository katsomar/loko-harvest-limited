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
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

import "leaflet/dist/leaflet.css";

const locations = [
  { 
    name: "Akright Bwebajja", 
    pos: [0.2033, 32.5186] as [number, number], 
    tag: "Headquarters"
  },
  { 
    name: "Mubende Farm", 
    pos: [0.5630, 31.3917] as [number, number], 
    tag: "Primary Production"
  },
];

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

  // Center between both locations
  const center: [number, number] = [0.3831, 31.9551]; 

  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg border border-brand-dark/5 min-h-[400px]">
      <MapContainer
        center={center}
        zoom={8}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, idx) => (
            <Marker 
                key={idx} 
                position={loc.pos} 
                icon={icon}
                eventHandlers={{
                    click: () => {
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${loc.pos[0]},${loc.pos[1]}`, '_blank');
                    },
                }}
            >
                <Tooltip 
                    permanent 
                    direction="top" 
                    offset={[0, -40]}
                    className="custom-tooltip cursor-pointer"
                >
                    <div className="text-center group">
                        <span className="block font-bold">{loc.name}</span>
                        <span className="text-[8px] opacity-60 block mt-0.5 font-sans">Click to Navigate</span>
                    </div>
                </Tooltip>
            </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
