import express from "express";
import {
  deleteTransactions,
  getTransactions,
  getTransactionsById,
  postTransactions,
  updateTransactions,
} from "../controller/transactions.js";

const router = express.Router();

router.get("/get-transactions", getTransactions);
router.get("/get-transactions/:id", getTransactionsById);
router.post("/post-transactions", postTransactions);
router.put("/update-transactions/:id", updateTransactions);
router.delete("/delete-transaction/:id", deleteTransactions);

export default router;
