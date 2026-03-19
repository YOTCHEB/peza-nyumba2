import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { sampleListings, formatPrice, CITIES, PROPERTY_TYPES, AMENITY_OPTIONS } from "@/lib/data";
import { Listing, PropertyType, City } from "@/lib/types";
import { Home, Eye, Check, Plus, Edit, Trash2, X } from "lucide-react";

const LandlordDashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>(sampleListings.filter((l) => l.landlordName === user?.fullName || l.id <= "3"));
  const [editing, setEditing] = useState<Listing | null>(null);
  const [showForm, setShowForm] = useState(false);
  const totalViews = listings.reduce((s, l) => s + l.viewCount, 0);
  const available = listings.filter((l) => l.status === "Available").length;
  const emptyListing: Partial<Listing> = { title: "", propertyType: "House", bedrooms: 1, rentPrice: 0, city: "Lilongwe", area: "", description: "", amenities: [], images: [], contactPhone: user?.phone || "", contactWhatsapp: user?.phone || "", status: "Available", isApproved: false, isFeatured: false, viewCount: 0, createdAt: new Date().toISOString().split("T")[0], landlordName: user?.fullName || "", lat: -13.9626, lng: 33.7741 };
  const [form, setForm] = useState<Partial<Listing>>(emptyListing);
  const openAdd = () => { setEditing(null); setForm(emptyListing); setShowForm(true); };
  const openEdit = (l: Listing) => { setEditing(l); setForm(l); setShowForm(true); };
  const handleSave = () => { if (!form.title || !form.area || !form.rentPrice) return; if (editing) { setListings(listings.map((l) => l.id === editing.id ? { ...l, ...form } as Listing : l)); } else { setListings([{ ...form, id: `new-${Date.now()}` } as Listing, ...listings]); } setShowForm(false); };
  const toggleStatus = (id: string) => setListings(listings.map((l) => l.id === id ? { ...l, status: l.status === "Available" ? "Taken" : "Available" } as Listing : l));
  const deleteListing = (id: string) => setListings(listings.filter((l) => l.id !== id));
  const toggleAmenity = (a: string) => { const c = form.amenities || []; setForm({ ...form, amenities: c.includes(a) ? c.filter((x) => x !== a) : [...c, a] }); };

  if (!user || user.role !== "landlord") {
    return (<div className="flex min-h-screen flex-col"><Header /><div className="container flex flex-1 items-center justify-center"><div className="text-center"><Home size={48} className="mx-auto text-muted-foreground" /><h1 className="mt-3 text-xl font-extrabold">Landlord Access Only</h1><Link to="/login" className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Login →</Link></div></div><Footer /></div>);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold">My Dashboard</h1>
          <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground active:scale-95"><Plus size={16} /> Add Listing</button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[{ l: "My Listings", v: listings.length, i: <Home size={22} className="text-primary" /> }, { l: "Available", v: available, i: <Check size={22} className="text-primary" /> }, { l: "Total Views", v: totalViews, i: <Eye size={22} className="text-primary" /> }].map(s => (
            <div key={s.l} className="rounded-xl border-2 p-4 text-center"><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{s.i}</div><p className="mt-1 text-xl font-extrabold">{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/50 p-4 pt-16" onClick={() => setShowForm(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between"><h2 className="text-lg font-extrabold">{editing ? "Edit Listing" : "Add New Listing"}</h2><button onClick={() => setShowForm(false)} className="rounded-lg p-1 hover:bg-secondary"><X size={20} /></button></div>
              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                <div><label className="text-xs font-medium">Title *</label><input type="text" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium">Type</label><select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value as PropertyType })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm">{PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  <div><label className="text-xs font-medium">Bedrooms</label><input type="number" min={0} value={form.bedrooms || 0} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium">Rent (MK) *</label><input type="number" value={form.rentPrice || ""} onChange={(e) => setForm({ ...form, rentPrice: Number(e.target.value) })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                  <div><label className="text-xs font-medium">City</label><select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value as City })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm">{CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                </div>
                <div><label className="text-xs font-medium">Area *</label><input type="text" value={form.area || ""} onChange={(e) => setForm({ ...form, area: e.target.value })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                <div><label className="text-xs font-medium">Description</label><textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                <div><label className="text-xs font-medium">Amenities</label><div className="mt-1 flex flex-wrap gap-2">{AMENITY_OPTIONS.map(a => (<button key={a} type="button" onClick={() => toggleAmenity(a)} className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${(form.amenities || []).includes(a) ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{a}</button>))}</div></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium">Phone</label><input type="tel" value={form.contactPhone || ""} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                  <div><label className="text-xs font-medium">WhatsApp</label><input type="tel" value={form.contactWhatsapp || ""} onChange={(e) => setForm({ ...form, contactWhatsapp: e.target.value })} className="mt-1 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" /></div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleSave} className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground">{editing ? "Save Changes" : "Submit for Approval"}</button>
                <button onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-3 text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 space-y-3">
          {listings.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-10 text-center text-muted-foreground"><Home size={40} className="mx-auto opacity-30" /><p className="mt-3 font-bold">No listings yet</p></div>
          ) : listings.map(l => (
            <div key={l.id} className="flex items-center gap-3 rounded-xl border-2 p-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">{l.images[0] ? <img src={l.images[0]} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-2xl">🏠</div>}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate">{l.title}</h3>
                <p className="text-xs text-muted-foreground">{formatPrice(l.rentPrice)} · {l.viewCount} views</p>
                <div className="mt-1 flex gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${l.status === "Available" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{l.status}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${l.isApproved ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{l.isApproved ? "Approved" : "Pending"}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                <button onClick={() => openEdit(l)} className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs hover:bg-secondary"><Edit size={12} /> Edit</button>
                <button onClick={() => toggleStatus(l.id)} className="rounded-lg border px-2.5 py-1.5 text-xs hover:bg-secondary">{l.status === "Available" ? "Taken" : "Available"}</button>
                <button onClick={() => deleteListing(l.id)} className="rounded-lg border px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandlordDashboard;
