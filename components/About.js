import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
// import { IoShareSocialSharp } from "react-icons/io";
import PersonalImage from "../images/ba259d15-0568-44aa-b522-c2f7a71a168a.jpg";

function About() {
  return (
    <div className="my-[90px] h-[400px] flex justify-center items-center">
      <div className="mycontainer flex justify-center items-center my-[70px]">
        <Image
          src={PersonalImage}
          width={300}
          height={300}
          className=" rounded-full "
        />

        <div className="ml-5">
          <p className="font-bold opacity-60 ml-[10px] my-2">
            {" "}
            An online store specializing in everything related to photography
          </p>
          <div className="flex ">
            <Link href="/contact-us">
              <div className="flex items-center mx-5 bg-red-400 w-fit py-2 px-4 text-white rounded-full hover:bg-red-600 cursor-pointer ">
                Social Media
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
