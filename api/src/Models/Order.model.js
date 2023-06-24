import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Canceled", "Pending", "Accepted", "Shipping", "completed"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", Schema);
