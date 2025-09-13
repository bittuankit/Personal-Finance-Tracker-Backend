import express from "express";
import { config } from "dotenv";
import connectDB from "./database/db.js";
import transactionsRoutes from "./routes/transactions.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/transactions", transactionsRoutes);

config({
  path: "./config.env",
});

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
