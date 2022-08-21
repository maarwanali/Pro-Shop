import React from "react";

function ChatFaild() {
  return (
    <div className="flex flex-col">
      <div className="mt-5 w-[490px]  h-[610px] bg-white border-2 border-black border-opacity-30 relative overflow-scroll overflow-x-hidden	">
        <form action="" className="absolute bottom-[-5px]">
          <div className="flex  justify-center items-center">
            <input type="text" className="input" />
            <input
              type="submit"
              className=" h-[35px] px-2 bg-gray-800  text-white hover:bg-slate-500 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatFaild;
