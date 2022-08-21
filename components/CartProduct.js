import React from "react";
import { RiAddLine } from "react-icons/ri";
import { IoIosRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import {
  DeleteFromCart,
  clearCart,
  IncrementQuantity,
  DecrementQuantity,
} from "../slices/CartSlice";

function CartProduct({
  image,
  title,
  description,
  price,
  oldPrice,
  quantity,
  cartId,
}) {
  const dispatch = useDispatch();
  return (
    <div className="m-[20px] border-2 border-gray-300 border-opacity-50 rounded-md relative ">
      <TiDeleteOutline
        size={25}
        className=" bg-red-600 text-white  absolute left-0 top-0 hover:bg-red-500 cursor-pointer"
        onClick={() => dispatch(DeleteFromCart(cartId))}
      />
      <div className="w-[250px] h-fit flex flex-col justify-center items-center  ">
        <img src={image} alt="" className="h-[200px]" />

        <h2 className="font-bold my-2 ">{title}</h2>

        <p className="text-opacity-50">{description}</p>

        <div className="flex ">
          <p className="mx-1 text-red-500 relative  after:content[' '] after:w-[20px] after:h-[1px]  after:bg-black after:absolute after:top-2 after:left-[-20px] after:rotate-12 ">
            <small className="absolute top-0 left-[-20px]  ">{oldPrice}</small>
          </p>
          <p className="text-red-500 font-bold mx-3 text-xl ">{price}</p>
        </div>

        <div className="flex justify-center items-center my-4 ">
          <button
            className="cart-botton"
            onClick={() => dispatch(DecrementQuantity(cartId))}
          >
            <IoIosRemove size={20} />
          </button>
          <p className="mx-4 text-lg ">{quantity}</p>

          <button
            className="cart-botton"
            onClick={() => dispatch(IncrementQuantity(cartId))}
          >
            <RiAddLine size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
