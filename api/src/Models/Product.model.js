import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    images: [],
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "catagory",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", Schema);
