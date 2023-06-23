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
    options: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    images: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "image",
          required: true,
        },
      ],
      required: true,
    },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "catagory",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", Schema);
