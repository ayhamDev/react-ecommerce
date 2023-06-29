import mongoose from "mongoose";
import SettingsModel from "../Models/Settings.model.js";

export default function ConnectToDatabase() {
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
    })
    .then(async () => {
      console.log("connected To MongoDB.");
      if ((await SettingsModel.findOne()) == null) {
        new SettingsModel({
          currency: {
            name: "US Dollar",
            namePlural: "US dollars",
            code: "USD",
            symbol: "$",
            symbolNative: "$",
            decimalDigits: 2,
            rounding: 0,
          },
          deliveryFee: 5,
          tax: {
            useTax: false,
            taxAmount: 0,
          },
        })
          .save()
          .then((settings) => {
            console.log({ settings });
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
