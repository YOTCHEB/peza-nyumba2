import { Link } from "react-router-dom";
import { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { HiOutlineLocationMarker, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { BedDouble } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(listing.id);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(listing.id); }}
        className="absolute right-2.5 top-2.5 z-10 flex h-10 w-10 items-center justify-center rounded-full glass border border-border/50 transition-all active:scale-90"
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      >
        {fav ? <HiHeart size={18} className="text-destructive" /> : <HiOutlineHeart size={18} className="text-foreground/70" />}
      </button>

      <Link to={`/listings/${listing.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          {listing.images[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl bg-secondary">🏠</div>
          )}
          {listing.isFeatured && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">Featured</span>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">{listing.title}</h3>
          <p className="mt-2 text-lg font-bold text-primary font-display">
            {formatPrice(listing.rentPrice)}
            <span className="text-xs font-normal text-muted-foreground">/mo</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><HiOutlineLocationMarker size={13} /> {listing.area}, {listing.city}</span>
            {listing.bedrooms > 0 && <span className="flex items-center gap-1"><BedDouble size={13} /> {listing.bedrooms} bed{listing.bedrooms > 1 ? "s" : ""}</span>}
          </div>
          {listing.status === "Taken" && (
            <span className="mt-2 inline-block rounded-full bg-destructive/10 border border-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">TAKEN</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;