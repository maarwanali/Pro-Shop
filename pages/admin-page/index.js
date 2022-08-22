import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import OrderInfo from "../../components/OrderInfo";

function AdminPage({ orders }) {
  console.log(orders);
  const router = useRouter();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    const deletedOrder = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`
    );
    if (deletedOrder) {
      router.reload();
    }
  };

  const orderHandle = async (orderid) => {
    const singleData = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/orders/${orderid}`
    );
    setData(singleData.data.order);
    setOpen(true);
  };

  return (
    <div className="mt-[60px] flex justify-center items-center relative">
      {open && <OrderInfo order={data} setOpen={setOpen} />}

      <div className="mycontainer ">
        <ul className="flex flex-col ">
          {orders?.map((order) => {
            return (
              <li
                onClick={() => orderHandle(order._id)}
                key={order._id}
                className="my-7 bg-gray-500 text-white p-4  shadow-lg shadow-black text-lg relative "
              >
                <p
                  className="absolute top-2 right-2 hover:text-red-500 hover:bg-white rounded-full cursor-pointer"
                  onClick={() => handleDelete(order._id)}
                >
                  <RiDeleteBack2Fill size={25} />
                </p>
                <p>Order ID : {order._id}</p>
                <p>User ID : {order.user}</p>
                <p>Address User : {order.address}</p>
                <p>Phone number : {order.phoneNumber}</p>
                <div>
                  {" "}
                  Product ID :{" "}
                  {order?.orders.map((item, index) => {
                    return <p key={index}>{item.item}</p>;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;

export const getServerSideProps = async () => {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/orders`);

  const finalData = await data.data.allOrders;

  return {
    props: {
      orders: finalData,
    },
  };
};
