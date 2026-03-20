import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/data";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapViewInnerProps {
  listings: Listing[];
  className?: string;
}

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(listings.map(l => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  }, [listings, map]);
  return null;
}

const MapViewInner = ({ listings, className = "" }: MapViewInnerProps) => {
  const center: [number, number] = [-14.0, 34.0];

  return (
    <div className={`overflow-hidden rounded-xl border-2 border-border ${className}`} style={{ zIndex: 0 }}>
      <MapContainer center={center} zoom={7} className="h-full w-full" style={{ minHeight: 300, zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds listings={listings} />
        {listings.map((l) => (
          <Marker key={l.id} position={[l.lat, l.lng]}>
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-bold text-sm leading-tight">{l.title}</p>
                <p className="font-bold" style={{ color: "hsl(var(--primary))" }}>{formatPrice(l.rentPrice)}/mo</p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{l.area}, {l.city}</p>
                <a href={`/listings/${l.id}`} className="mt-1 inline-block text-xs font-medium underline" style={{ color: "hsl(var(--primary))" }}>
                  View Details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapViewInner;