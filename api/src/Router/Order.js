import express from "express";
import dotenv from "dotenv";
import Order from "../Models/Order.model.js";
import Cart from "../Models/Cart.model.js";
import { body, validationResult } from "express-validator";
import IsAuthenticated from "../middleware/IsAuthenticated.js";
import IsAdmin from "../middleware/IsAdmin.js";
import isSameUserOrAdmin from "../middleware/isSameUserOrAdmin.js";
import CalculateAmount from "../Utils/CalculateAmount.js";
import SettingsModel from "../Models/Settings.model.js";

// import CalculateAmount from "../Utils/CalculateAmount.js";
dotenv.config();
const Router = express.Router();
const OrderStatus = [
  "Canceled",
  "Pending",
  "Accepted",
  "Shipping",
  "Completed",
];

Router.get("/", IsAdmin, async (req, res) => {
  res.json(await Order.find().populate("products.productId"));
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

Router.get("/:userId/:orderId", isSameUserOrAdmin, async (req, res) => {
  if (!req.user.admin && req.params.userId !== req.user?.id)
    return res.status(403).json({ msg: "not authorized." });
  try {
    const Orders = await Order.findOne({
      userId: req.params.userId,
      _id: req.params.orderId,
    }).populate("products.productId");

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
      const UserCart = await Cart.findOne({ userId: req.user.id }).populate(
        "products.productId"
      );
      const Settings = await SettingsModel.findOne();
      const UserCartCalculated = CalculateAmount(UserCart);
      const addons =
        (Settings.tax.useTax ? Settings.tax.taxAmount / 100 : 1) *
          UserCartCalculated +
        Settings.deliveryFee;
      const NewOrder = new Order({
        status: "Pending",
        userId: req.user.id,
        products: UserCart.products,
        amount: {
          subTotal: UserCartCalculated,
          addons,
          deliveryFee: Settings.deliveryFee,
          Tax: Settings.tax.useTax ? Settings.tax.taxAmount : 0,
          Total: addons + UserCartCalculated,
          currency: Settings.currency,
        },
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
      const UserOrder = await Order.findById(req.params.orderId);
      UserOrder.status = req.body.status;
      UserOrder.save()
        .then((UpdatedOrder) => {
          res.json(UpdatedOrder);
        })
        .catch((err) => {
          res.json(err);
        });
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
Router.delete("/:orderId", IsAuthenticated, async (req, res) => {
  const UserOrder = await Order.findById(req.params.orderId);
  if (UserOrder.userId.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not Authorized" });
  if (UserOrder.status !== "Pending")
    return res.status(403).json({ msg: "Cant Cancel This Order" });
  UserOrder.status = "Canceled";
  UserOrder.save()
    .then(() => {
      res.json({ msg: "Order Canceled" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
export default Router;
