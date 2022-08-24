import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function EditForm({ ID, NAME, DESCRIPTION, PRICE, OLDPRICE }) {
  const [name, setName] = useState(NAME);
  const [description, setDescription] = useState(DESCRIPTION);
  const [price, setPrice] = useState(PRICE);
  const [oldPrice, setOldPrice] = useState(OLDPRICE);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      name: name,
      description: description,
      price: price,
      oldPrice: oldPrice,
    };

    await axios.patchForm(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${ID}`,
      newData
    );

    router.push("/");
  };
  return (
    <div className="w-[100vw] h-[92vh] flex flex-col justify-center items-center absolute z-40 bg-black bg-opacity-50 ">
      <h1 className="my-5 text-white font-bold">EDITE PORODUCT</h1>
      <form
        action={`/api/products/${ID}`}
        method="PATCH"
        className="flex flex-col justify-center items-center border-2 border-white border-opacity-50  p-1"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="input"
          placeholder="update name "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="update description "
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="Number"
          placeholder="update price "
          className="input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="Number"
          placeholder="update oldPrice "
          className="input"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />

        <input
          type="submit"
          className="border-2 border-white rounded-xl bg-red-300 hover:bg-red-600 cursor-pointer my-3 py-2 px-4"
        />
      </form>
    </div>
  );
}

export default EditForm;
