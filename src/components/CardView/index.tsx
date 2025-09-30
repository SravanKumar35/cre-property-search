import React from "react";
import type { Property } from "../../types/property";
import PropertyCard from "../PropertyCard";

interface CardViewProps {
  properties: Property[];
}

function CardView({ properties }: CardViewProps) {
  return (
    <div>
      {properties.map((property: Property) => {
        return <PropertyCard key={property.id} {...property} />;
      })}
    </div>
  );
}

export default React.memo(CardView);
