import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES, PROPERTY_TYPES } from "@/lib/data";
import { HiOutlineSearch, HiOutlineAcademicCap, HiOutlineHome } from "react-icons/hi";
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
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={imagebg} 
          alt="Modern home interior" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay - dark to light */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" /> */}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px]" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

      <div className="container relative py-20 sm:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-xs font-medium text-white">
              <HiOutlineAcademicCap size={14} /> Students • Families • Professionals
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white animate-fade-in">
            Find Your <span className="text-primary">Perfect</span><br />
            <span className="text-white/90">Home in</span> <span className="text-accent">Malawi</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed animate-fade-in">
            Discover affordable rental properties across Lilongwe, Zomba, and Dzaleka. 
            Connect directly with landlords — no agency fees, no hassle.
          </p>

          {/* Search Box */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl p-2 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 animate-fade-in">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 rounded-2xl px-5 py-4 text-sm bg-white/95 border border-border shadow-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              <option value="">Select City</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="flex-1 rounded-2xl px-5 py-4 text-sm bg-white/95 border border-border shadow-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              <option value="">Property Type</option>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <HiOutlineSearch size={18} /> Search
            </button>
          </div>

          {/* Quick Tags */}
          <div className="mt-8 flex flex-wrap gap-2 animate-fade-in">
            <span className="text-xs text-white/60 self-center mr-2">Popular:</span>
            {["Dzaleka", "Zomba", "Lilongwe", "Rooms"].map(tag => (
              <button
                key={tag}
                onClick={() => { if (tag.startsWith("Rooms")) navigate("/listings?type=Room"); else navigate(`/listings?city=${tag}`); }}
                className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-xs font-medium text-white transition-all hover:text-primary hover:border-primary/50 hover:bg-white/20 hover:backdrop-blur-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;