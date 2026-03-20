import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import { useApi } from "@/lib/api-provider";
import { HiOutlineMap, HiOutlineFilter } from "react-icons/hi";

const MapPage = () => {
  const [cityFilter, setCityFilter] = useState("");
  const { listings } = useApi();
  
  const filteredListings = useMemo(() => {
    let r = listings.filter(l => l.isApproved && l.status === "Available");
    if (cityFilter) r = r.filter(l => l.city === cityFilter);
    return r;
  }, [listings, cityFilter]);

  const cities = Array.from(new Set(listings.map(l => l.city))).filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="flex-1 relative">
        <div className="border-b bg-card sticky top-16 z-40">
          <div className="container py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="flex items-center gap-2 font-display text-xl font-bold">
                  <HiOutlineMap className="text-primary" size={22} /> 
                  Property Map
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredListings.length} properties available
                </p>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineFilter className="text-muted-foreground" size={18} />
                <select 
                  value={cityFilter} 
                  onChange={e => setCityFilter(e.target.value)} 
                  className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">All Cities</option>
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-140px)]">
          <MapView listings={filteredListings} className="h-full" />
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;