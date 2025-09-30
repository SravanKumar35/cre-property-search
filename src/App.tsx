import { useState } from "react";

import rawData from "./data/properties.json";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import type { Property } from "./types/property";
import PropertyGrid from "./components/PropertyGrid";
import PropertyCard from "./components/PropertyCard";

const propertiesData = rawData as Property[];

function App() {
  const [count, setCount] = useState(0);

  const [showGrid, setShowGrid] = useState(true);

  return (
    <>
      <button
        className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowGrid(!showGrid)}
      >
        Switch to {showGrid ? "Card" : "Grid"} View
      </button>

      {showGrid ? (
        <div
          className="grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-5"
        >
          {propertiesData.map((property: Property) => {
            return <PropertyGrid key={property.id} {...property} />;
          })}
        </div>
      ) : (
        <div>
          {propertiesData.map((property: Property) => {
            return <PropertyCard key={property.id} {...property} />;
          })}
          {propertiesData.length} properties loaded.
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      )}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
