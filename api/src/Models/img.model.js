import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    data: Buffer,
  },
  { timestamps: true }
);

export default mongoose.model("catagory", Schema);
