import dotenv from "dotenv";
import express from "express";

import ConnectToDatabase from "./Utils/db.js";

import ProductRouter from "./Router/Product.js";
import EventRouter from "./Router/Event.js";
import OrderRouter from "./Router/Order.js";
import UserRouter from "./Router/User.js";
import AuthRouter from "./Router/Auth.js";
import CatagoryRouter from "./Router/Catagory.js";

// Config
dotenv.config();
ConnectToDatabase();
const app = express();
const PORT = process.env.PORT || 5500;

// API Routes

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/product", ProductRouter);
app.use("/event", EventRouter);
app.use("/order", OrderRouter);
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/catagory", CatagoryRouter);

// Defualt route
app.get("/", (req, res) => {
  res.send("Welcome To The Api.");
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
