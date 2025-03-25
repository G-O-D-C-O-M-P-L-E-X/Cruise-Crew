import React, { useState, useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import BikeCard from "../components/BikeCard";
import bg from "../../public/bg/bgfinall.jpg";
import s1 from "../../public/sports/1.jpg";
import s2 from "../../public/sports/2.png";
import s3 from "../../public/sports/3.jpg";
import s4 from "../../public/sports/4.jpg";
import s5 from "../../public/sports/5.png";

const bikes = [
  { name: "Royal Enfield", image: s1, rentPerDay: 1500 },
  { name: "KTM Duke 390", image: s2, rentPerDay: 1200 },
  { name: "Yamaha R1", image: s3, rentPerDay: 1800 },
  { name: "Honda CBR", image: s4, rentPerDay: 1000 },
  { name: "Suzuki GSX-R1000", image: s5, rentPerDay: 2000 },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });

  const searchBoxRef = useRef(null);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      setLocation(places[0].formatted_address);
    }
  };

  // Filter bikes based on search query, price range, and sorting
  const filteredBikes = bikes
    .filter(
      (bike) =>
        bike.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        bike.rentPerDay <= priceRange
    )
    .sort((a, b) =>
      sortOrder === "lowToHigh" ? a.rentPerDay - b.rentPerDay : b.rentPerDay - a.rentPerDay
    );

  return (
    <div>
      <div className="relative justify-center flex flex-col w-full font-syne lg:h-screen">
        <img className="relative lg:absolute w-full h-full object-cover" src={bg} alt="Background" />
        <div className="relative flex lg:bg-inherit text-slate-800 lg:ml-20 justify-center flex-col backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
          {/* Search for Bike */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Get Your Bike Now</label>
            <input
              type="text"
              placeholder="Search for a bike..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 text-gray-700 rounded-2xl focus:ring-2 border-[3px] border-black"
            />
          </div>
          {/* Pickup & Drop-off Date Inputs */}
          <div className="flex flex-row">
            <div className="mb-2 w-1/2 mr-2">
              <label className="block font-semibold mb-1">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full p-3 text-gray-700 border-[3px] border-black rounded-2xl focus:ring-2"
              />
            </div>
            <div className="mb-2 ml-2 w-1/2">
              <label className="block font-semibold mb-1">Drop-off Date</label>
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full p-3 border-[3px] border-black text-gray-700 rounded-2xl focus:ring-2"
              />
            </div>
          </div>
          {/* Location Input using Google Places API */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Location</label>
            {isLoaded ? (
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="border-[3px] border-black text-gray-700 p-2 w-full rounded-2xl"
                />
              </StandaloneSearchBox>
            ) : (
              <p>Loading location search...</p>
            )}
          </div>
          {/* Price Range Filter */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Price Range: Rs.{priceRange}</label>
            <input
              type="range"
              min="1000"
              max="2000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none h-2 bg-black rounded-2xl"
              style={{ accentColor: "black" }}
            />
          </div>
          {/* Sorting Options */}
          <div className="text-gray-700 mb-2">
            <label className="block font-semibold text-white mb-1">Sort by Price</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-3 border-[3px] border-black rounded-2xl focus:ring-2"
            >
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <button className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900">
            Search
          </button>
        </div>
      </div>
      {/* Display Filtered Bikes */}
      <div className="bg-white mt-20 min-h-screen">
        <div className="flex flex-wrap justify-center">
          {filteredBikes.map((item, index) => (
            <div key={index} className="m-3">
              <BikeCard name={item.name} rent={item.rentPerDay} image={item.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

