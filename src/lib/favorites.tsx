import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { favoritesApi } from "./api";
import { useAuth } from "./auth";
import { useToast } from "@/hooks/use-toast";

export interface FavoriteListing {
  id: string;
  createdAt: string;
  listing: {
    id: string;
    title: string;
    propertyType: string;
    bedrooms: number;
    rentPrice: number;
    city: string;
    area: string;
    description: string;
    amenities: string[];
    images: string[];
    contactPhone: string;
    contactWhatsapp: string;
    status: string;
    isApproved: boolean;
    isFeatured: boolean;
    viewCount: number;
    createdAt: string;
    lat: number | null;
    lng: number | null;
  };
}

interface FavoritesContextType {
  favorites: FavoriteListing[];
  isLoading: boolean;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavorites = async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }

    try {
      setIsLoading(true);
      const data = await favoritesApi.getAll();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [isAuthenticated]);

  const toggleFavorite = async (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      const isFav = isFavorite(id);

      if (isFav) {
        await favoritesApi.remove(id);
        setFavorites(prev => prev.filter(f => f.listing.id !== id));
      } else {
        await favoritesApi.add(id);
        // Reload to get the full listing data
        await loadFavorites();
        toast({
          title: "Added to favorites",
          description: "Property saved successfully",
        });
      }
    } catch (error: any) {
      console.error("Failed to toggle favorite:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => f.listing.id === id);
  };

  const refreshFavorites = async () => {
    await loadFavorites();
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading, toggleFavorite, isFavorite, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
