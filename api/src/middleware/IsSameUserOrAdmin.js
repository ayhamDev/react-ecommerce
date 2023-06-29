import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";
import dotenv from "dotenv";
dotenv.config();
export default async function IsSameUserOrAdmin(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader?.split(" ")[1])
    return res.status(403).json({ msg: "not authorized." });

  const Token = bearerHeader.split(" ")[1];
  try {
    const IsVerified = jwt.verify(Token, process.env.JWT_SECRET);
    if (!IsVerified) return res.status(403).json({ msg: "jwt is invaild" });
    const DecodedToken = jwt.decode(Token);
    if (DecodedToken.admin) {
      req.user = DecodedToken;
      return next();
    } else {
      try {
        req.user = await User.findById(DecodedToken.userId);
        if (req.user.id !== req.params.id)
          return res
            .status(403)
            .send({ msg: "Cant Access Another User Data." });
        next();
      } catch (e) {
        return res.status(403).json({ msg: e });
      }
    }
  } catch (e) {
    return res.status(403).json(e);
  }
}
