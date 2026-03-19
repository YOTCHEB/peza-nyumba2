import { lazy, Suspense } from "react";
import { Listing } from "@/lib/types";

const MapViewInner = lazy(() => import("./MapViewInner"));

interface MapViewProps {
  listings: Listing[];
  className?: string;
}

const MapView = ({ listings, className = "" }: MapViewProps) => {
  return (
    <Suspense
      fallback={
        <div className={`flex items-center justify-center rounded-xl border-2 border-border bg-muted ${className}`} style={{ minHeight: 300 }}>
          <p className="text-muted-foreground">Loading map…</p>
        </div>
      }
    >
      <MapViewInner listings={listings} className={className} />
    </Suspense>
  );
};

export default MapView;