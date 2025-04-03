import { div } from "motion/react-client";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  // Bike data object
  const bikes = [
    {
      name: "Royal Enfield",
      image: "/sports/1.jpg",
      rentPerDay: 1500,
    },
    {
      name: "KTM Duke 390",
      image: "/sports/2.jpg",
      rentPerDay: 1200,
    },
    {
      name: "Harley Davidson",
      image: "/sports/3.jpg",
      rentPerDay: 2500,
    },
    {
      name: "Yamaha R1",
      image: "/sports/4.jpg",
      rentPerDay: 1800,
    },
    {
      name: "Honda CBR",
      image: "/sports/5.jpg",
      rentPerDay: 1000,
    },
    {
      name: "Suzuki GSX-R1000",
      image: "/sports/1.jpg",
      rentPerDay: 2000,
    },
    {
      name: "BMW S1000RR",
      image: "/sports/3.jpg",
      rentPerDay: 2200,
    },
  ];

  // State to keep track of the current slide index (shifting by 4 bikes)
  

  return (
    <div>
      {bikes.map((item)=>(
        <div className="flex row-span-5 text-white">{item.name}</div>
      ))}
    </div>
  );
};

export default Carousel;
