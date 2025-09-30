import { useEffect, useRef, useState } from "react";

import "./App.css";
import type { Property } from "./types/property";

import FilterPanel from "./components/FilterPanel";
import { usePropertyFilter } from "./hooks/usePropertyFilter";
import GridView from "./components/GridView";
import CardView from "./components/CardView";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const [propertiesData, setPropertiesData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const [showGrid, setShowGrid] = useState(isMobile);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // load 50 properties at a time
  const { filteredData, onChange } = usePropertyFilter(propertiesData);

  const paginatedData = filteredData.slice(0, currentPage * itemsPerPage);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const response = await fetch("/data/properties.json");
      const data: Property[] = await response.json();

      setPropertiesData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight;
      const threshold = container.scrollHeight - 100; // 100px before bottom

      if (
        scrollPosition >= threshold &&
        currentPage < Math.ceil(filteredData.length / itemsPerPage)
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, filteredData]);

  return (
    <>
      {loading ? (
        <div className="p-4">Loading properties...</div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row p-5 items-center ">
          <div className="w-full lg:w-1/4 pr-4">
            <FilterPanel onChange={onChange} />
          </div>
          <div
            ref={scrollContainerRef}
            className="w-full mt-5 lg:mt-0 lg:w-3/4 pl-5 overflow-auto lg:[height:calc(100vh-40px)]"
          >
            <div className="flex items-center justify-between w-full mb-5">
              <span className="mr-3">
                {filteredData.length} filtered Properties
              </span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowGrid(!showGrid)}
              >
                Switch to {showGrid ? "Card" : "Grid"} View
              </button>
            </div>
            {showGrid ? (
              <GridView properties={paginatedData} />
            ) : (
              <CardView properties={paginatedData} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
