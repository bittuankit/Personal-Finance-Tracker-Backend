import express from "express";
import { login, logout, profile, signup } from "../controller/users.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", isAuth, profile);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
