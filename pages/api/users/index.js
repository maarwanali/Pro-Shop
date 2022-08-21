import User from "../../../models/User";
import connectDB from "../../../db/Connect";

export default async function usres(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password, orderId } = req.body;
      console.log(username, email, password);

      if (await connectDB()) {
        console.log("coneected");
      }
      const checkUser = await User.findOne({ username });

      if (checkUser) {
        return res.json({
          msg: "this username is already Existing",
          status: false,
        });
      }
      const checkEmail = await User.findOne({ email });

      if (checkEmail) {
        return res.json({
          msg: "this email is already Existing",
          status: false,
        });
      }

      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
        orderId: orderId,
      });
      if (!newUser) {
        return res.json({
          msg: "user does not created something went worng",
          status: false,
        });
      }
      return res.status(200).json({ status: true, newUser });
    } catch (err) {
      res.json({ msg: err.message, status: false });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.find({}).select([
        "email",
        "username",
        "_id",
        "orderId",
      ]);

      if (!users) {
        return res
          .status(400)
          .json({ msg: "user does not created something went worng" });
      }

      return res.status(200).json({ users });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  }
}
