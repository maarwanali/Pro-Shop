import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiInstagram } from "react-icons/fi";
import { IoLogoVk } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { TbBrandTelegram } from "react-icons/tb";
function Contact() {
  const router = useRouter();
  return (
    <div className="mt-[100px] w-[100%] flex flex-col justify-center items-center">
      <p className="font-bold text-xl">
        You can contact us in those social media..
      </p>

      <Link href="https://www.instagram.com/cox.xxi/">
        <p className="w-32 flex justify-center items-center  my-2 bg-red-300 py-1 px-3 rounded-lg text-white hover:bg-red-500 cursor-pointer">
          <FiInstagram className="mx-2 " /> Instgram
        </p>
      </Link>

      <Link href="https://vk.com/a.sohaib">
        <p className="w-32 flex justify-center items-center my-2 bg-blue-300 py-1 px-2 rounded-lg text-white hover:bg-blue-500 cursor-pointer ">
          <IoLogoVk className="mx-1" /> VK
        </p>
      </Link>

      <Link href="https://web.telegram.org/z/#1374451876">
        <p className="w-32 flex justify-center items-center my-2 bg-blue-300 py-1 px-2 rounded-lg text-white hover:bg-blue-500 cursor-pointer ">
          <TbBrandTelegram className="mx-1" /> Telegram
        </p>
      </Link>

      <Link href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWslwwxbcfSRvXqqzCXCjjNkhMPNKZxlKVSnZwrdZtcwMdFdmJNMkTcPVPTZpNkmNvBZlFkRG">
        <p className="flex justify-center items-center border-2 border-red-300 ">
          <SiGmail size={25} className="mr-2 bg-red-300 text-white p-1" />{" "}
          sohaib.ahm12@gmail.com
        </p>
      </Link>

      <p className="font-bold text-md">or send us at Gamil</p>

      <p className="my-6 opacity-50">
        Thanks in advance for contacting us we will try to respond as soon as
        possible <small className="text-lg">:)</small>
      </p>

      <h2
        onClick={() => router.push("/")}
        className="opacity-30 my-5 hover:opacity-100 cursor-pointer"
      >
        Go to home page{" "}
      </h2>
    </div>
  );
}

export default Contact;
