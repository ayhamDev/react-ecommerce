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
    catagory: { type: mongoose.Schema.Types.ObjectId, ref: "catagory" },
    image: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
    },
  },
  { timeseries: true, timestamps: true }
);

export default mongoose.model("product", Schema);
