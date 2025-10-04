import express from "express";
import { config } from "dotenv";
import connectDB from "./database/db.js";
import transactionsRoutes from "./routes/transactions.js";
import usersRoutes from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/transactions", transactionsRoutes);
app.use("/api/v1/users", usersRoutes);

config({
  path: "./config.env",
});

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
