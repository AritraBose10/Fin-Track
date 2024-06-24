import logging
import os

import spacy
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Print current working directory
logger.info(f"Current working directory: {os.getcwd()}")

try:
    # Load the trained model
    nlp = spacy.load("ml_model")
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise


def process_transaction(text):
    doc = nlp(text)
    amount = None
    desc = None
    for ent in doc.ents:
        if ent.label_ == "AMOUNT":
            amount = ent.text
        elif ent.label_ == "DESC":
            desc = ent.text
    label = max(doc.cats, key=doc.cats.get)
    result = {
        "text": text,
        "amount": amount,
        "desc": desc,
        "label": label,
    }
    logger.info(f"Processed transaction: {result}")
    return result


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    logger.info(f"Received data: {data}")
    text = data.get("text")
    if not text:
        logger.warning("No text provided in the request")
        return jsonify({"error": "No text provided"}), 400

    result = process_transaction(text)
    logger.info(f"Sending response: {result}")
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
