import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import MapView from "@/components/MapView";
import { useApi } from "@/lib/api-provider";
import { Filters, City, PropertyType, Listing } from "@/lib/types";
import { HiOutlineFilter, HiOutlineMap, HiOutlineViewGrid } from "react-icons/hi";

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const { listings, isLoading } = useApi();
  const [filters, setFilters] = useState<Filters>({ city: (searchParams.get("city") as City) || "", propertyType: (searchParams.get("type") as PropertyType) || "", minPrice: 0, maxPrice: 0, bedrooms: "", search: searchParams.get("q") || "" });
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const filtered = useMemo(() => {
    let r: Listing[] = listings.filter((l) => l.isApproved);
    if (filters.city) r = r.filter((l) => l.city === filters.city);
    if (filters.propertyType) r = r.filter((l) => l.propertyType === filters.propertyType);
    if (filters.minPrice) r = r.filter((l) => l.rentPrice >= filters.minPrice);
    if (filters.maxPrice) r = r.filter((l) => l.rentPrice <= filters.maxPrice);
    if (filters.bedrooms) { const b = Number(filters.bedrooms); r = r.filter((l) => b >= 4 ? l.bedrooms >= 4 : l.bedrooms === b); }
    if (filters.search) { const q = filters.search.toLowerCase(); r = r.filter((l) => l.title.toLowerCase().includes(q) || l.area.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)); }
    if (sortBy === "newest") r.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sortBy === "price-low") r.sort((a, b) => a.rentPrice - b.rentPrice);
    else if (sortBy === "price-high") r.sort((a, b) => b.rentPrice - a.rentPrice);
    return r;
  }, [listings, filters, sortBy]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Loading listings...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-16">
          <div className="container flex-1 py-6">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-xl font-bold">Explore Listings</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              {viewMode === "grid" ? <><HiOutlineMap size={14} /> Map</> : <><HiOutlineViewGrid size={14} /> Grid</>}
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground sm:hidden hover:text-foreground hover:bg-secondary transition-all">
              <HiOutlineFilter size={14} /> Filters
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground focus:outline-none">
              <option value="newest">Newest</option><option value="price-low">Price: Low → High</option><option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>
        <input type="text" placeholder="Search by area, title, university..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="mt-3 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <div className="mt-4 flex gap-6">
          <div className="hidden w-56 shrink-0 sm:block"><FilterBar filters={filters} onChange={setFilters} /></div>
          {showFilters && (
            <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm sm:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t bg-card p-4 animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />
                <FilterBar filters={filters} onChange={(f) => { setFilters(f); setShowFilters(false); }} />
              </div>
            </div>
          )}
          <div className="flex-1">
            <p className="mb-3 text-xs text-muted-foreground">{filtered.length} listing{filtered.length !== 1 ? "s" : ""} found</p>
            {viewMode === "map" ? <MapView listings={filtered} className="h-[60vh]" /> : filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground"><p className="text-4xl">😔</p><p className="mt-2 font-display font-bold text-foreground">No listings found</p><p className="text-sm">Try adjusting your filters</p></div>
            ) : (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">{filtered.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
            )}
          </div>
        </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingsPage;