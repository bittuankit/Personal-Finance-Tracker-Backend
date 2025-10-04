import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(409).json({ success: false, message: "Login first." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);

    next();
  } catch (error) {
    console.log(error);
  }
};
