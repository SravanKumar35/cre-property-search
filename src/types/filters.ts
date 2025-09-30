export interface FilterValues {
  search: string;
  propertyType: string[];
  priceRange: number[];
  sizeRange: number[];
  location: string | null;
  amenities: string[];
  sortBy: string;
}
