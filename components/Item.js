import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../slices/CartSlice";
function Item({ Icon, text, adress, Active }) {
  const router = useRouter();
  const handleAdress = () => {
    router.push(`/${adress}`);
  };

  return (
    <li
      className="link group cursor-pointer relative w-[100%] flex justify-center items-center my-5  "
      onClick={handleAdress}
    >
      <Icon className="h-7 mb-1 group-hover:animate-bounce" />

      <p className="opacity-0 group-hover:opacity-100 tracking-widest text-sm ">
        {text}
      </p>
    </li>
  );
}

export default Item;
