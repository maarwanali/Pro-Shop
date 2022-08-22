import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { PuplishUser, selectUser } from "../slices/UserSlice";
import Image from "next/image";

function Signin() {
  const [values, setValues] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    const USERDATA = JSON.stringify(user);
    if (USERDATA) {
      localStorage.setItem("userName", USERDATA);
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      setErr("username is required");

      setTimeout(() => {
        setErr("");
      }, 3000);
      return false;
    } else if (password === "") {
      setErr("Password is required.");

      setTimeout(() => {
        setErr("");
      }, 3000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(
        "https://pro-shop-swart.vercel.app/api/users/signin",
        {
          username,
          password,
        }
      );
      if (data.status === false) {
        console.log("not found");
        setErr(data.msg);

        setTimeout(() => {
          setErr("");
        }, 3000);
      }
      if (data.status === true) {
        localStorage.setItem("userName", JSON.stringify(data.user));
        setUser(data.user);
        // console.log(data.user);
        // const { username, email, orderId } = data.user;
        // // dispatch(
        // //   PuplishUser({
        // //     username: username,
        // //     email: email,
        // //     orderId: orderId,
        // //   })
        // // );
        router.push("/");
      }
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center relative ">
      <div className="mycontainer flex flex-col justify-center items-center">
        {user ? (
          <div className="flex flex-col justify-center items-center ">
            {" "}
            <h3 className="my-5 font-bold text-xl opacity-70">
              {" "}
              Welcome {user?.username}
            </h3>
            <p className="opacity-50 ">going to home page </p>
            <div className="dot-flashing"></div>
          </div>
        ) : (
          <form
            action=""
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-lg shadow-slate-400 relative "
          >
            {err && (
              <div className="bg-red-500 text-white font-bold py-1 px-5 absolute top-0 ">
                {err}
              </div>
            )}
            <div className="my-7 ">
              <Image
                src="https://www.kindpng.com/picc/m/249-2492288_camera-lens-vector-png-transparent-png.png"
                alt="logo"
                width="50px"
                height="50px"
                className="rounded-full  m-1"
              />
              <h1>EveShop</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="input"
            />
            <button
              type="submit"
              className="bg-red-400 text-white py-1 px-4 my-3 shadow-sm shadow-gray-400 hover:bg-red-600"
            >
              Log In
            </button>
            <span>
              Do not have an account ?{" "}
              <Link href="/register">
                <span className="text-red-400 cursor-pointer hover:text-red-600">
                  Create One.
                </span>
              </Link>
            </span>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signin;
