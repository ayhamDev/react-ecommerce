const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    currency: {
      type: Object,
      required: true,
      value: {
        name: "US Dollar",
        namePlural: "US dollars",
        code: "USD",
        symbol: "$",
        symbolNative: "$",
        decimalDigits: 2,
        rounding: 0,
      },
    },
    tax: {
      useTax: {
        type: Boolean,
        required: true,
      },
      taxAmount: {
        type: Number,
        required: true,
      },
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("settings", Schema);
