import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import MapView from "@/components/MapView";
import { ReportDialog } from "@/components/ReportDialog";
import { useApi } from "@/lib/api-provider";
import { useFavorites } from "@/lib/favorites";
import { formatPrice, AMENITY_ICONS } from "@/lib/data";
import { HiOutlineLocationMarker, HiOutlineEye, HiOutlineCalendar, HiOutlinePhone, HiOutlineShare, HiOutlineHeart, HiOutlineFlag, HiHeart } from "react-icons/hi";
import { BedDouble, MessageCircle } from "lucide-react";

const SingleListing = () => {
  const { id } = useParams();
  const { listings, getListingById } = useApi();
  const listing = getListingById(id || "");
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showReport, setShowReport] = useState(false);

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-5xl">😔</p>
            <h1 className="mt-3 font-display text-xl font-bold">Listing Not Found</h1>
            <Link to="/listings" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">← Back</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const fav = isFavorite(listing.id);
  const related = listings.filter((l) => l.id !== listing.id && l.city === listing.city && l.status === "Available").slice(0, 4);
  const whatsappUrl = `https://wa.me/${listing.contactWhatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(`Hi, I'm interested in: "${listing.title}" on Peza Nyumba.`)}`;
  const shareWhatsapp = `https://wa.me/?text=${encodeURIComponent(`Check out: ${listing.title} - ${formatPrice(listing.rentPrice)}/mo. ${window.location.href}`)}`;

  return (
    <div className="flex min-h-screen flex-col pb-20 sm:pb-0">
      <Header />
      <div className="container py-6">
        <Link to="/listings" className="text-xs text-muted-foreground hover:text-primary transition-colors">← Back to listings</Link>

        <div className="mt-3 aspect-video overflow-hidden rounded-xl border border-border bg-secondary">
          {listing.images[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">🏠</div>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold">{listing.title}</h1>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <HiOutlineLocationMarker size={15} className="text-primary" /> {listing.area}, {listing.city}
              </p>
            </div>
            <button onClick={() => toggleFavorite(listing.id)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-all active:scale-90 hover:border-primary/30">
              {fav ? <HiHeart size={20} className="text-destructive" /> : <HiOutlineHeart size={20} className="text-muted-foreground" />}
            </button>
          </div>

          <p className="mt-4 font-display text-3xl font-bold text-primary">
            {formatPrice(listing.rentPrice)}
            <span className="text-base font-normal text-muted-foreground">/month</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-lg bg-secondary border border-border px-3 py-1.5 text-muted-foreground">{listing.propertyType}</span>
            {listing.bedrooms > 0 && (
              <span className="flex items-center gap-1 rounded-lg bg-secondary border border-border px-3 py-1.5 text-muted-foreground">
                <BedDouble size={14} /> {listing.bedrooms} Bed{listing.bedrooms > 1 ? "s" : ""}
              </span>
            )}
            <span className="flex items-center gap-1 rounded-lg bg-secondary border border-border px-3 py-1.5 text-muted-foreground">
              <HiOutlineEye size={14} /> {listing.viewCount}
            </span>
            <span className="flex items-center gap-1 rounded-lg bg-secondary border border-border px-3 py-1.5 text-muted-foreground">
              <HiOutlineCalendar size={14} /> {listing.createdAt}
            </span>
            {listing.status === "Taken" && (
              <span className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-1.5 font-bold text-destructive">TAKEN</span>
            )}
          </div>

          <div className="mt-6">
            <h2 className="font-display font-bold">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{listing.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="font-display font-bold">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((a) => (
                <span key={a} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/80">
                  {AMENITY_ICONS[a] || "✅"} {a}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-display font-bold">Location</h2>
            <div className="mt-3"><MapView listings={[listing]} className="h-[250px]" /></div>
          </div>

          <div className="mt-6 hidden sm:block rounded-xl border border-border bg-card p-5">
            <h2 className="font-display font-bold">Contact Landlord</h2>
            <p className="mt-1 text-sm text-muted-foreground">👤 {listing.landlordName}</p>
            <div className="mt-3 flex gap-3">
              <a href={`tel:${listing.contactPhone}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                <HiOutlinePhone size={18} /> Call
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-foreground transition-all hover:shadow-lg hover:shadow-whatsapp/20">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <a href={shareWhatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <HiOutlineShare size={14} /> Share
            </a>
            <button onClick={() => setShowReport(true)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all">
              <HiOutlineFlag size={14} /> Report
            </button>
          </div>
        </div>

        <ReportDialog
          open={showReport}
          onOpenChange={setShowReport}
          listingId={listing.id}
          listingTitle={listing.title}
        />

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-bold">More in {listing.city}</h2>
            <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-4">{related.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border glass p-3 sm:hidden safe-area-bottom">
        <div className="flex gap-2">
          <a href={`tel:${listing.contactPhone}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground">
            <HiOutlinePhone size={18} /> Call
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-foreground">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleListing;