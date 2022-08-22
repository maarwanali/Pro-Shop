import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/CartSlice";
import _arrayBufferToBase64 from "../../components/Converter";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

function Detiels({ product }) {
  const base64String = _arrayBufferToBase64(product?.image?.data?.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="mt-[100px] w-[100%]">
      <div className="mycontainer flex flex-col ">
        <div className=" flex">
          <Image
            src={`data:image/png;base64,${base64String}`}
            alt="product image"
            width="500px"
            height="100%"
          />

          <div className="mt-[40px] ml-[30px] flex flex-col item-center">
            <h2 className={` font-bold text-xl  x${product.name} `}>
              {product.name}
            </h2>
            <p className="my-10 opacity-50 text-lg ">{product.description}</p>
            <p className="mx-1 text-red-500 relative  text-xl font-medium after:content[' '] after:w-[40px] after:h-[1px]  after:bg-black after:absolute after:top-3 after:left-0 after:rotate-12 ">
              {product.oldPrice}
            </p>
            <p className="my-5 text-3xl text-red-500 relative ">
              {product.price}{" "}
              <small className="absolute m-1 top-0 text-sm font-bold">$</small>
            </p>

            {/* <button
            className="py-2 px-10 bg-red-700 hover:bg-red-400 transition-colors duration-150 rounded-lg text-white mx-2 "
            onClick={() =>
              dispatch(
                addToCart({
                  id: cartId,
                  name: title,
                  description: description,
                  price: price,
                  oldPrice: oldPrice,
                  image: productImg,
                })
              )
            }
          >
            Add To Cart
          </button> */}
          </div>
        </div>

        <button
          onClick={() => {
            router.back();
            setLoading(true);
          }}
          className="flex justify-center items-center bg-red-400 my-10 text-white text-l w-fit px-5 shadow-red-900 shadow-lg "
        >
          {" "}
          <AiOutlineArrowLeft className="mr-4 w-[80px]  font-bold  animate-bouncex" />{" "}
          Get back to homa bage
        </button>

        {loading && <div className="loading-II ml-[150px]"></div>}
      </div>
    </div>
  );
}

export default Detiels;

export const getServerSideProps = async (context) => {
  const { lensID } = context.params;
  const data = await axios.get("http://localhost:3000/api/products");
  const products = await data.data.products;

  const singleProduct = products.find((item) => item._id === lensID);

  return {
    props: {
      product: singleProduct,
    },
  };
};
