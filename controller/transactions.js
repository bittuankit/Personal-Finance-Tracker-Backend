import Transaction from "../models/transactions.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});

    res.json({ success: true, transactions });
  } catch (error) {
    throw new Error(error);
  }
};
export const getTransactionsById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found." });
    res.json({ success: true, transaction });
  } catch (error) {
    throw new Error(error);
  }
};
export const postTransactions = async (req, res) => {
  try {
    const { title, amount, source, date } = req.body;
    const transactionPostData = await Transaction.create({
      title,
      amount: source === "income" ? +amount : -amount,
      source,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Transaction is added...",
      transactionPostData,
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const updateTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({ success: true, message: "Transaction updated successfully." });
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({
      success: true,
      message: "Transaction deleted successfully.",
      id: transaction._id,
    });
  } catch (error) {
    throw new Error(error);
  }
};
