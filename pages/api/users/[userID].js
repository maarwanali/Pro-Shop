import User from "../../../models/User";
import connectDB from "../../../db/Connect";

export default async function userid(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { userID } = req.query;

      const user = await User.findOne({ _id: userID });

      if (!user) {
        return res.status(400).json({ msg: "user does not excect" });
      }

      return res.status(200).json({ user });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  } else if (req.method === "DELETE") {
    try {
      await connectDB();
      const { userID } = req.query;

      const deletedUser = await User.findOneAndDelete({ _id: userID });

      if (!deletedUser) {
        return res
          .status(400)
          .json({ msg: "user that u want to delete does not there" });
      }

      return res.status(200).json({ deletedUser });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  } else if (req.method === "PATCH") {
    try {
      await connectDB();
      const { userID } = req.query;
      const newdata = req.body;
      const updatedUser = await User.findOneAndUpdate(
        { _id: userID },
        newdata,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res
          .status(400)
          .json({ msg: "user that u want to update does not there" });
      }

      return res.status(200).json({ updatedUser });
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  }
}
