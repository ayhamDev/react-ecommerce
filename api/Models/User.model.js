const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      lineOne: {
        type: String,
        required: true,
      },
      lineTwo: {
        type: String,
        required: true,
      },
    },
    phoneNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", Schema);
