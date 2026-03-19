export type PropertyType = "House" | "Room" | "Apartment" | "Bedsitter" | "Shop/Office";
export type City = "Lilongwe" |  "Zomba" | "Dzaleka" ;
export type ListingStatus = "Available" | "Taken";

export interface Listing {
  id: string;
  title: string;
  propertyType: PropertyType;
  bedrooms: number;
  rentPrice: number;
  city: City;
  area: string;
  description: string;
  amenities: string[];
  images: string[];
  contactPhone: string;
  contactWhatsapp: string;
  status: ListingStatus;
  isApproved: boolean;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  landlordName: string;
  lat: number;
  lng: number;
}

export interface Filters {
  city: City | "";
  propertyType: PropertyType | "";
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "";
  search: string;
}
