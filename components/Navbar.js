// import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../slices/CartSlice";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import ClickAwayListener from "react-click-away-listener";
import { PuplishUser, selectUser } from "../slices/UserSlice";
import Item from "./Item";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TbReportMoney } from "react-icons/tb";
import { AiFillContacts } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";

function Navbar() {
  const router = useRouter();
  const counter = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [user, setUser] = useState(null);
  const [opend, setOpend] = useState(false);

  const handleClickAway = () => {
    setOpend(false);
  };

  // const userInfo = JSON.parse(localStorage.getItem("userName"));
  // console.log(userInfo);

  useEffect(() => {
    let userInfo = localStorage.getItem("userName");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }

    dispatch(
      PuplishUser({
        username: userInfo?.username,
        email: userInfo?.email,
        orderId: userInfo?.orderId,
        userId: userInfo?._id,
      })
    );

    //   // console.log(userData);
    //   // localStorage.setItem("userName", JSON.stringify(userData));
    //   // dispatch(PuplishUser(JSON.parse(userInfo)));
    //   // console.log(userData);
  }, [router]);

  // if (userData.username === `${process.env.NEXT_PUBLIC_ADMIN}`) {
  //   console.log("they are equles");
  // } else {
  //   console.log("they are not");
  // }

  return (
    <div className="fixed top-0 w-[100%] border-b-2  border-gray-400 shadow-md bg-gray-900 text-white z-20 ">
      <div
        className={`w-[80%] mx-auto my-0  relative ${
          counter > 0 && "flex justify-between items-center"
        }  `}
      >
        <div
          onClick={() => router.push("/")}
          className="h-[60px] flex justify-center items-center cursor-pointer"
        >
          <img
            src="https://www.kindpng.com/picc/m/249-2492288_camera-lens-vector-png-transparent-png.png"
            alt="logo"
            className="w-[40px] rounded-full  m-1"
          />
          <h3 className="">ProShop</h3>
        </div>
        {/* absolute sm:flex-col my-5 top-0 right-0 bg-black z-20 w-[300px] h-[200px]  */}
        <ClickAwayListener onClickAway={handleClickAway}>
          <ul
            className={` ${
              opend ? "move-on" : "move-off"
            } bg-transparent fixed  w-[200px] top-[60px] right-0 z-20 h-[95vh] flex flex-col  items-center   `}
          >
            {!opend && (
              <BsArrowLeftCircleFill
                onClick={() => setOpend(!opend)}
                size={20}
                className="absolute top-2 left-[-20px] cursor-pointer animate-bouncex"
              />
            )}
            {opend && (
              <BsArrowRightCircleFill
                onClick={() => setOpend(!opend)}
                size={20}
                className="absolute top-2 left-[-20px] cursor-pointer animate-bouncex"
              />
            )}
            <div className="absolute top-0 right-0 left-0 bottom-0 max-h-[95vh] bg-black bg-opacity-40  "></div>
            <Item Icon={AiFillHome} text="Home" adress=" " />
            {userData?.username === `${process.env.NEXT_PUBLIC_ADMIN}` && (
              <Item
                Icon={BiAddToQueue}
                text="Add Product"
                adress="addproduct"
              />
            )}

            <Item
              Icon={AiFillContacts}
              text="contact us "
              adress="contact-us"
            />

            {userData?.username ? (
              <>
                {userData.orderId !== "000aaa000aaa000aaa000aaa" && (
                  <Item
                    Icon={TbReportMoney}
                    text="My order"
                    adress={`order/${userData.orderId}`}
                  />
                )}

                <Item Icon={MdLogout} text="Log out" adress="logout" />
              </>
            ) : (
              <Item
                Icon={FaSignInAlt}
                text="Sign in"
                adress="signin"
                onClick={() => console.log("11")}
              />
            )}
          </ul>
        </ClickAwayListener>

        {userData?.username === `${process.env.NEXT_PUBLIC_ADMIN}` ? (
          <div
            className=" fixed bottom-10 left-10 bg-red-600 text-white rounded-full  hover:bg-orange-600 cursor-pointer"
            onClick={() => router.push("/admin-page")}
          >
            <MdAdminPanelSettings size={45} className="   p-2 " />
          </div>
        ) : (
          <></>
        )}

        {counter > 0 &&
          userData.username !== `${process.env.NEXT_PUBLIC_ADMIN}` && (
            <div className="relative">
              <MdAddShoppingCart
                size={25}
                className="cursor-pointer  "
                onClick={() => router.push("/shopcart")}
              />

              <p className="bg-white text-gray-800 font-bold text-sm rounded-full w-[20px] h-[20px] flex items-center justify-center absolute top-2 right-[-20px] ">
                {counter}
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default Navbar;
