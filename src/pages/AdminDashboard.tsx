import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { sampleListings, formatPrice } from "@/lib/data";
import { Listing } from "@/lib/types";
import { Home, Eye, Clock, Star, Users, Check, X, Trash2, Shield } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>(sampleListings);
  const [tab, setTab] = useState<"overview" | "listings" | "users">("overview");
  const [filterStatus, setFilterStatus] = useState("all");

  if (!user || user.role !== "admin") {
    return (<div className="flex min-h-screen flex-col"><Header /><div className="container flex flex-1 items-center justify-center"><div className="text-center"><Shield size={48} className="mx-auto text-muted-foreground" /><h1 className="mt-3 text-xl font-extrabold">Admin Access Only</h1><Link to="/login" className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Login →</Link></div></div><Footer /></div>);
  }

  const totalViews = listings.reduce((s, l) => s + l.viewCount, 0);
  const pending = listings.filter((l) => !l.isApproved);
  const featured = listings.filter((l) => l.isFeatured);
  const toggleApproval = (id: string) => setListings(listings.map((l) => l.id === id ? { ...l, isApproved: !l.isApproved } : l));
  const toggleFeatured = (id: string) => setListings(listings.map((l) => l.id === id ? { ...l, isFeatured: !l.isFeatured } : l));
  const deleteListing = (id: string) => setListings(listings.filter((l) => l.id !== id));
  const filteredListings = filterStatus === "all" ? listings : filterStatus === "pending" ? pending : filterStatus === "featured" ? featured : listings.filter((l) => l.status === filterStatus);

  const demoUsers = [
    { name: "James Banda", email: "landlord@test.com", role: "landlord", listings: 3 },
    { name: "Grace Phiri", email: "tenant@test.com", role: "tenant", listings: 0 },
    { name: "Emmanuel Habimana", email: "emmanuel@test.com", role: "landlord", listings: 2 },
    { name: "Mercy Chirwa", email: "mercy@test.com", role: "tenant", listings: 0 },
    { name: "Agnes Nkhoma", email: "agnes@test.com", role: "landlord", listings: 1 },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-6">
        <h1 className="flex items-center gap-2 text-xl font-extrabold"><Shield className="text-primary" size={20} /> Admin Dashboard</h1>
        <div className="mt-4 flex gap-1 rounded-xl border-2 p-1">
          {([["overview", "📊 Overview"], ["listings", "🏠 Listings"], ["users", "👥 Users"]] as const).map(([k, label]) => (
            <button key={k} onClick={() => setTab(k as any)} className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${tab === k ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{label}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[{ l: "Total Listings", v: listings.length, i: <Home size={24} className="text-primary" /> }, { l: "Total Views", v: totalViews.toLocaleString(), i: <Eye size={24} className="text-primary" /> }, { l: "Pending", v: pending.length, i: <Clock size={24} className="text-primary" /> }, { l: "Featured", v: featured.length, i: <Star size={24} className="text-primary" /> }].map(s => (
                <div key={s.l} className="rounded-xl border-2 p-4 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{s.i}</div><p className="mt-2 text-2xl font-extrabold">{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></div>
              ))}
            </div>
            {pending.length > 0 && (
              <div className="mt-6">
                <h2 className="font-extrabold">⏳ Pending Approval</h2>
                <div className="mt-3 space-y-2">{pending.slice(0, 5).map(l => (
                  <div key={l.id} className="flex items-center justify-between rounded-xl border-2 p-4">
                    <div><p className="text-sm font-bold">{l.title}</p><p className="text-xs text-muted-foreground">{formatPrice(l.rentPrice)} · {l.landlordName}</p></div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleApproval(l.id)} className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"><Check size={14} /> Approve</button>
                      <button onClick={() => deleteListing(l.id)} className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs text-destructive"><X size={14} /> Reject</button>
                    </div>
                  </div>
                ))}</div>
              </div>
            )}
            <div className="mt-6">
              <h2 className="font-extrabold">📊 Listings by City</h2>
              <div className="mt-3 space-y-2">{["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Dzaleka"].map(city => {
                const count = listings.filter(l => l.city === city).length;
                const pct = listings.length > 0 ? (count / listings.length) * 100 : 0;
                return (<div key={city} className="flex items-center gap-3"><span className="w-20 text-xs font-medium">{city}</span><div className="flex-1 rounded-full bg-secondary h-6 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${pct}%` }} /></div><span className="text-xs font-bold w-6">{count}</span></div>);
              })}</div>
            </div>
          </div>
        )}

        {tab === "listings" && (
          <div className="mt-6">
            <div className="flex gap-2 overflow-x-auto pb-2">{["all", "pending", "featured", "Available", "Taken"].map(f => (
              <button key={f} onClick={() => setFilterStatus(f)} className={`shrink-0 rounded-full border-2 px-4 py-2 text-xs font-medium transition-colors ${filterStatus === f ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}</div>
            <div className="mt-4 space-y-2">{filteredListings.map(l => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl border-2 p-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">{l.images[0] ? <img src={l.images[0]} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center">🏠</div>}</div>
                <div className="flex-1 min-w-0"><h3 className="text-sm font-bold truncate">{l.title}</h3><p className="text-xs text-muted-foreground">{formatPrice(l.rentPrice)} · {l.city}</p></div>
                <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                  <button onClick={() => toggleApproval(l.id)} className={`rounded-lg border px-2.5 py-1.5 text-xs ${l.isApproved ? "text-destructive" : "text-primary"}`}>{l.isApproved ? "Reject" : "Approve"}</button>
                  <button onClick={() => toggleFeatured(l.id)} className="rounded-lg border px-2.5 py-1.5 text-xs">{l.isFeatured ? "Unfeature" : "⭐ Feature"}</button>
                  <button onClick={() => deleteListing(l.id)} className="rounded-lg border px-2.5 py-1.5 text-xs text-destructive"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}</div>
          </div>
        )}

        {tab === "users" && (
          <div className="mt-6 space-y-2">{demoUsers.map(u => (
            <div key={u.email} className="flex items-center justify-between rounded-xl border-2 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{u.name.charAt(0)}</div>
                <div><p className="text-sm font-bold">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${u.role === "landlord" ? "bg-primary/10 text-primary" : "bg-secondary"}`}>{u.role}</span>
            </div>
          ))}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
