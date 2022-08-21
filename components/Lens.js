import React, { useState } from "react";
import Link from "next/link";
function Lens() {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-5 flex justify-center items-center cursor-pointer">
        <p className=" lhover  canon" onClick={handleLoading}>
          <Link href="?search=canon">Canon</Link>
        </p>
        <p className=" lhover nikon" onClick={handleLoading}>
          <Link href="?search=nikon">Nikon</Link>
        </p>
        <p className=" lhover  sony" onClick={handleLoading}>
          <Link href="?search=sony">Sony</Link>
        </p>
        <p className=" lhover canon" onClick={handleLoading}>
          <Link href="?search=sigma">sigma</Link>
        </p>
      </div>

      {loading && <div className="dot-flashing"></div>}
    </div>
  );
}

export default Lens;

// <div>
//         <img
//           src="https://cdn.cdnlogo.com/logos/c/87/canon.svg"
//           alt="Canon logo"
//           className="w-[80px]"
//         />
//       </div>

//       <div>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Nikon_logo.svg/300px-Nikon_logo.svg.png?20150929172648"
//           alt=""
//         />
//       </div>
