import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
function OrderInfo({ order, setOpen }) {
  console.log(order);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const userid = order.user;
        const data = await axios.get(
          `https://pro-shop-swart.vercel.app/api/users/${userid}`
        );
        setUser(data.data.user);
      } catch (err) {
        console.log(err.message);
      }
    };

    getuser();

    const getProduct = async () => {
      try {
        await Promise.all(
          order?.orders?.map(async (itemId) => {
            const id = itemId.item;
            const orderInformation = await axios.get(
              `https://pro-shop-swart.vercel.app/api/products/${id}`
            );

            const itemData = orderInformation.data.singleProudct;
            // console.log(itemData);
            setProducts([...products, itemData]);
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    getProduct();
  }, []);

  // if (user) {
  //   console.log(user);
  // }
  // if (products) {
  //   console.log(products);
  // }
  return (
    <div className=" mt-[60px] w-[100vw] h-[100vh] bg-black bg-opacity-80 fixed z-10 top-0 flex justify-center items-center">
      <TiDeleteOutline
        size={30}
        className="text-white absolute top-[20px] right-[50px] cursor-pointer"
        onClick={() => setOpen(false)}
      />
      <div className=" mt-[100px] mycontainer  flex flex-col text-white text-xl ">
        <p className="my-2 ">Username : {user?.username}</p>
        <p>Email : {user?.email}</p>
        <p>Address : {order.address}</p>
        <p>Phone number : {order.phoneNumber}</p>
        <h3>Products </h3>
        <div className="ml-5">
          {products?.map((item) => {
            return (
              <p key={item._id}>
                <p>Name : {item.name}</p>
                <p>Price : {item.price}</p>
              </p>
            );
          })}
        </div>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}

export default OrderInfo;
