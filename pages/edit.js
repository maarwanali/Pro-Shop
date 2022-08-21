import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import EditForm from "../components/EditForm";
import { selectID } from "../slices/IdSlice";

function Edit({ products }) {
  const selectId = useSelector(selectID);

  return (
    <>
      {products &&
        products.map((item) => {
          if (item._id !== selectId) {
            return;
          }
          return (
            <EditForm
              key={item._id}
              ID={item._id}
              NAME={item.name}
              DESCRIPTION={item.description}
              PRICE={item.price}
              OLDPRICE={item.oldPrice}
            />
          );
        })}
    </>
  );
}

export default edit;
export const getServerSideProps = async () => {
  const data = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: data.data.products,
    },
  };
};
