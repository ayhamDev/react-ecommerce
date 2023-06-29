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
          type: Object,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      subTotal: {
        type: Number,
        required: true,
      },
      addons: {
        type: Number,
        required: true,
      },
      Total: {
        type: Number,
        required: true,
      },
      deliveryFee: {
        type: Number,
        required: true,
      },
      Tax: {
        type: Number,
        required: true,
      },
      currency: {
        type: Object,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["Canceled", "Pending", "Accepted", "Shipping", "Delivered"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", Schema);
