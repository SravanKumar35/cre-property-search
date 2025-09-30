import React from "react";
import type { Property } from "../../types/property";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PropertyCard(property: Property) {
  const [isHovered, setIsHovered] = React.useState(false);

  const onHover = (state: boolean) => {
    setIsHovered(state);
  };

  return (
    <div
      className="max-w-4xl mx-auto my-8 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        height: "330px",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex">
        <div className="w-1/3 relative flex-shrink-0">
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

        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-800">
                  {property.title}
                </h2>
                <div className="text-sm text-gray-500 mt-1">
                  {property.address.street} {property.address.city},{" "}
                  {property.address.state} {property.address.zip}
                </div>
              </div>

              <div className="flex space-x-2 text-gray-400">
                <i className="material-symbols-outlined">add_circle</i>
              </div>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                ${property.price_per_sqft}
              </button>
            </div>

            <div className="flex space-x-4 mt-4 text-sm text-gray-600">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-red-600 mb-1 font-bold">
                  <span className="material-symbols-outlined">square_foot</span>
                </span>
                <div className="text-xs text-gray-500 uppercase">
                  Property Area
                </div>
                <div className="font-semibold text-gray-800">
                  {property.total_sqft} SqFt
                </div>
              </div>

              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-red-600 mb-1 font-bold">
                  <span className="material-symbols-outlined">apartment</span>
                </span>
                <div className="text-xs text-gray-500 uppercase">
                  Property Type
                </div>
                <div className="font-semibold text-gray-800">
                  {property.type}
                </div>
              </div>

              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-red-600 mb-1 font-bold">
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                </span>
                <div className="text-xs text-gray-500 uppercase">
                  Year Built
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">
                    {property.year_built || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4 line-clamp-2">
              {property.description}
            </p>
          </div>

          <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
}

export default React.memo(PropertyCard);
