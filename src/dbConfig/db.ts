import console from "console";
import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (err) => {
      console.log(
        "Something Went wrong in mongodb connection, please check the database server. Error: " +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong while connecting to DB");
    console.log(console.error());
  }
}
