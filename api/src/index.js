import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import ConnectToDatabase from "./Utils/db.js";

import ProductRouter from "./Router/Product.js";
import ImageRouter from "./Router/Image.js";
import OrderRouter from "./Router/Order.js";
import UserRouter from "./Router/User.js";
import AuthRouter from "./Router/Auth.js";
import CartRouter from "./Router/Cart.js";
import CatagoryRouter from "./Router/Catagory.js";
import SettingsRouter from "./Router/Settings.js";
import StatusRouter from "./Router/Status.js";
import IsAuthenticated from "./middleware/IsAuthenticated.js";
import IsSameUserOrAdmin from "./middleware/isSameUserOrAdmin.js";
// Config
dotenv.config();
ConnectToDatabase();
const app = express();
const PORT = process.env.PORT || 5500;

// API Routes

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/verifyToken", IsSameUserOrAdmin, (req, res) => {
  res.json(req.user);
});
app.use("/status", StatusRouter);

app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/catagory", CatagoryRouter);
app.use("/image", ImageRouter);

app.use("/settings", SettingsRouter);
// Defualt route
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
