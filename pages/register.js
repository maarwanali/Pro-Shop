import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { PuplishUser } from "../slices/UserSlice";
import Image from "next/image";

export default function Register() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");

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

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      setErr("Password and confirm password should be same.");

      setTimeout(() => {
        setErr("");
      }, 3000);

      return false;
    } else if (username.length < 3) {
      setErr("Username should be greater than 3 characters.");

      setTimeout(() => {
        setErr("");
      }, 3000);

      return false;
    } else if (password.length < 8) {
      setErr("Password should be equal or greater than 8 characters.");

      setTimeout(() => {
        setErr("");
      }, 3000);

      return false;
    } else if (email === "") {
      setErr("mail is required.");

      setTimeout(() => {
        setErr("");
      }, 3000);

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/users`,
        {
          username,
          email,
          password,
        }
      );

      if (data.status === false) {
        setErr(data.msg);

        setTimeout(() => {
          setErr("");
        }, 3000);
      }
      if (data.status === true) {
        // const { username, email, orderId } = data.newUser;
        // dispatch(
        //   PuplishUser({
        //     username: username,
        //     email: email,
        //     orderId: orderId,
        //   })
        // );
        localStorage.setItem("userName", JSON.stringify(data.newUser));
        setUser(data.newUser);

        router.push("/");
      }
    }
  };

  return (
    <div className="">
      <div className="mycontainer h-[89vh] flex justify-center items-center ">
        <form
          action=""
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col justify-center items-center bg-white p-10 shadow-lg shadow-slate-600  relative"
        >
          {err && (
            <div className="bg-red-500 text-white font-bold py-1 px-5 absolute top-0 ">
              {err}
            </div>
          )}

          <div className="my-5">
            <Image
              src="https://www.kindpng.com/picc/m/249-2492288_camera-lens-vector-png-transparent-png.png"
              alt="logo"
              width="50px"
              height="50px"
              className="w-[40px] rounded-full  m-1"
            />
            <h1>EveShop</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            className="input"
          />
          <button
            type="submit"
            className=" my-2 bg-red-400 text-white font-bold hover:bg-red-600 cursor-pointer py-1 px-4 rounded-sm "
          >
            Create User
          </button>
          <span>
            Already have an account ?{" "}
            <Link href="/signin">
              <span className="text-red-400 cursor-pointer hover:text-red-600">
                Login.
              </span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
