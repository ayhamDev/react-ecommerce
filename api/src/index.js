const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const ConnectToDatabase = require("./Utils/db.js");

const ProductRouter = require("./Router/Product.js");
const ImageRouter = require("./Router/Image.js");
const OrderRouter = require("./Router/Order.js");
const UserRouter = require("./Router/User.js");
const AuthRouter = require("./Router/Auth.js");
const CartRouter = require("./Router/Cart.js");
const CatagoryRouter = require("./Router/Catagory.js");
const SettingsRouter = require("./Router/Settings.js");
const StatusRouter = require("./Router/Status.js");
const IsSameUserOrAdmin = require("./middleware/isSameUserOrAdmin.js");
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
