import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-neutral-400 text-white ">
      <div className="mycontainer flex justify-center items-center flex-col ">
        <div className="h-[60px] flex justify-center items-center my-5">
          <div className="m-1">
            <Image
              src="https://www.kindpng.com/picc/m/249-2492288_camera-lens-vector-png-transparent-png.png"
              alt="logo"
              width="50px"
              height="50px"
              className="w-[50px] rounded-full  m-1"
            />
          </div>
          <h3 className=" text-xl ">ProShop</h3>
        </div>

        <div className=" my-5 w-[100%] flex justify-around text-sm ">
          <div>
            <h1 className="font-bold my-1">INFORMATION</h1>
            <Link href="/about-us">
              <p className=" cursor-pointer">About Us</p>
            </Link>
            <Link href="/privacy-policy">
              <p className="cursor-pointer">Privacy Policy</p>
            </Link>
          </div>

          <div>
            <h1 className="font-bold my-1">CUSTOMER SERVICE</h1>
            <Link href="contact-us">
              <p className="cursor-pointer">Contact Us </p>
            </Link>
            <Link href="/about-us">
              <p className="cursor-pointer">About Us</p>
            </Link>
          </div>
        </div>
        {/* About me  */}
        <div className="my-5">
          made by-
          <Link href="https://www.instagram.com/marv_3li/">
            <span className="text-red-200"> Marwan Ali</span>
          </Link>
          @copyrights 2022
        </div>
      </div>
    </div>
  );
}

export default Footer;
