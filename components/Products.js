import axios from "axios";
import React from "react";
import Product from "./Product";
import _arrayBufferToBase64 from "./Converter";

function Products({ products }) {
  return (
    <div className="my-20 ">
      <div className="mycontainer flex flex-wrap justify-center items-center lg:grid lg:grid-cols-2 xl:grid-cols-3   gap-4">
        {products &&
          products.map((item, index) => {
            // const base64String = _arrayBufferToBase64(item.image?.data?.data);

            return (
              <Product
                key={item._id}
                productImg={item.image}
                title={item.name}
                description={item.description}
                oldPrice={item.oldPrice}
                price={item.price}
                id={item._id}
                cartId={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Products;

// export const getServerSideProps = async () => {
//   const data = await axios.get("http://localhost:3000/api/products");
//   return {
//     props: {
//       products: data.data.products,
//     },
//   };
// };
