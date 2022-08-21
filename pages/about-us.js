import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="mt-[100px]">
      <div className="mycontainer flex flex-col justify-center items-center ">
        <div className="my-5">
          <Image
            src="https://www.kindpng.com/picc/m/249-2492288_camera-lens-vector-png-transparent-png.png"
            alt="logo"
            className="w-[40px] rounded-full  m-1"
          />
          <h1>ProShop</h1>
        </div>

        <p className=" text-lg opacity-70 my-9">
          <span className="ml-5"></span> An online store interested in selling
          everything related to photography, the store is characterized by
          making the buyer try the product and check it well and then you can
          buy
        </p>
        <span className="font-bold opacity-50 "> Site Administration...</span>
      </div>
    </div>
  );
}

export default About;
