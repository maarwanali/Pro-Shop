import User from "../../../models/User";
import connectDB from "../../../db/Connect";

export default async function signin(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({
          msg: "Incorrect Username or Password",
          status: false,
        });
      }

      if (password !== user.password) {
        return res.json({
          msg: "Incorrect Username or Password",
          status: false,
        });
      }

      delete user.password;

      return res.status(200).json({ status: true, user });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  }
}
