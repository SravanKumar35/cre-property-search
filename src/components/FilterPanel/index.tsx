import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Autocomplete,
  Checkbox,
  ListItemText,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import type { FilterValues } from "../../types/filters";

const PROPERTY_TYPES = ["office", "retail", "industrial", "warehouse"];
const SORT_OPTIONS = [
  { value: "price", label: "Price" },
  { value: "size", label: "Size" },
  { value: "date_listed", label: "Date Listed" },
];

// Example amenities, ideally should be fetched from data
const AMENITIES = [
  "Parking",
  "Fiber Optic",
  "Fire Safety",
  "Private Offices",
  "Truck Access",
  "Retail Frontage",
  "Conference Rooms",
  "Natural Light",
  "Elevator",
  "Office Space",
  "Drive-Through",
  "Restrooms",
  "Generator Backup",
  "Handicap Accessible",
  "Reception Area",
  "Sprinkler System",
  "Loading Dock",
  "Security System",
  "Outdoor Space",
  "Signage Rights",
  "High-Speed Internet",
  "Warehouse Space",
  "Kitchen Facilities",
  "Shipping Receiving",
  "ADA Compliant",
  "Open Floor Plan",
  "Climate Control",
  "Storage Space",
  "Break Room",
  "High Ceiling",
];

// Example locations, ideally should be fetched from data
const LOCATIONS = [
  "San Jose",
  "Denver",
  "Nashville",
  "Oklahoma City",
  "San Francisco",
  "Charlotte",
  "San Antonio",
  "Los Angeles",
  "Austin",
  "New York",
  "Seattle",
  "Dallas",
  "Indianapolis",
  "Chicago",
  "Houston",
  "Columbus",
  "Philadelphia",
];

function FilterPanel({
  onChange,
}: {
  onChange?: (filters: Partial<FilterValues>) => void;
}) {
  // Filter states
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [sizeRange, setSizeRange] = useState<number[]>([0, 500000]);
  const [location, setLocation] = useState<string | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("date_listed");

  // Clear all filters
  const handleClearAll = () => {
    setSearch("");
    setPropertyType([]);
    setPriceRange([0, 100]);
    setSizeRange([0, 500000]);
    setLocation(null);
    setAmenities([]);
    setSortBy("date_listed");
    if (onChange) onChange({});
  };

  // Notify parent on filter change
  React.useEffect(() => {
    if (onChange) {
      onChange({
        search: debouncedSearch,
        propertyType,
        priceRange,
        sizeRange,
        location,
        amenities,
        sortBy,
      });
    }
  }, [
    debouncedSearch,
    propertyType,
    priceRange,
    sizeRange,
    location,
    amenities,
    sortBy,
  ]);

  return (
    <div style={{ borderRadius: 2 }}>
      <Stack spacing={2}>
        {/* Search Bar */}
        <TextField
          label="Search properties"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        {/* Property Type Filter */}
        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select
            multiple
            value={propertyType}
            onChange={(e) =>
              setPropertyType(
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : (e.target.value as string[])
              )
            }
            label="Property Type"
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {PROPERTY_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={propertyType.indexOf(type) > -1} />
                <ListItemText
                  primary={type.charAt(0).toUpperCase() + type.slice(1)}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range Slider */}
        <div>
          <InputLabel>Price Range ($/sqft)</InputLabel>
          <Slider
            value={priceRange}
            onChange={(_, val) => setPriceRange(val as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
          />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
              label="Min"
              type="number"
              size="small"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              style={{ width: 100 }}
            />
            <TextField
              label="Max"
              type="number"
              size="small"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              style={{ width: 100 }}
            />
          </Stack>
        </div>

        {/* Size Range Slider */}
        <div>
          <InputLabel>Size Range (sqft)</InputLabel>
          <Slider
            value={sizeRange}
            onChange={(_, val) => setSizeRange(val as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={500000}
            step={100}
          />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
              label="Min"
              type="number"
              size="small"
              value={sizeRange[0]}
              onChange={(e) =>
                setSizeRange([Number(e.target.value), sizeRange[1]])
              }
              style={{ width: 100 }}
            />
            <TextField
              label="Max"
              type="number"
              size="small"
              value={sizeRange[1]}
              onChange={(e) =>
                setSizeRange([sizeRange[0], Number(e.target.value)])
              }
              style={{ width: 100 }}
            />
          </Stack>
        </div>

        {/* Location Dropdown/Search */}
        <Autocomplete
          options={LOCATIONS}
          value={location}
          onChange={(_, val) => setLocation(val)}
          renderInput={(params) => (
            <TextField {...params} label="Location" variant="outlined" />
          )}
          fullWidth
          freeSolo
        />

        {/* Amenities Multi-select */}
        <FormControl fullWidth>
          <InputLabel>Amenities</InputLabel>
          <Select
            multiple
            value={amenities}
            onChange={(e) =>
              setAmenities(
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : (e.target.value as string[])
              )
            }
            label="Amenities"
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {AMENITIES.map((amenity) => (
              <MenuItem key={amenity} value={amenity}>
                <Checkbox checked={amenities.indexOf(amenity) > -1} />
                <ListItemText primary={amenity} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort By */}
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear All Filters */}
        <Button variant="outlined" color="secondary" onClick={handleClearAll}>
          Clear All Filters
        </Button>
      </Stack>
    </div>
  );
}

export default FilterPanel;
