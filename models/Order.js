import { Schema, model, models } from "mongoose";

const OrderSchma = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  phoneNumber: {
    type: Number,
    require,
  },
  address: {
    type: String,
    require,
  },
  orders: [{ item: String }],

  orders: {
    type: Object,
    item: [],
  },
});

const Forder = models.Forder || model("Forder", OrderSchma);

export default Forder;
