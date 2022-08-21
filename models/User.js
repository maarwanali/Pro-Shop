import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },

  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Forder",
    default: "",
  },
});

const User = models.User || model("User", userSchema);

export default User;
