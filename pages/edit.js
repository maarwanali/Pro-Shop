import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import EditForm from "../components/EditForm";
import { selectID } from "../slices/IdSlice";

function Edit({ products }) {
  const selectId = useSelector(selectID);

  return (
    <div className="mt-[60px]">
      {products?.map((item) => {
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
    </div>
  );
}

export default Edit;

export const getServerSideProps = async () => {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/products`);
  return {
    props: {
      products: data.data.products,
    },
  };
};
