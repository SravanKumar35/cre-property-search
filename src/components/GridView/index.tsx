import React from "react";
import type { Property } from "../../types/property";
import PropertyGrid from "../PropertyGrid";

import {} from "react-window";

interface GridViewProps {
  properties: Property[];
}

function GridView({ properties }: GridViewProps) {
  return (
    <div
      className="grid gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3 pl-5"
    >
      {properties.map((property: Property) => {
        return <PropertyGrid key={property.id} {...property} />;
      })}
    </div>
  );
}

export default React.memo(GridView);
