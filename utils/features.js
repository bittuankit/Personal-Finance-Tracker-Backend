import jwt from "jsonwebtoken";

export const setCookie = (res, user, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    })
    .json({
      success: true,
      message,
    });
};
