import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./middleware/auth.js";
import Transaction from "./models/model.js";
const corsOption = {
  origin: "https://fin-track-blmgo5g86-aritrabose10s-projects.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const app = express();

dotenv.config();
app.use(cors(corsOption));
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error: ", err.message);
  });

app.get("/api/transaction", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/transaction", async (req, res) => {
  const { description, amount, category, date } = req.body;
  try {
    const newTransaction = new Transaction({
      description,
      amount,
      category,
      date,
    });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not add transaction" });
  }
});

app.delete("/api/transaction/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete transaction" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
