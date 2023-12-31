import { CarListData } from "../../utils/CarListData";
import React from "react";
import CarListItem from "./CarListItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CarListOptions({ distance, item }) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState([]);
  const router = useRouter();

  return (
    <div className="mt-5 p-1 overflow-auto h-[27vh]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((car, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md ${
            activeIndex === index
              ? "border-[1px] border-black"
              : "border-[1px] border-slate-50"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(car);
          }}
        >
          <CarListItem car={car} distance={distance} />
        </div>
      ))}
      {selectedCar?.name ? (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg">
          <h2>Make Payment For</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center"
            onClick={() =>
              router.push(
                "/payment?amount=" + (selectedCar.amount * distance).toFixed(2)
              )
            }
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CarListOptions;
