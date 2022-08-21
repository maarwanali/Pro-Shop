import mongoose from "mongoose";

const connectDB = async () => {
  return (
    mongoose.connect(process.env.MONGO_URI),
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
};

export default connectDB;
