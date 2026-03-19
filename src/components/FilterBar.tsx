import { Filters, PropertyType, City } from "@/lib/types";
import { CITIES, PROPERTY_TYPES } from "@/lib/data";
import { HiOutlineFilter, HiOutlineX } from "react-icons/hi";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4">
      <h3 className="flex items-center gap-2 font-display font-bold text-sm"><HiOutlineFilter size={16} className="text-primary" /> Filters</h3>
      <div>
        <label className="text-xs font-medium text-muted-foreground">City</label>
        <select value={filters.city} onChange={(e) => update({ city: e.target.value as City | "" })} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Property Type</label>
        <select value={filters.propertyType} onChange={(e) => update({ propertyType: e.target.value as PropertyType | "" })} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Types</option>
          {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Bedrooms</label>
        <select value={filters.bedrooms} onChange={(e) => update({ bedrooms: e.target.value ? Number(e.target.value) : "" })} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">Any</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4+</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Min Price</label>
          <input type="number" placeholder="MK 0" value={filters.minPrice || ""} onChange={(e) => update({ minPrice: Number(e.target.value) || 0 })} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Max Price</label>
          <input type="number" placeholder="No max" value={filters.maxPrice || ""} onChange={(e) => update({ maxPrice: Number(e.target.value) || 0 })} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>
      <button onClick={() => onChange({ city: "", propertyType: "", minPrice: 0, maxPrice: 0, bedrooms: "", search: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
        <HiOutlineX size={14} /> Clear All
      </button>
    </div>
  );
};

export default FilterBar;