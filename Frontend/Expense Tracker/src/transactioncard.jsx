import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "./assets/transactioncard.css";
import InputBox from "./chatbox";

const TransactionCard = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [netAmount, setNetAmount] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/transaction");
      setTransactions(response.data);
      console.log("Data Retrieved Successfully");
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const addTransaction = async (description, type, amount) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/transaction",
        {
          description,
          amount,
          date: new Date().toISOString().slice(0, 10), // Set current date
          category: type,
        }
      );
      console.log("Transaction added successfully");
      const newTransaction = response.data;

      setTransactions([newTransaction, ...transactions]);
      await fetchTransactions(); // Refresh transactions after adding
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleAddTransaction = () => {
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      description: event.target.description.value,
      amount: event.target.amount.value,
      date: event.target.date.value,
      type: event.target.type.value, // Add type field
    };

    if (!formData.amount || !formData.type) {
      alert("Amount and type are required");
      return;
    }

    try {
      await addTransaction(
        formData.description,
        formData.type,
        formData.amount
      );

      // Reset form fields and hide form
      event.target.reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transaction/${id}`);
      const updatedTransactions = transactions.filter(
        (transaction) => transaction._id !== id
      );
      setTransactions(updatedTransactions);
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  useEffect(() => {
    // Calculate net amount
    const net = transactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.amount || 0);

      return transaction.category === "Income"
        ? total + amount
        : total - amount;
    }, 0);

    setNetAmount(net);
  }, [transactions]);

  return (
    <>
      <InputBox addTransaction={addTransaction} />

      <div className="transaction-card">
        <h1 className="transaction-heading">TRANSACTIONS</h1>
        <div className="net-info">
          {netAmount >= 0 ? (
            <div className="net-income">
              <h3>Income</h3>
              <p className="income-amount">${netAmount.toFixed(2)}</p>
            </div>
          ) : (
            <div className="net-expense">
              <h3>Expense</h3>
              <p className="expense-amount">
                ${Math.abs(netAmount).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {transactions && transactions.length > 0 ? (
          <div className="transaction-list">
            {transactions.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-details">
                  <p className="transaction-description">
                    {transaction.description}
                  </p>
                  <p className="transaction-amount">{transaction.amount}</p>
                  <p className="transaction-date">{transaction.date}</p>
                </div>
                <i
                  className="icon-bin fa fa-trash"
                  onClick={() => handleDeleteTransaction(transaction._id)}
                ></i>
              </div>
            ))}
          </div>
        ) : (
          <p>No Transactions to show</p>
        )}

        <div className="transaction-buttons">
          <button className="add-button" onClick={handleAddTransaction}>
            ADD
          </button>
        </div>
      </div>

      {showForm && (
        <div className="backdrop">
          <div className="form-container">
            <button
              type="button"
              className="button"
              onClick={() => setShowForm(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="e.g. McDonalds"
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Rs 120"
                />
              </div>
              <div className="form-group">
                <label>Transaction Type:</label>
                <br />
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="Income"
                  defaultChecked // Mark 'Income' as default
                />
                <label htmlFor="income">Income</label>

                <input type="radio" id="expense" name="type" value="Expense" />
                <label htmlFor="expense">Expense</label>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <button type="submit" className="submitbtn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionCard;
