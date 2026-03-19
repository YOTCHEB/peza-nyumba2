import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { listingsApi } from "./api";
import { sampleListings } from "@/lib/data";
import { Listing } from "./types";

interface ApiContextType {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  isApiAvailable: boolean;
  refreshListings: () => Promise<void>;
  getListingById: (id: string) => Listing | undefined;
}

const ApiContext = createContext<ApiContextType | null>(null);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiAvailable, setIsApiAvailable] = useState(true);

  const loadListings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await listingsApi.getAll();
      setListings(data.listings || []);
      setIsApiAvailable(true);
    } catch (err) {
      console.warn("API not available, using sample data:", err);
      setIsApiAvailable(false);
      setListings(sampleListings);
      setError(null); // Don't show error when falling back to sample data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const refreshListings = async () => {
    await loadListings();
  };

  const getListingById = (id: string) => {
    return listings.find(l => l.id === id);
  };

  return (
    <ApiContext.Provider value={{ listings, isLoading, error, isApiAvailable, refreshListings, getListingById }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used within ApiProvider");
  return ctx;
}
