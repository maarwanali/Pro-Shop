import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import { selectProducts } from "../slices/CartSlice";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { AddOrder } from "../slices/OrderSlice";
import { BsPatchCheckFill } from "react-icons/bs";
import { selectUser } from "../slices/UserSlice";

// const telegramBotKey = process.env.TELEGRAM_BOT_TOKEN;
// const chat_id = process.env.TELEGRAM_USER_ID;

function Shopcart() {
  // const [user, setUser] = useState();
  const products = useSelector(selectProducts);
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  // useEffect(() => {}, []);

  const handleCheckOut = async (products) => {
    if (userData?.username) {
      products?.map((product, index) => {
        dispatch(
          AddOrder({
            item: product.id,
          })
        );
      });

      router.push("/order");
    }
    if (!userData?.username) {
      router.push("/signin");
    }
  };
  return (
    <div className="mt-[60px] w-[100%]">
      <div className="mycontainer flex flex-col justify-center items-center">
        {products.length > 0 && (
          <>
            <div className="  flex flex-wrap    ">
              {products &&
                products.map((product, index) => {
                  return (
                    <CartProduct
                      key={product.id}
                      image={product.image}
                      title={product.name}
                      discription={product.description}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      quantity={product.quantity}
                      cartId={index}
                    />
                  );
                })}
            </div>

            <div className=" flex items-center justify-center">
              <button
                onClick={() => handleCheckOut(products)}
                className="border-red-300 border-2 rounded-md  px-10 py-2 bg-white hover:bg-red-400 hover:text-white hover:border-white  flex justify-center items-center "
              >
                <BsPatchCheckFill size={25} className="mr-2 " />
                check out
              </button>
            </div>
          </>
        )}

        {products.length === 0 && (
          <div className=" flex flex-col justify-center items-center mt-[60px]">
            <p className="uppercase">
              {" "}
              your cart is empty go to home page to buy what you want{" "}
            </p>
            <button
              onClick={() => router.back()}
              className="flex justify-center items-center bg-red-400 my-10 text-white text-l w-fit px-5 shadow-red-900 shadow-lg "
            >
              {" "}
              <AiOutlineArrowLeft className="mr-4 w-[80px]  font-bold  animate-bouncex" />{" "}
              Get back to homa bage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shopcart;
