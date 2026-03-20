import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { listingsApi } from "./api";
import { Listing } from "./types";

interface ApiContextType {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  refreshListings: () => Promise<void>;
  getListingById: (id: string) => Listing | undefined;
}

const ApiContext = createContext<ApiContextType | null>(null);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadListings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await listingsApi.getAll();
      setListings(data.listings || []);
    } catch (err: any) {
      console.error("[ApiProvider] Failed to load listings:", err);
      setError(err.message || "Failed to load listings from server");
      setListings([]);
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
    <ApiContext.Provider value={{ listings, isLoading, error, refreshListings, getListingById }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used within ApiProvider");
  return ctx;
}
