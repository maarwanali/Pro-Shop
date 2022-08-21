// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }
import Forder from "../../../models/Order";

import connectDB from "../../../db/Connect";

export default async function orders(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const { phoneNumber, fullAddress, username, orders } = req.body;
      const item = orders.item;

      console.log(orders);
      // const user = await User.findOne({ username });
      // const product = await Product.findOne({ _id: item });

      const order = await Forder.create({
        user: username,
        phoneNumber: phoneNumber,
        address: fullAddress,
        orders: orders,
      });

      if (!order) {
        return res
          .status(400)
          .json({ msg: "the order does not created succisfully" });
      }

      return res.status(200).json({ order });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  }

  if (req.method === "GET") {
    try {
      await connectDB();
      const allOrders = await Forder.find({});
      if (!allOrders) {
        return res.status(400).json({ msg: "there is no more orders" });
      }

      return res.status(200).json({ allOrders });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  }
}
