import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";
import dotenv from "dotenv";
dotenv.config();
export default async function IsAuthenticated(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader?.split(" ")[1])
    return res.status(403).json({ msg: "not authorized." });

  const Token = bearerHeader.split(" ")[1];
  try {
    const IsVerified = jwt.verify(Token, process.env.JWT_SECRET);
    if (!IsVerified) return res.status(403).json({ msg: "jwt is invaild" });
    const DecodedToken = jwt.decode(Token);
    try {
      req.user = await UserModel.findById(DecodedToken.userId);
      next();
    } catch (e) {
      return res.status(403).json({ msg: e });
    }
  } catch (e) {
    return res.status(403).json({ msg: e });
  }
}
