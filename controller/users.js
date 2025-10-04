import bcrypt from "bcrypt";
import User from "../models/users.js";
import { setCookie } from "../utils/features.js";

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      res.status(409).json({ success: false, message: "User already exist." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    setCookie(res, user, "User created successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res
        .status(409)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res
        .status(409)
        .json({ success: false, message: "Invalid email or password." });
    }

    setCookie(res, user, `Welcome back! ${user.firstname}`);
  } catch (error) {
    console.log(error);
  }
};

export const profile = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "User logged out successfully.",
      user: req.user,
    });
};
