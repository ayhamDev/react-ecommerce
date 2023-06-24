import express from "express";
import dotenv from "dotenv";
import Order from "../Models/Order.model.js";
import Cart from "../Models/Cart.model.js";
import { body, validationResult } from "express-validator";
import IsAuthenticated from "../middleware/IsAuthenticated.js";
import IsAdmin from "../middleware/IsAdmin.js";
// import CalculateAmount from "../Utils/CalculateAmount.js";
dotenv.config();
const Router = express.Router();
const OrderStatus = [
  "Canceled",
  "Pending",
  "Accepted",
  "Shipping",
  "completed",
];

Router.get("/", IsAdmin, async (req, res) => {
  res.json(await Order.find());
});
Router.get("/:userId", IsAuthenticated, async (req, res) => {
  if (req.params.userId !== req.user.id)
    return res.status(403).json({ msg: "not authorized." });
  try {
    const Orders = await Order.find({ userId: req.params.userId });
    res.json(Orders);
  } catch (err) {
    res.status(400).json(err);
  }
});
Router.get("/:userId/:orderId", IsAuthenticated, async (req, res) => {
  if (req.params.userId !== req.user.id)
    return res.status(403).json({ msg: "not authorized." });
  try {
    const Orders = await Order.findOne({
      userId: req.params.userId,
      _id: req.params.orderId,
    });
    res.json(Orders);
  } catch (err) {
    res.status(400).json(err);
  }
});
Router.post(
  "/",
  IsAuthenticated,
  body("cartId").isString(),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
    try {
      const UserCart = await Cart.findById(req.body.cartId).populate(
        "products.productId"
      );
      if (UserCart.userId.toString() !== req.user.id)
        return res.status(403).json(results.array());
      const prices = UserCart.products.map((product) => {
        return product.productId.price * product.quantity;
      });
      const amount = prices.reduce((val, nextValue) => {
        return val + nextValue;
      });
      const NewOrder = new Order({
        status: "Pending",
        userId: req.user.id,
        amount,
        products: UserCart.products.map((product) => {
          return {
            productId: product.productId.id,
            quantity: product.quantity,
          };
        }),
      });
      NewOrder.save()
        .then((order) => {
          res.json(order);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
Router.put(
  "/:orderId/status",
  IsAdmin,
  body("status").isString(),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
    if (!OrderStatus.includes(req.body.status))
      return res.status(400).json({ msg: "invaild Order Status" });
    try {
      const UpdatedOrder = await Order.findByIdAndUpdate(
        req.params.orderId,
        {
          $set: {
            status: req.body.status,
          },
        },
        { new: true }
      );
      res.json(UpdatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
Router.put(
  "/:orderId",
  IsAuthenticated,
  body("products").isArray().isLength({ min: 1 }),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());

    const UserOrder = await Order.findById(req.params.orderId);
    if (req.user.id !== UserOrder.userId.toString())
      return res.status(403).json({ msg: "Cant Update Other User Data" });

    if (UserOrder.status != "Pending")
      return res.status(403).json({ msg: "Cant Update Accepted Orders" });

    UserOrder.products = req.body.products.map((product) => {
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });
    UserOrder.save()
      .then(async (order) => {
        const UpdatedOrder = await Order.findById(order.id).populate(
          "products.productId"
        );
        const prices = UpdatedOrder.products.map((product) => {
          return product.productId.price * product.quantity;
        });
        const amount = prices.reduce((val, nextValue) => {
          return val + nextValue;
        });
        UpdatedOrder.amount = amount;
        UpdatedOrder.save()
          .then((finOrder) => {
            res.json(finOrder);
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
);
export default Router;
