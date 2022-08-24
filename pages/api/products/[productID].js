// import { doc } from "firebase/firestore";
import Product from "../../../models/Product";
import connectDB from "../../../db/Connect";
import nc from "next-connect";
import multer from "multer";
import fs from "fs";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const uploadFile = upload.single("image");
// .use(uploadFile)

const productid = nc()
  .get(async (req, res) => {
    try {
      await connectDB();
      const { productID } = req.query;
      const singleProudct = await Product.findOne({ _id: productID });
      if (!singleProudct) {
        return res.status(400).json({ msg: "Error ocourding while uploading" });
      }

      res.status(200).json({ singleProudct });
    } catch (err) {
      res.status(404).json({ msg: err.massage });
    }
  })
  .patch(async (req, res) => {
    try {
      await connectDB();
      const { productID } = req.query;
      const newData = req.body;
      const upatedProduct = await Product.findOneAndUpdate(
        { _id: productID },
        newData,
        { new: true, runValidators: true }
      );

      res.status(200).json({ upatedProduct });
    } catch (err) {
      res.status(404).json({ msg: err.massage });
    }
  })
  .delete(async (req, res) => {
    try {
      const { productID } = req.query;

      const deletedProduct = await Product.findOneAndDelete({ _id: productID });
      if (!deletedProduct) {
        return res.status(404).json({ msg: "there is not an Blog such taht" });
      }
      res.status(200).json({ deletedProduct });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  });

export default productid;
