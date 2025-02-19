import { UserLocationContext } from "@/context/UserLocationContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const BusinessItem = ({ business, showDirection = false }) => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const photoRef = business?.photos ? business?.photos[0]?.photo_reference : "";
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [distance, setDistance] = useState();

  useEffect(() => {
    calculateDistance(
      business.geometry.location.lat,
      business.geometry.location.lng,
      userLocation.lat,
      userLocation.lng
    );
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const earthRadius = 6371; // in kilometers

    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lng2 - lng1);

    // The Haversine Formula
    // Calculates the great-circle distance between two points given the latitudes and longitudes
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    // Central Angle
    // Calculates the angular distance between the two points in radians
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance
    // Computes the distance between the two points by multiplying the angular distance by the earth's radius
    const distance = earthRadius * c;

    setDistance(distance.toFixed(1));
    return distance.toFixed(2); // Return the distance with 2 decimal places
  };

  // Gets the direction to the restaurant starting from the user's location and ending at the restaurant's location
  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${business.geometry.location.lat},${business.geometry.location.lng}&travelmode=driving`;

    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col justify-between flex-shrink-0 p-2 rounded-lg bg-white w-[180px]">
      <Image
        src={
          photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`
            : "/placeholder.jpeg"
        }
        alt={business.name}
        width={165}
        height={80}
        className="rounded-lg object-cover h-[100px]"
      />

      <h2 className="text-[13px] font-bold mt-1 line-clamp-1">
        {business.name}
      </h2>

      <h2 className="text-[10px] text-gray-400 line-clamp-2">
        {business.formatted_address}
      </h2>

      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3 h-3 text-yellow-500"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-[10px] font-bold">{business.rating}</h2>
      </div>

      {showDirection ? (
        <div className="border-t p-1 mt-1">
          <h2 className="flex justify-between items-center text-[10px] text-[#1e72bc]">
            Dist: {distance} km{" "}
            <span
              className="border border-[#1e72bc] rounded-full hover:text-white hover:bg-[#1e72bc] p-1"
              onClick={() => getDirections()}
            >
              Get Direction
            </span>
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default BusinessItem;
