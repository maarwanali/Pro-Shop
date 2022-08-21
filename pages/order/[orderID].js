import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totlePrice, GetId, selectPrice } from "../../slices/OrderSlice";

function Myorder({ order, user, products }) {
  const dispatch = useDispatch();
  const TotlePrice = useSelector(selectPrice);
  const router = useRouter();

  console.log(order._id);

  const handleDelete = async () => {
    const newData = {
      orderId: "000aaa000aaa000aaa000aaa",
    };

    const deletedOrder = await axios.delete(
      `http://localhost:3000/api/orders/${order._id}`
    );

    const updatedOrder = await axios.patch(
      `http://localhost:3000/api/users/${order.user}`,
      newData
    );

    if (updatedOrder) {
      console.log(updatedOrder);
      localStorage.setItem(
        "userName",
        JSON.stringify(updatedOrder.data.updatedUser)
      );
    }
    if (deletedOrder) {
      router.push("/");
    }
  };

  console.log(order);
  return (
    <>
      {/* {!order.orders && (
        <div>
          <h1>You dont have any order yet</h1>
          {setTimeout(() => {
            router.push("/");
          }, 2000)}
        </div>
      )} */}
      <div className="mt-[100px]">
        <div className="mycontainer flex flex-col justify-center items-start">
          <h1 className="font-bold opacity-60 text-2xl my-5 ">
            Order id : {order._id}
          </h1>
          <h2 className="font-bold opacity-60 text-xl my-2">
            MR: {user.username}
          </h2>
          <h3 className="text-xl opacity-75 my-2">Address: {order.address}</h3>
          <h2 className="text-xl opacity-75 my-2 bg-gray-700 text-white py-1 px-4">
            My order :
          </h2>
          {products?.map((item, index) => {
            const product = item.singleProudct;
            return (
              <div key={index} className="my-5 ml-8 ">
                <h3 className="text-lg  ">
                  Order No <span className="font-bold ">{index + 1}</span>
                </h3>
                <p className="font-bold opacity-60 text-lg">
                  {" "}
                  Product id : {product._id}
                </p>
                <p className="font-bold opacity-60 text-lg">
                  Product Name : {product.name}
                </p>
                <p className="font-bold opacity-60 text-lg ">
                  Product Price :{" "}
                  <span className="text-red-500">
                    {product.price} <small>$</small>
                  </span>
                </p>
              </div>
            );
          })}

          <button
            onClick={handleDelete}
            className="bg-red-400 text-white py-1 px-5 shadow-md shadow-slate-500 text-lg my-10 hover:bg-red-600 "
          >
            Cancle Order.
          </button>
        </div>
      </div>
    </>
  );
}

export default Myorder;

export const getServerSideProps = async (context) => {
  const { orderID } = context.params;

  const myOrder = await axios.get(
    `http://localhost:3000/api/orders/${orderID}`
  );
  const data = await myOrder.data.order;
  const userid = data.user;

  const userInformation = await axios.get(
    `http://localhost:3000/api/users/${userid}`
  );

  const itemIds = data.orders;

  const itemArray = [];

  await Promise.all(
    itemIds?.map(async (itemId) => {
      const id = itemId.item;
      const orderInformation = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );

      const itemData = orderInformation.data;
      itemArray.push(itemData);
    })
  );

  return {
    props: {
      order: data,
      user: userInformation.data.user,
      products: itemArray,
    },
  };
};
