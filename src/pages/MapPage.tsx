import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import { sampleListings, CITIES } from "@/lib/data";
import { HiOutlineMap } from "react-icons/hi";

const MapPage = () => {
  const [cityFilter, setCityFilter] = useState("");
  const listings = useMemo(() => {
    let r = sampleListings.filter(l => l.isApproved && l.status === "Available");
    if (cityFilter) r = r.filter(l => l.city === cityFilter);
    return r;
  }, [cityFilter]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-6">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 font-display text-xl font-bold"><HiOutlineMap className="text-primary" size={22} /> Property Map</h1>
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none">
            <option value="">All Cities</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{listings.length} properties</p>
        <div className="mt-4" style={{ height: "calc(100vh - 220px)" }}><MapView listings={listings} className="h-full" /></div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;