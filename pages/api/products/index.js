// import { doc } from "firebase/firestore";
import Product from "../../../models/Product";
import connectDB from "../../../db/Connect";
import nc from "next-connect";
import multer from "multer";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadFile = upload.single("image");

const handler = nc()
  .use(uploadFile)
  .post(async (req, res) => {
    try {
      if (await connectDB()) {
        console.log("coneected to database");
      }

      console.log(req.body);
      const newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        image: {
          data: fs.readFileSync("public/" + req.file.filename),
          contentType: "image/png",
        },
      });
      if (!newProduct) {
        return res.status(400).json({ msg: "Error ocourding while uploading" });
      }

      res.status(200).json({ newProduct });
    } catch (err) {
      res.status(404).json({ msg: err.massage });
    }
  })
  .get(async (req, res) => {
    try {
      const { search } = req.query;

      await connectDB();
      const products = await Product.find({});
      if (!products) {
        return res.status(404).json({ msg: "database is freee" });
      }

      if (search) {
        const SearchedProducts = products.filter((product) =>
          product.name.startsWith(search)
        );
        return res.status(200).json({ SearchedProducts });
      }

      res.status(200).json({ products });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  });

export default handler;
