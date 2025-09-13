import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, { dbName: "transactions" })
      .then(() => console.log("Database is connected..."))
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDB;
