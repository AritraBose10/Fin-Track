import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import "./assets/chatbox.css";

const InputBox = ({ addTransaction }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(null); // Clear any previous errors when the input changes
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8080/predict", {
        text: inputValue,
      });

      const { label, amount, desc } = response.data;

      if (label && amount && desc) {
        addTransaction(desc, label, amount);
        setInputValue("");
      } else {
        setError("Couldn't process the transaction. Please try again.");
      }
    } catch (error) {
      console.error("Error predicting:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={handleInputChange}
        className="input-field"
        disabled={isLoading}
      />
      <div
        className={`send-icon ${inputValue && !isLoading ? "has-input" : ""}`}
        onClick={handleSendMessage}
      >
        <FontAwesomeIcon
          icon={isLoading ? faSpinner : faPaperPlane}
          spin={isLoading}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputBox;
