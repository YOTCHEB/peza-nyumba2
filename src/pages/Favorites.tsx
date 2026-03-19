import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { useFavorites } from "@/lib/favorites";
import { sampleListings } from "@/lib/data";
import { HiOutlineHeart } from "react-icons/hi";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();
  const saved = sampleListings.filter(l => favorites.includes(l.id));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-6">
        <h1 className="flex items-center gap-2 font-display text-xl font-bold"><HiOutlineHeart className="text-destructive" size={22} /> Saved Listings</h1>
        <p className="mt-1 text-sm text-muted-foreground">{saved.length} saved</p>
        {saved.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
            <HiOutlineHeart size={40} className="mx-auto text-muted-foreground/30" />
            <p className="mt-3 font-display font-bold text-foreground">No saved listings yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Tap the heart icon on any listing to save it</p>
            <Link to="/listings" className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">Browse Listings</Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3">{saved.map(l => <ListingCard key={l.id} listing={l} />)}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;