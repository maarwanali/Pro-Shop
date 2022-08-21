import React, { useState } from "react";
import { BsPatchQuestion } from "react-icons/bs";
import { BiDotsHorizontal } from "react-icons/bi";
import axios from "axios";
import { save } from "../slices/IdSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/CartSlice";
import { selectUser } from "../slices/UserSlice";
import Image from "next/image";

function Product({
  productImg,
  title,
  description,
  oldPrice,
  price,
  id,
  cartId,
}) {
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(selectUser);
  const editeHandle = (id) => {
    dispatch(save(id));
    router.push("/edit");
  };
  const deleteHadle = async () => {
    await axios.delete(`http://localhost:3000/api/products/${id}`);
    setOptions(false);
  };

  const handleDetels = () => {
    router.push("/lens/" + id);
  };
  return (
    <div className="border-2 border-black border-opacity-20 rounded-md w-[250] p-3 flex flex-col justify-center items-center relative overflow-hidden relative  ">
      {userData?.username === `${process.env.NEXT_PUBLIC_ADMIN}` && (
        <>
          <BiDotsHorizontal
            size={20}
            className="absolute top-0 right-2 cursor-pointer text-gray-900"
            onClick={() => setOptions(!options)}
          />

          {options && (
            <div className="w-[200px] h-fit bg-gray-800 z-30  flex flex-col justify-center items-center absolute top-5 right-3 shadow-black overflow-hidden ">
              <p className="properties" onClick={() => editeHandle(id)}>
                Edite
              </p>
              <p className="properties" onClick={() => deleteHadle(id)}>
                Delete
              </p>
            </div>
          )}
        </>
      )}

      {oldPrice && (
        <p className="bg-red-600 text-white py-1 px-20  font-bold absolute top-9 right-[-40px] rotate-45 z-10">
          Sale
        </p>
      )}
      <Image
        onClick={handleDetels}
        src={productImg}
        alt=""
        className="h-[250px] hover:scale-110 hover:rotate-6 transition-all duration-150  cursor-pointer  mt-2"
      />
      <div className="flex flex-col justify-center items-center my-2 ">
        <h3 className="font-bold py-2 px-4 relative  after:content[' '] after:w-[100%] after:h-[2px]  after:bg-black after:absolute  after:bottom-2 after:left-[50%] after:translate-x-[-50%] after:animate-pulse">
          {title}
        </h3>
        <p className="opacity-70 text-s my-3">
          {description}
          {/* {description.substring(0, 40)} */}
          {/* {description.length > 40 && <>....</>} */}
        </p>

        <div className="text-red-600 font-bold my-4 flex h-[30px] ">
          {oldPrice && (
            <p className="  mt-1 text-xs relative after:content[' '] after:w-[20px] after:h-[1px]  after:bg-black after:absolute after:top-2 after:left-0 after:rotate-12  ">
              {oldPrice} <small>$</small>
            </p>
          )}

          <p className="mx-2 text-xl">
            {price} <small className="">$</small>
          </p>
        </div>
      </div>

      <div className=" flex ">
        <button
          className="py-2 px-10 bg-red-700 hover:bg-red-400 transition-colors duration-150 rounded-lg text-white mx-2 "
          onClick={() =>
            dispatch(
              addToCart({
                id: id,
                name: title,
                description: description,
                price: price,
                oldPrice: oldPrice,
                image: productImg,
                cardId: cartId,
              })
            )
          }
        >
          Buy
        </button>
        <button
          onClick={() => router.push("/contact-us")}
          className="py-2 px-10 bg-gray-700 hover:bg-gray-400 transition-colors duration-150 rounded-lg text-white mx-2 flex items-center"
        >
          <BsPatchQuestion className="mr-2" />
          Queries
        </button>
      </div>
    </div>
  );
}

export default Product;
