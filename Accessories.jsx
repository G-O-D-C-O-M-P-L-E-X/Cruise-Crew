import React, { useState, useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import BikeCard from "../components/BikeCard";
import bg from "../../public/bg/bg-accessories1.jpg";
import g1 from '../../public/gear/1.avif'
import g2 from '../../public/gear/2.jpg' 
import g3 from '../../public/gear/3.avif'
import g4 from '../../public/gear/4.jpg'
import g5 from '../../public/gear/6.avif'

const accessories = [
  { name: "Royal Enfield", image: g1, rentPerDay: 1500 },
  { name: "Yamaha R1", image: g3, rentPerDay: 1800 },
  { name: "Suzuki GSX-R1000", image: g5, rentPerDay: 2000 },
  { name: "Royal Enfield", image: g2, rentPerDay: 1500 },
  { name: "Yamaha R1", image: g3, rentPerDay: 1800 },
  { name: "Suzuki GSX-R1000", image: g4, rentPerDay: 2000 },
];

export default function Accessories() {
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

  const filteredBikes = accessories
    .filter((bike) =>
      bike.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      bike.rentPerDay <= priceRange
    )
    .sort((a, b) => (sortOrder === "lowToHigh" ? a.rentPerDay - b.rentPerDay : b.rentPerDay - a.rentPerDay));

  return (
    <div>
      <div className="relative justify-center flex flex-col w-full font-syne lg:h-screen">
        <img className="relative lg:absolute w-full h-full object-cover" src={bg} alt="Background" />
        <div className="relative flex lg:bg-inherit text-slate-800 lg:ml-20 justify-center flex-col backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
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
          <div className="mb-2">
            <label className="block font-semibold mb-1">Location</label>
            {isLoaded ? (
              <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)} onPlacesChanged={onPlacesChanged}>
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
            />
          </div>
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
        </div>
      </div>
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
