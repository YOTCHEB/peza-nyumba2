import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES, PROPERTY_TYPES } from "@/lib/data";
import { HiOutlineSearch, HiOutlineAcademicCap } from "react-icons/hi";
import imagebg from "@/assets/images/bg1.jpg";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (propertyType) params.set("type", propertyType);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <img src={imagebg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
     

      <div className="container relative py-14 sm:py-24">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <HiOutlineAcademicCap size={14} /> Students • Families • Everyone
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight">
          Find Your <span className="text-primary">Perfect</span><br />
          Home in <span className="text-accent">Malawi</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-white max-w-lg leading-relaxed">
          Students at UNIMA, LUANAR, Mzuzu Uni — or anyone struggling to find affordable housing in Lilongwe, Zomba, Dzaleka & beyond.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-2 max-w-xl">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3.5 text-sm bg-secondary border border-border font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="">Select City</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3.5 text-sm bg-secondary border border-border font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="">Property Type</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
          >
            <HiOutlineSearch size={18} /> Search
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Dzaleka", "Zomba", "Lilongwe", "Rooms"].map(tag => (
            <button
              key={tag}
              onClick={() => { if (tag.startsWith("Rooms")) navigate("/listings?type=Room"); else navigate(`/listings?city=${tag}`); }}
              className="rounded-full border border-border bg-secondary/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:text-primary hover:border-primary/30 hover:bg-primary/5"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;