import mongoose from "mongoose";

export default function ConnectToDatabase() {
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected To MongoDB.");
    })
    .catch((e) => {
      console.log(e);
    });
}
