import { useState } from "react";

import rawData from "./data/properties.json";

import "./App.css";
import type { Property } from "./types/property";

import FilterPanel from "./components/FilterPanel";
import { usePropertyFilter } from "./hooks/usePropertyFilter";
import GridView from "./components/GridView";
import CardView from "./components/CardView";

const propertiesData = rawData as Property[];

function App() {
  const { filteredData, onChange } = usePropertyFilter(propertiesData);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="w-full flex p-5 items-center ">
      <div className="w-1/4">
        <FilterPanel onChange={onChange} />
      </div>
      <div
        className="w-3/4 ps-4 overflow-auto"
        style={{ height: "calc(100vh - 40px)" }}
      >
        {filteredData.length} filtered Properties
        <button
          className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowGrid(!showGrid)}
        >
          Switch to {showGrid ? "Card" : "Grid"} View
        </button>
        {showGrid ? (
          <GridView properties={filteredData} />
        ) : (
          <CardView properties={filteredData} />
        )}
      </div>
    </div>
  );
}

export default App;
