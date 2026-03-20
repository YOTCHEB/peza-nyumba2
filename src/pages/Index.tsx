import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import ListingCard from "@/components/ListingCard";
import { useApi } from "@/lib/api-provider";
import { Link } from "react-router-dom";
import { HiOutlineSearch, HiOutlinePhotograph, HiOutlinePhone, HiOutlineStar, HiOutlineClock, HiOutlineAcademicCap, HiOutlineUserGroup } from "react-icons/hi";

const Index = () => {
  const { listings } = useApi();
  const featured = listings.filter((l) => l.isFeatured && l.status === "Available");
  const latest = listings.filter((l) => l.isApproved && l.status === "Available").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1"> {/* Offset for fixed header */}
        <div className="pt-16">
          <HeroSearch />

        {/* How It Works */}
        <section className="border-t border-border/60 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container py-16">
          <h2 className="text-center font-display text-2xl font-bold tracking-tight">How It Works</h2>
          <p className="text-center text-sm text-muted-foreground mt-2.5">Three simple steps to your new home</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: <HiOutlineSearch size={26} className="text-primary" />, title: "Search", desc: "Browse houses by city, type, and price. Filter for student rooms, family homes, or business spaces.", num: "01" },
              { icon: <HiOutlinePhotograph size={26} className="text-primary" />, title: "View Details", desc: "See photos, amenities, location on map, and full property info before contacting.", num: "02" },
              { icon: <HiOutlinePhone size={26} className="text-primary" />, title: "Contact", desc: "Call or WhatsApp the landlord directly. No middlemen, no agency fees.", num: "03" },
            ].map((step) => (
              <div key={step.num} className="group rounded-2xl border border-border/60 bg-card p-7 transition-all hover:border-primary/30 hover:shadow-soft-lg hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform">{step.icon}</div>
                  <span className="font-display text-4xl font-bold text-muted/30">{step.num}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-lg">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Banner */}
      <section className="border-t border-border/60">
        <div className="container py-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-border/60 bg-gradient-to-br from-accent/5 to-primary/5 p-8 shadow-soft">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 shadow-sm">
              <HiOutlineAcademicCap size={32} className="text-accent" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-display text-xl font-bold">Students & Young Professionals</h3>
              <p className="text-sm text-muted-foreground mt-2">Finding a room near Zomba, Lilongwe or Dzaleka? We have affordable rooms close to universities and city centers.</p>
            </div>
            <Link to="/listings?type=Room" className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-md hover:shadow-primary/25 hover:-translate-y-0.5">Find Rooms →</Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="border-t">
          <div className="container py-10">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold"><HiOutlineStar className="text-primary" size={22} /> Featured</h2>
              <Link to="/listings" className="text-sm font-medium text-primary hover:underline">View all →</Link>
            </div>
            <div className="mt-5 grid gap-4 grid-cols-2 sm:grid-cols-4">{featured.slice(0, 4).map((l) => <ListingCard key={l.id} listing={l} />)}</div>
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="border-t">
        <div className="container py-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><HiOutlineClock className="text-accent" size={22} /> Latest</h2>
            <Link to="/listings" className="text-sm font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-5 grid gap-4 grid-cols-2 sm:grid-cols-3">{latest.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t">
        <div className="container py-10">
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: `${listings.length}+`, label: "Listings" },
              { val: "5", label: "Cities" },
              { val: "500+", label: "Happy Tenants" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-primary">{s.val}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;