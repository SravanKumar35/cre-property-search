import React from "react";
import type { Property } from "../../types/property";
import Slider from "react-slick";

function PropertyGrid(property: Property) {
  const [isHovered, setIsHovered] = React.useState(false);

  const onHover = (state: boolean) => {
    setIsHovered(state);
  };
  return (
    <div
      key={property.id}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:scale-[1.02] hover:shadow-2xl relative "
    >
      <div className="relative">
        <div className="relative flex-shrink-0">
          {isHovered ? (
            <Slider
              dots={false}
              infinite
              autoplay
              autoplaySpeed={1000}
              speed={1000}
              slidesToShow={1}
              cssEase="linear"
              slidesToScroll={1}
            >
              {property.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Property Image ${index + 1}`}
                    className="object-cover w-full"
                    style={{ height: "330px" }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={property.images?.[0]}
              alt="2 BHK Independent House"
              className="object-cover w-full"
              style={{ height: "330px" }}
            />
          )}

          <div className="absolute top-0 left-0 m-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-semibold rounded-sm">
            {property.images.length} Photos
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-sm">
            Posted: {new Date(property.date_listed).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="text-xl font-bold text-gray-900">{property.title}</div>

        <div className="text-sm text-gray-600"></div>

        <div className="text-sm text-gray-500">
          {property.address.street} {property.address.city},{" "}
          {property.address.state} {property.address.zip}
        </div>

        <p className="text-sm text-gray-600 mt-4 line-clamp-2">
          {property.description}
        </p>

        <div>
          <div className="text-gray-600 mb-1">
            Area:{" "}
            <span className="text-sm text-gray-700 font-bold">
              {property.total_sqft} sq ft
            </span>
          </div>

          <div className="text-gray-600 mb-1">
            Property Type:{" "}
            <span className="text-sm text-gray-700 uppercase font-bold">
              {property.type}
            </span>
          </div>

          <div className="text-gray-600 mb-1">
            <span>
              Year Built:{" "}
              <span className="text-sm text-gray-700 font-bold">
                {property.year_built}
              </span>
            </span>
          </div>
        </div>

        <span className="text-sm font-semibold text-gray-800">
          {/* each amenity as chip  */}
          {property.amenities.map((amenity, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-2 mt-2"
            >
              {amenity}
            </span>
          ))}
        </span>
      </div>
      <div className="mx-3 mt-2">
        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          ${property.price_per_sqft} per sqft
        </button>
      </div>
    </div>
  );
}

export default PropertyGrid;
