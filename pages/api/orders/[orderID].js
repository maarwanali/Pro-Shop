import Forder from "../../../models/Order";
import connectDB from "../../../db/Connect";

export default async function userid(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { orderID } = req.query;

      const order = await Forder.findOne({ _id: orderID });

      if (!order) {
        return res.status(400).json({ msg: "order does not excect" });
      }

      return res.status(200).json({ order });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  } else if (req.method === "DELETE") {
    try {
      await connectDB();
      const { orderID } = req.query;

      const deletedOrder = await Forder.findOneAndDelete({ _id: orderID });

      if (!deletedOrder) {
        return res
          .status(400)
          .json({ msg: "order that u want to delete does not there" });
      }

      return res.status(200).json({ deletedOrder });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  } else if (req.method === "PATCH") {
    try {
      await connectDB();
      const { orderID } = req.query;
      const newdata = req.body;
      const updatedOrder = await Forder.findOneAndUpdate(
        { _id: orderID },
        newdata,
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        return res
          .status(400)
          .json({ msg: "order that u want to update does not there" });
      }

      return res.status(200).json({ updatedOrder });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  }
}
