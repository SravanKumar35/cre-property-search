import { useState } from "react";
import type { Property } from "../types/property";
import type { FilterValues } from "../types/filters";

export function usePropertyFilter(propertiesData: Property[]) {
  const [filteredData, setFilteredData] = useState<Property[]>(propertiesData);

  const onChange = (filters: Partial<FilterValues>) => {
    let data = [...propertiesData]; // clone to avoid mutating original

    if (filters.search) {
      const term = filters.search.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      data = data.filter((p) => filters.propertyType!.includes(p.type));
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      data = data.filter(
        (p) => p.price_per_sqft >= min && p.price_per_sqft <= max
      );
    }

    if (filters.sizeRange) {
      const [min, max] = filters.sizeRange;
      data = data.filter((p) => p.total_sqft >= min && p.total_sqft <= max);
    }

    if (filters.location) {
      data = data.filter((p) =>
        JSON.stringify(p.address)
          .toLowerCase()
          .includes(filters.location!.toLowerCase())
      );
    }

    if (filters.amenities && filters.amenities.length > 0) {
      data = data.filter((p) =>
        filters.amenities!.every((a) => p.amenities.includes(a))
      );
    }

    if (filters.sortBy) {
      data = data.sort((a, b) => {
        if (filters.sortBy === "price")
          return a.price_per_sqft - b.price_per_sqft;
        if (filters.sortBy === "size") return a.total_sqft - b.total_sqft;
        if (filters.sortBy === "date_listed")
          return (
            new Date(b.date_listed).getTime() -
            new Date(a.date_listed).getTime()
          );
        return 0;
      });
    }

    setFilteredData(data);
  };

  return { filteredData, onChange };
}
