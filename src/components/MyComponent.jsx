import React, { useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

export default function LocationSearch() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });

  const searchBoxRef = useRef(null);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      console.log("Selected place:", places[0].formatted_address);
    }
  };

  return isLoaded ? (
    <StandaloneSearchBox
      onLoad={(ref) => (searchBoxRef.current = ref)}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        type="text"
        placeholder="ENTER LOCATION"
        className="border-2  border-black p-2 w-96 rounded-md"
      />
    </StandaloneSearchBox>
  ) : (
    <p>Loading...</p>
  );
}
