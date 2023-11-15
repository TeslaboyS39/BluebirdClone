"use client";
import React from "react";
import InputItem from "./InputItem";
import { useContext } from "react";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import { useEffect } from "react";
import { useState } from "react";
import CarListOptions from "./CarListOptions";

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();

  const calculateDistance = () => {
    if (source && destination) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );
      setDistance(dist * 0.000621374);
    }
  };
  useEffect(() => {
    if (source) {
      console.log(source);
    }
    if (destination) {
      console.log(destination);
    }
  }, [source, destination]);
  return (
    <div>
      <div className="p-2 md:pd-6 border-[2px] rounded-xl">
        <p className="text-black text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
