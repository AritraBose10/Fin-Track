import mongoose from "mongoose";

const schema = new mongoose.Schema({
  description: String,
  amount: String,
  category: String,
  date: { type: Date, default: () => new Date().toISOString().slice(0, 10) },
});

const Transaction = mongoose.model("Transaction", schema);

export default Transaction;
