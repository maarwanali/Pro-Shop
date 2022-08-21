import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";

function Logout() {
  const router = useRouter();
  const [run, setRun] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (!user) {
      setRun(true);

      router.push("/");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userName");
    router.reload();
  };
  return (
    <div className="mt-[100px] h-[100vh] ">
      <div className="mycontainer flex flex-col justify-center items-center">
        <button
          onClick={handleLogout}
          className=" flex justify-center items-center  bg-gray-600 text-white py-2 px-5 shadow-lg shadow-stone-400"
        >
          Log Out <MdLogout className="ml-5" />
        </button>

        {run && <div className="loading"></div>}
      </div>
    </div>
  );
}

export default Logout;
