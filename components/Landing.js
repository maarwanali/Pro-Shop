import Image from "next/image";
import React, { useEffect } from "react";
import Lens from "./Lens";

function Landing() {
  return (
    <div className="mt-[60px]">
      <Image
        src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="Landiong image"
        className="w-screen h-[89vh] object-cover absolute "
      />
      <div className="absolute top-0 right-0 left-0 bottom-0 max-h-[89vh] bg-black bg-opacity-40 mt-[60px] "></div>
      <div className="relative overflow-hidden h-[89vh] group  text-white w-[80%] mx-auto ">
        <Lens />
        <h2 className="  mt-20 font-bold text-lg text-center  transition-all duration-200 group-hover:scale-150">
          Safe way to buy{" "}
        </h2>
        <p
          className="mt-[50px] text-sm font-normal  p-y2 px-4 relative text-center after:content[''] after:w-[250px] after:h-[1px] after:bg-white after:absolute after:top-[-5px] after:left-[50%] after:translate-x-[-50%]  group-hover:scale-150 transition-all duration-200
       "
        >
          Try it in real live and then you can buy it ....
        </p>
      </div>
    </div>
  );
}

export default Landing;
