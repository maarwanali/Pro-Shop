import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOrder } from "../../slices/OrderSlice";
import { clearCart } from "../../slices/CartSlice";
import axios from "axios";
import { selectUser } from "../../slices/UserSlice";

function Order() {
  const products = useSelector(selectOrder);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState("");
  const userData = useSelector(selectUser);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(userData);

  useEffect(() => {
    const USERDATA = JSON.stringify(user);
    if (USERDATA) {
      localStorage.setItem("userName", USERDATA);
    }
  }, []);

  // useEffect(() => {
  //   if (!userData.userName) {
  //     router.push("/signin");
  //   }

  //   setUserId(userData._id);
  // }, []);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userName"));
  //   if (!user) {
  //     router.push("/signin");
  //   }
  //   setUserId(user._id);
  // }, []);

  const postOrder = async (e) => {
    e.preventDefault();

    if (!products) {
      return;
    }
    setLoading(true);

    const data = {
      username: userData.userId,
      phoneNumber: number,
      fullAddress: address,
      orders: products,
    };
    console.log(data);
    const order = await axios.post("http://localhost:3000/api/orders", data);

    const newData = {
      orderId: order.data.order._id,
    };
    const updatedUser = await axios.patch(
      `http://localhost:3000/api/users/${userData.userId}`,
      newData
    );

    if (updatedUser) {
      console.log(updatedUser);
      localStorage.setItem(
        "userName",
        JSON.stringify(updatedUser.data.updatedUser)
      );
      setUser(updatedUser.data.updatedUser);

      // localStorage.removeItem("userName");
      // router.push("/signin");
    }
    dispatch(clearCart());

    router.push(`/order/${order.data.order._id}`);

    console.log(order);
  };

  return (
    <>
      <div className=" h-[89vh] flex justify-center items-center ">
        <div className="mycontainer flex flex-col justify-center items-center">
          <p className="my-5">
            please full the fileds to complate your order .
          </p>
          <form
            action=""
            className="flex flex-col justify-center items-center"
            onSubmit={(e) => postOrder(e)}
          >
            <input
              type="number"
              className="input"
              placeholder="phone number"
              onChange={(e) => setNumber(e.target.value)}
            />

            <input
              type="text"
              className="input"
              placeholder="address - pleace meating"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="submit"
              className="border-2 border-white py-1 px-3 my-3 bg-red-400 text-white cursor-pointer font-bold "
            >
              submit and go to Oreder
            </button>
          </form>
          {loading && <div className="loading-II"></div>}
        </div>
      </div>
    </>
  );
}

export default Order;
