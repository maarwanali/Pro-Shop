import React, { useRef, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";

function CreateProduct() {
  const uploadRef = useRef(null);
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const submitProduct = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const form = e.currentTarget;
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "image"
      );
      console.log(fileInput);
      const formData = new FormData();

      for (const file of fileInput.files) {
        formData.append("file", file);
      }

      formData.append("upload_preset", "my-uploads");

      // console.log(formData);
      const image = await axios.post(
        `https://api.cloudinary.com/v1_1/developedby-me/image/upload`,
        formData
      );
      const finalData = image.data;

      console.log(finalData.secure_url);

      const ProductData = {
        name: name,
        description: description,
        price: price,
        oldPrice: oldPrice,
        image: finalData.secure_url,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/products`,
        ProductData
      );

      router.push("/");
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const addImage = () => {
    console.log(uploadRef);
  };
  return (
    <div className="w-[89vw] h-[100vh] ">
      <div className="mycontianer flex items-center justify-center flex-col mt-[70px] ">
        <h1 className="mb-5 font-bold text-gray-900 opacity-80 ">
          ADD NEW PRODUCT
        </h1>
        <form
          // action={`${process.env.NEXT_PUBLIC_URL}/api/products`}
          // encType="multipart/form-data"
          onSubmit={submitProduct}
          method="POST"
          className="flex flex-col  items-center justify-center border-black border-2 p-5 border-opacity-40 rounded-lg"
          // ref={formRef}
        >
          <input
            type="text"
            name="name"
            placeholder="Lens Type"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            placeholder="Describe Product"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={oldPrice}
            className="input"
            onChange={(e) => setOldPrice(e.target.value)}
          />

          <div
            onClick={() => uploadRef.current.click()}
            className="flex justify-center items-center"
          >
            <label htmlFor="imageid" className="font-bold opacity-40">
              choose Image /png
            </label>
            <input
              type="file"
              name="image"
              hidden
              id="iamgeid"
              onChange={addImage}
              ref={uploadRef}
            />
            <FaRegImages
              size={60}
              className="mt-2 bg-gray-700 text-white p-3 rounded-2xl mx-2"
            />
          </div>

          <input
            type="submit"
            className="border-black border-2 border-opacity-50 py-2 px-4 my-2 rounded-xl font-bold cursor-pointer hover:bg-gray-600 hover:text-white transition-colors duration-300"
          />
          {isLoading && <div className="loading-II"></div>}
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;

// const submitProduct = async (e) => {
//   e.preventDefault();
//   setIsloading(true);

//   try {
//     const formData = new FormData(formRef.current);

//     await axios.post(
//       `${process.env.NEXT_PUBLIC_URL}/api/products`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     router.push("/");
//   } catch (err) {
//     console.log(err);
//     setIsloading(false);
//   }
// };

// const addImage = () => {
//   console.log(uploadRef);
// };
// return (
//   <div className="w-[89vw] h-[100vh] ">
//     <div className="mycontianer flex items-center justify-center flex-col mt-[70px] ">
//       <h1 className="mb-5 font-bold text-gray-900 opacity-80 ">
//         ADD NEW PRODUCT
//       </h1>
//       <form
//         action={`${process.env.NEXT_PUBLIC_URL}/api/products`}
//         encType="multipart/form-data"
//         onSubmit={submitProduct}
//         method="POST"
//         className="flex flex-col  items-center justify-center border-black border-2 p-5 border-opacity-40 rounded-lg"
//         ref={formRef}
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Lens Type"
//           className="input"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <textarea
//           type="text"
//           name="description"
//           placeholder="Describe Product"
//           className="input"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           className="input"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           type="number"
//           name="oldPrice"
//           placeholder="Old Price"
//           value={oldPrice}
//           className="input"
//           onChange={(e) => setOldPrice(e.target.value)}
//         />

//         <div
//           onClick={() => uploadRef.current.click()}
//           className="flex justify-center items-center"
//         >
//           <label htmlFor="imageid" className="font-bold opacity-40">
//             choose Image /png
//           </label>
//           <input
//             type="file"
//             name="image"
//             hidden
//             id="iamgeid"
//             onChange={addImage}
//             ref={uploadRef}
//           />
//           <FaRegImages
//             size={60}
//             className="mt-2 bg-gray-700 text-white p-3 rounded-2xl mx-2"
//           />
//         </div>

//         <input
//           type="submit"
//           className="border-black border-2 border-opacity-50 py-2 px-4 my-2 rounded-xl font-bold cursor-pointer hover:bg-gray-600 hover:text-white transition-colors duration-300"
//         />
//         {isLoading && <div className="loading-II"></div>}
//       </form>
//     </div>
//   </div>
// );
// }
